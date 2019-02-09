import { FocusTrap } from "@appnest/focus-trap";
import { LitElement, property } from "lit-element";
import { pauseAnimations } from "../util/animation";
import { CUBIC_BEZIER } from "../util/constant/animation";
import { ESCAPE } from "../util/constant/keycode";
import { addListener, EventListenerSubscription, removeListeners, stopEvent } from "../util/event";
import { renderAttributes } from "../util/html";
import { uniqueID } from "../util/unique";

export enum OverlayBehaviorEvent {
	SHOW = "open",
	HIDE = "hide"
}

export interface IOverlayBehaviorBaseProperties {
	open: boolean;
	persistent: boolean;
	blockScrolling: boolean;
	backdrop: boolean;
	duration: number;
	scrollContainer: HTMLElement;
}

export interface IOverlayBehaviorProperties {
	open: boolean;
	fixed: boolean;
}

export declare type OverlayResolver<R> = ((result: R | null | undefined) => void);

const OVERLAY_SCROLLING_BLOCKED_CLASS_PREFIX = `overlay`;
const scrollingBlockedClass = (id: string) => `${OVERLAY_SCROLLING_BLOCKED_CLASS_PREFIX}-${id}`;

export abstract class OverlayBehavior<R, C extends Partial<IOverlayBehaviorBaseProperties>> extends LitElement implements IOverlayBehaviorProperties {
	@property({type: Boolean, reflect: true}) open = false;
	@property({type: Boolean, reflect: true}) backdrop = false;
	@property({type: Boolean, reflect: true}) fixed = false;
	@property({type: Boolean}) persistent = false;
	@property({type: Boolean}) blockScrolling = false;
	@property({type: Number}) duration = 200;
	@property({type: Object}) scrollContainer = document.body;

	protected currentInAnimations: Animation[] = [];
	protected currentOutAnimations: Animation[] = [];
	protected resolvers: OverlayResolver<R>[] = [];
	protected abstract role: string;
	protected abstract $focusTrap?: FocusTrap;
	protected overlayId = uniqueID();
	protected visibilityListeners: EventListenerSubscription[] = [];
	protected interactionListeners: EventListenerSubscription[] = [];
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

		this.onKeyDown = this.onKeyDown.bind(this);
		this.onShow = this.onShow.bind(this);
		this.onHide = this.onHide.bind(this);
		this.updatePosition = this.updatePosition.bind(this);

		this.setAttribute("role", this.role);

		this.visibilityListeners.push(
			addListener(this, OverlayBehaviorEvent.SHOW, this.onShow),
			addListener(this, OverlayBehaviorEvent.HIDE, this.onHide)
		);
	}

	/**
	 * Tears down the component.
	 */
	disconnectedCallback () {
		removeListeners(this.visibilityListeners);
	}


	/**
	 * Focuses on the first element of the overlay.
	 */
	trapFocus () {
		if (this.$focusTrap != null) {
			this.activeElementBefore = <HTMLElement>document.activeElement;
			this.$focusTrap.focusFirstElement();
		}
	}

	/**
	 * Shows the overlayed component.
	 * @param config
	 */
	show (config?: C): Promise<R | null> {

		// If an in animation is already playing return a resolver.
		if (this.currentInAnimations.length > 0) {
			return this.createResolver();
		}

		this.prepareShowAnimation(config);
		this.animateIn();
		this.open = true;
		return this.createResolver();
	}

	/**
	 * Hides the overlayed component.
	 * @param result
	 */
	hide (result?: R) {
		if (this.currentOutAnimations.length > 0) {
			return;
		}

		this.prepareHideAnimation();
		this.animateOut(result);
	}

	/**
	 * Reacts on the properties changed.
	 * @param props
	 */
	protected updated (props: Map<keyof IOverlayBehaviorProperties, unknown>) {
		super.updated(props);

		this.updateAria();
		if (props.has("open")) {
			this.open ? this.removeAttribute("tabindex") : this.setAttribute("tabindex", "-1");
		}
	}

	protected updateAria () {
		renderAttributes(this, {
			"aria-hidden": !this.open
		});
	}

	/**
	 * Creates a root with delegates focus set to true.
	 */
	protected createRenderRoot () {
		return this.attachShadow({mode: "open", delegatesFocus: true});
	}

	/**
	 * Prepares the show animation.
	 * @param {C} config
	 */
	protected prepareShowAnimation (config?: C) {
		this.interactionListeners.push(
			addListener(this, "resize", this.updatePosition),
			addListener(this, "scroll", this.updatePosition, {passive: true}),
			addListener(this.scrollContainer, "scroll", this.updatePosition, {passive: true})
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

	protected animateIn () {
		this.dispatchOverlayEvent(OverlayBehaviorEvent.SHOW);
	}

	protected animateOut (result?: R) {
		this.open = false;
		this.dispatchOverlayEvent(OverlayBehaviorEvent.HIDE, result);
		this.resolve(result);
	}

	protected createResolver () {
		return new Promise((res: OverlayResolver<R>, rej) => {
			this.resolvers.push(res);
		});
	};

	protected resolve (result?: R | null) {
		for (const resolve of this.resolvers) {
			resolve(result);
		}
		this.resolvers.length = 0;
	}

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
		this.dispatchEvent(new CustomEvent(e, {bubbles: false, detail}));
	}

	/**
	 * Sets the properties based on the configuration object.
	 * @param config
	 */
	protected setConfig (config: C) {
		Object.assign(this, config);
	}

	/**
	 * Prepares the hide animation.
	 */
	protected prepareHideAnimation () {
		removeListeners(this.interactionListeners);
		this.pauseAnimations();
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

	protected onShow () {
		this.currentInAnimations.length = 0;
		this.interactionListeners.push(
			addListener(this, "keydown", this.onKeyDown)
		);

		this.trapFocus();
	}

	protected onHide () {
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
	}

	/**
	 * Updates the position of the element.
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