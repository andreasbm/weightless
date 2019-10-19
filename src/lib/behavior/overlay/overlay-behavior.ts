import { FocusTrap } from "@a11y/focus-trap";
import "@a11y/focus-trap";
import { LitElement, property } from "lit-element";
import styles from "overlay-behavior.scss";
import { sharedStyles } from "../../style/shared";
import { pauseAnimations } from "../../util/animation";
import { CUBIC_BEZIER } from "../../util/constant/animation";
import { ESCAPE } from "../../util/constant/keycode";
import { cssResult } from "../../util/css";
import { renderAttributes, traverseActiveElements } from "../../util/dom";
import { addListener, EventListenerSubscription, removeListeners, stopEvent } from "../../util/event";
import { onSizeChanged } from "../../util/resize";
import { uniqueID } from "../../util/unique";

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
	fixed: boolean;
	disableFocusTrap: boolean;
	scrollContainer: EventTarget;
}

/**
 * Properties of the overlay behavior.
 */
export interface IOverlayBehaviorProperties {
	open: boolean;
}

// Type of an overlay resolver.
export declare type OverlayResolver<R> = ((result: R | null | undefined) => void);

/**
 * Default scroll container.
 */
export const DEFAULT_OVERLAY_SCROLL_CONTAINER = document.documentElement;

// Prefix infront of the class indicating that an overlay is blocking the scrolling
const OVERLAY_SCROLLING_BLOCKED_CLASS_PREFIX = `overlay`;

// Generates a scroll blocking identifier css class name.
const scrollingBlockedClass = (id: string) => `${OVERLAY_SCROLLING_BLOCKED_CLASS_PREFIX}-${id}`;

/**
 * Provides overlay behavior.
 * @event didshow - Dispatches after the overlay has been shown.
 * @event didhide - Dispatches after the overlay has been hidden.
 */
export abstract class OverlayBehavior<R, C extends Partial<IOverlayBehaviorBaseProperties>> extends LitElement implements IOverlayBehaviorProperties {
	static styles = [sharedStyles, cssResult(styles)];

	/**
	 * Whether the overlay is open or not.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) open: boolean = false;

	/**
	 * Whether the focus trap be disabled.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) disableFocusTrap: boolean = false;

	/**
	 * Whether the backdrop is visible or not.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) backdrop: boolean = false;

	/**
	 * Whether the overlay is fixed or not.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) fixed: boolean = false;

	/**
	 * Whether the overlay is persistent or not. When the overlay is persistent, ESCAPE and backdrop clicks won't close it.
	 * @attr
	 */
	@property({type: Boolean}) persistent: boolean = false;

	/**
	 * Whether the overlay blocks the scrolling on the scroll container.
	 * @attr
	 */
	@property({type: Boolean}) blockScrolling: boolean = false;

	/**
	 * The duration of the animations.
	 * @attr
	 */
	@property({type: Number}) duration: number = 200;

	/**
	 * The container the overlay lives in.
	 * @attr
	 */
	@property({type: Object}) scrollContainer: EventTarget = DEFAULT_OVERLAY_SCROLL_CONTAINER;

	/**
	 * Returns the scroll container as an HTMLElement. Falls back to the documentElement if the scroll
	 * container is not blockable since the style attribute is required to set the overflow hidden.
	 */
	get $blockableScrollContainer () {
		return this.scrollContainer instanceof HTMLElement ? this.scrollContainer : DEFAULT_OVERLAY_SCROLL_CONTAINER;
	}

	/**
	 * Active in animation.
	 */
	protected activeInAnimations: Animation[] = [];

	/**
	 * Active out animations.
	 */
	protected activeOutAnimations: Animation[] = [];

	/**
	 * Resolvers that resolves when the overlay is closed.
	 */
	protected resolvers: OverlayResolver<R>[] = [];

	/**
	 * Unique ID of the overlay.
	 */
	protected overlayId = uniqueID();

	/**
	 * Active event listeners.
	 */
	protected listeners: EventListenerSubscription[] = [];

	/**
	 * Element that was active before the overlay was opened.
	 */
	protected activeElementBeforeOpen?: HTMLElement;

	/**
	 * Trap where focus is going to be trapped within.
	 */
	protected abstract readonly $focusTrap?: FocusTrap;

