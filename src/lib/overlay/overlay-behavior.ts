import { FocusTrap } from "@appnest/focus-trap";
import { LitElement, property } from "lit-element";
import { pauseAnimations } from "../util/animation";
import { CUBIC_BEZIER } from "../util/constant/animation";
import { ESCAPE } from "../util/constant/keycode";
import { addListener, EventListenerSubscription, removeListeners, stopEvent } from "../util/event";
import { renderAttributes } from "../util/html";
import { onSizeChanged } from "../util/resize";
import { uniqueID } from "../util/unique";

/**
 * Events the overlay behavior can dispatch.
 */
export enum OverlayBehaviorEvent {
	DID_SHOW = "didShow",
	DID_HIDE = "didHide"
}

/**
 * Base properties of the overlay behavior.
 */
export interface IOverlayBehaviorBaseProperties {
	open: boolean;
	persistent: boolean;
	blockScrolling: boolean;
	backdrop: boolean;
	duration: number;
	scrollContainer: HTMLElement;
}

/**
 * Properties of the overlay behavior.
 */
export interface IOverlayBehaviorProperties {
	open: boolean;
}

// Type of an overlay resolver.
export declare type OverlayResolver<R> = ((result: R | null | undefined) => void);

// Prefix infront of the class indicating that an overlay is blocking the scrolling
const OVERLAY_SCROLLING_BLOCKED_CLASS_PREFIX = `overlay`;

// Generates a scroll blocking identifier css class name.
const scrollingBlockedClass = (id: string) => `${OVERLAY_SCROLLING_BLOCKED_CLASS_PREFIX}-${id}`;

/**
 * This class defines all of the logic elements with an overlay requires.
 */
export abstract class OverlayBehavior<R, C extends Partial<IOverlayBehaviorBaseProperties>> extends LitElement implements IOverlayBehaviorProperties {

	// Whether the overlay is open or not.
	@property({type: Boolean, reflect: true}) open = false;

	// Whether the backdrop is visible or not.
	@property({type: Boolean, reflect: true}) backdrop = false;

	// Whether the overlay is persistent or not. When the overlay is persistent, ESCAPE and backdrop clicks won't close it.
	@property({type: Boolean}) persistent = false;

	// Whether the overlay blocks the scrolling on the scroll container.
	@property({type: Boolean}) blockScrolling = false;

	// The duration of the animations.
	@property({type: Number}) duration = 200;

	// The container the overlay lives in.
	@property({type: Object}) scrollContainer = document.body;

	protected currentInAnimations: Animation[] = [];
	protected currentOutAnimations: Animation[] = [];
	protected resolvers: OverlayResolver<R>[] = [];
	protected abstract role: string;
	protected abstract $focusTrap?: FocusTrap;
	protected overlayId = uniqueID();
	protected listeners: EventListenerSubscription[] = [];
	protected activeElementBefore?: HTMLElement;

	/**
	 * Base configuration for the in and out animation.
	 */
	protected get animationConfig (): KeyframeAnimationOptions {
		return {
			duration: this.duration,
			easing: CUBIC_BEZIER
		};
	};

	/**
	 * Hooks up the component.
	 */
	connectedCallback () {
		super.connectedCallback();

		// Bind the relevant functions to the instance of the class
		this.onKeyDown = this.onKeyDown.bind(this);
		this.didShow = this.didShow.bind(this);
		this.didHide = this.didHide.bind(this);
		this.updatePosition = this.updatePosition.bind(this);

		// Set the role attribute for accessibility
		this.setAttribute("role", this.role);
	}

	/**
	 * Focuses on the first element of the overlay.
	 */
	trapFocus () {
		if (this.$focusTrap != null) {

			// Store the current active element so we can restore the focus on that element when the overlay is closed.
			this.activeElementBefore = <HTMLElement>document.activeElement;

			// Trap the focus on the first element of the overlay.
			this.$focusTrap.focusFirstElement();
		}
	}

	/**
	 * Shows the overlayed component.
	 * @param config
	 */
	show (config?: C): Promise<R | null> {

		// If an in animation is already playing return a new resolver.
		if (this.currentInAnimations.length > 0) {
			return this.createResolver();
		}

		// Prepare the show animation with the configuration object
		this.prepareShowAnimation(config);

		// Animate the overlay in.
		this.animateIn();

		// Show the overlay
		this.open = true;

		// Return a resolver
		return this.createResolver();
	}

	/**
	 * Hides the overlayed component.
	 * @param result
	 */
	hide (result?: R) {

		// If there are out animations already being played, we simply return
		// knowing that the current out animation will finish soon.
		if (this.currentOutAnimations.length > 0) {
			return;
		}

		// Prepare the hide animation
		this.prepareHideAnimation();

		// Animate the overlay out
		this.animateOut(result);
	}

	/**
	 * Reacts on the properties changed.
	 * @param props
	 */
	protected updated (props: Map<keyof IOverlayBehaviorProperties, unknown>) {
		super.updated(props);

		if (props.has("open")) {

			// When the overlay is closed it is removed from the tab order.
			this.open ? this.removeAttribute("tabindex") : this.setAttribute("tabindex", "-1");
		}

		// Each time a property changes we need to update the aria information.
		this.updateAria();
	}