	/**
	 * Base configuration for the in and out animation.
	 */
	protected get animationConfig (): KeyframeAnimationOptions {
		return {
			duration: this.duration,
			easing: CUBIC_BEZIER,
			fill: "both"
		};
	};

	/**
	 * Focuses on the first element of the overlay.
	 */
	trapFocus () {
		if (this.$focusTrap != null) {
			this.storeCurrentActiveElement();
			this.$focusTrap.focusFirstElement();
		}
	}

	/**
	 * Store the current active element so we can restore
	 * the focus on that element when the overlay is closed.
	 */
	storeCurrentActiveElement () {
		this.activeElementBeforeOpen = <HTMLElement | undefined>traverseActiveElements();
	}

	/**
	 * Shows the overlayed component.
	 * @param config
	 */
	show (config?: C): Promise<R | null> {

		// If an in animation is already playing return a new resolver.
		if (this.activeInAnimations.length > 0) {
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
		if (this.activeOutAnimations.length > 0) {
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
	protected clickAway () {
		if (!this.persistent && this.open) {
			this.hide();
		}
	}

	/**
	 * Dispatches an overlay event.
	 * @param e
	 * @param detail
	 */
	protected dispatchOverlayEvent (e: OverlayBehaviorEvent, detail?: R | null) {
		this.dispatchEvent(new CustomEvent(e, {detail, composed: true, bubbles: true}));
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
		pauseAnimations(this.activeInAnimations);
	}

	/**
	 * Pauses all ongoing out animations.
	 */
	protected pauseOutAnimations () {
		pauseAnimations(this.activeOutAnimations);
	}

	/**
	 * Prepares the show animation.
	 * @param config
	 */
	protected prepareShowAnimation (config?: C) {

		// Listen for events on when to update the position of the overlay
		this.listeners.push(
			addListener(this.scrollContainer, "scroll", this.updatePosition.bind(this), {passive: true}),

			// Either attach a resize observer or fallback to listening to window resizes
			"ResizeObserver" in window ? onSizeChanged(this, this.updatePosition.bind(this), {debounceMs: 100}) : addListener(window, "resize", this.updatePosition.bind(this), {passive: true})
		);

		this.pauseAnimations();

		// Set the configuration object if necessary
		if (config != null) {
			this.setConfig(config);
		}

		// Block the scrolling on the body element if necessary.
		if (this.blockScrolling) {
			const $container = this.$blockableScrollContainer;
			$container.style.overflow = `hidden`;
			$container.classList.add(scrollingBlockedClass(this.overlayId));
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
	protected abstract animateIn (): void;

	/**
	 * Animates the overlay out.
	 * @param result
	 */
	protected abstract animateOut (result?: R): void;

	/**
	 * Hooks up listeners and traps the focus.
	 */
	protected didShow () {
		this.activeInAnimations.length = 0;
		this.listeners.push(
			addListener(this, "keydown", this.onKeyDown.bind(this))
		);

		// Focus the first element if element should be trap
		if (!this.disableFocusTrap) {
			this.trapFocus();
		}

		this.dispatchOverlayEvent(OverlayBehaviorEvent.DID_SHOW);
	}

	/**
	 * Removes listeners and restores the state before the overlay was opened.
	 * @param result
	 */
	protected didHide (result?: R) {

		if (this.blockScrolling) {
			const $container = this.$blockableScrollContainer;

			// Check whether other overlays are blocking the same scroll container.
			// If that is the case, we do not have to release the scroll blocking yet.
			const currentBlockingOverlays = $container.className.match(new RegExp(OVERLAY_SCROLLING_BLOCKED_CLASS_PREFIX, "gm"));

			if (currentBlockingOverlays === null || (currentBlockingOverlays != null && currentBlockingOverlays.length === 1)) {
				$container.style.overflow = ``;
			}

			$container.classList.remove(scrollingBlockedClass(this.overlayId));
		}

		// Focus on the element that was active before the overlay was opened
		if (this.activeElementBeforeOpen != null) {
			this.activeElementBeforeOpen.focus();
			this.activeElementBeforeOpen = undefined;
		}

		this.activeOutAnimations.length = 0;
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