	/**
	 * Updates the aria information.
	 */
	protected updateAria () {
		renderAttributes(this, {
			"aria-hidden": !this.open
		});
	}

	/**
	 * Creates a root that delegates the focus.
	 */
	protected createRenderRoot () {
		return this.attachShadow({mode: "open", delegatesFocus: true});
	}

	/**
	 * Creates a new resolver.
	 */
	protected createResolver () {
		return new Promise((res: OverlayResolver<R>) => {
			this.resolvers.push(res);
		});
	};

	/**
	 * Resolves a result and clears the list of resolvers.
	 * @param result
	 */
	protected resolve (result?: R | null) {
		for (const resolve of this.resolvers) {
			resolve(result);
		}
		this.resolvers.length = 0;
	}

	/**
	 * Hides the overlay if it's not persistent.
	 */
	protected backdropClick () {
		if (!this.persistent) {
			this.hide();
		}
	}

	/**
	 * Dispatches an overlay event.
	 * @param {OverlayBehaviorEvent} e
	 * @param {R} detail
	 */
	protected dispatchOverlayEvent (e: OverlayBehaviorEvent, detail?: R | null) {
		this.dispatchEvent(new CustomEvent(e, {detail}));
	}

	/**
	 * Sets the properties based on the configuration object.
	 * @param config
	 */
	protected setConfig (config: C) {
		Object.assign(this, config);
	}

	/**
	 * Pauses all ongoing animations.
	 */
	protected pauseAnimations () {
		this.pauseInAnimations();
		this.pauseOutAnimations();
	}

	/**
	 * Pauses all ongoing in animations.
	 */
	protected pauseInAnimations () {
		pauseAnimations(this.currentInAnimations);
	}

	/**
	 * Pauses all ongoing out animations.
	 */
	protected pauseOutAnimations () {
		pauseAnimations(this.currentOutAnimations);
	}

	/**
	 * Prepares the show animation.
	 * @param config
	 */
	protected prepareShowAnimation (config?: C) {

		// Listen for events on when to update the position of the overlay
		this.listeners.push(
			addListener(this, "scroll", this.updatePosition, {passive: true}),
			addListener(this.scrollContainer, "scroll", this.updatePosition, {passive: true}),

			// Either attach a resize observer or fallback to listening to window resizes
			"ResizeObserver" in window ? onSizeChanged(this, this.updatePosition, {debounceMs: 100}) : addListener(window, "resize", this.updatePosition, {passive: true}),
		);

		this.pauseAnimations();

		// Set the configuration object if necessary
		if (config != null) {
			this.setConfig(config);
		}

		// Block the scrolling on the body element if necessary.
		if (this.blockScrolling) {
			this.scrollContainer.style.overflow = `hidden`;
			this.scrollContainer.classList.add(scrollingBlockedClass(this.overlayId));
		}
	}

	/**
	 * Prepares the hide animation.
	 */
	protected prepareHideAnimation () {
		removeListeners(this.listeners);
		this.pauseAnimations();
	}

	/**
	 * Animates the overlay in.
	 */
	protected animateIn () {
		this.didShow();
	}

	/**
	 * Animates the overlay out.
	 * @param result
	 */
	protected animateOut (result?: R) {
		this.open = false;
		this.resolve(result);
		this.didHide(result);
	}

	/**
	 * Hooks up listeners and traps the focus.
	 */
	protected didShow () {
		this.currentInAnimations.length = 0;
		this.listeners.push(
			addListener(this, "keydown", this.onKeyDown)
		);

		this.trapFocus();
		this.dispatchOverlayEvent(OverlayBehaviorEvent.DID_SHOW);
	}

	/**
	 * Removes listeners and restores the state before the overlay was opened.
	 * @param result
	 */
	protected didHide (result?: R) {
		if (this.blockScrolling) {

			// Check whether other overlays are blocking the same scroll container.
			// If that is the case, we do not have to release the scroll blocking yet.
			const currentBlockingOverlays = this.scrollContainer.className.match(new RegExp(OVERLAY_SCROLLING_BLOCKED_CLASS_PREFIX, "gm"));
			if (currentBlockingOverlays === null || (currentBlockingOverlays != null && currentBlockingOverlays.length === 1)) {
				this.scrollContainer.style.overflow = null;
			}

			this.scrollContainer.classList.remove(scrollingBlockedClass(this.overlayId));
		}

		// Focus on the element that was active before the overlay was opened
		if (this.activeElementBefore != null) {
			this.activeElementBefore.focus();
			this.activeElementBefore = undefined;
		}

		this.currentOutAnimations.length = 0;
		this.open = false;
		this.dispatchOverlayEvent(OverlayBehaviorEvent.DID_HIDE, result);
	}

	/**
	 * Updates the position of the overlay..
	 */
	protected updatePosition () {
		// Implement if necessary
	}

	/**
	 * Handles the key down event on focus.
	 * @param {KeyboardEvent} e
	 */
	protected onKeyDown (e: KeyboardEvent) {
		switch (e.code) {
			case ESCAPE:
				if (this.open && !this.persistent) {
					this.hide();
					stopEvent(e);
				}
				break;
		}
	}
}