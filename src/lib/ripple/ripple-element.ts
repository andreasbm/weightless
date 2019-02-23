import { customElement, html, LitElement, property } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { addListener, EventListenerSubscription, removeListeners } from "../util/event";
import { computeRadius } from "../util/number";
import { getScale } from "../util/style";
import { normalizePointerEvent } from "../util/swipe";

import styles from "./ripple-element.scss";

export interface IRippleElementBaseProperties {
	autoRelease: boolean;
	initialDuration: number;
	releaseDuration: number;
}

export interface IRippleElementProperties extends IRippleElementBaseProperties {
	target: EventTarget;
	overlay: boolean;
	disabled: boolean;
	unbounded: boolean;
	centered: boolean;
	focusable: boolean;
	role: string;
}

export interface IRippleConfig extends IRippleElementBaseProperties {

}

export declare type RippleReleaseFunction = (() => void);

const ANIMATION_CONFIG: KeyframeAnimationOptions = {
	easing: "ease-out",
	fill: "both"
};

@customElement("ripple-element")
export class RippleElement extends LitElement implements IRippleElementProperties {

	private listeners: EventListenerSubscription[] = [];
	private rippleAnimationListeners: EventListenerSubscription[] = [];

	static styles = [sharedStyles, cssResult(styles)];

	@property({type: Boolean, reflect: true}) unbounded = false;
	@property({type: Boolean, reflect: true}) centered = false;
	@property({type: Boolean, reflect: true}) overlay = false;
	@property({type: Boolean, reflect: true}) disabled = false;
	@property({type: Boolean, reflect: true}) focusable = false;
	@property({type: Boolean, reflect: true}) autoRelease = false;
	@property({type: Number}) initialDuration = 1000;
	@property({type: Number}) releaseDuration = 500;
	@property({type: String, reflect: true}) role = "presentation";
	@property({type: Object}) target: EventTarget = this;

	/**
	 * Hook up the component.
	 */
	connectedCallback () {
		super.connectedCallback();

		this.spawnRipple = this.spawnRipple.bind(this);
		this.releaseRipple = this.releaseRipple.bind(this);
		this.onFocusIn = this.onFocusIn.bind(this);
		this.onFocusOut = this.onFocusOut.bind(this);
		this.addListeners();
	}

	/**
	 * Tears down the component.
	 */
	disconnectedCallback () {
		super.disconnectedCallback();
		this.removeListeners();
	}

	/**
	 * Reacts on updated properties.
	 * @param props
	 */
	updated (props: Map<keyof IRippleElementProperties, unknown>) {
		super.updated(props);

		// If the target has changed we need to hook up the new listeners
		if (props.has("target") && this.target != null) {
			this.removeListeners();
			this.addListeners();
		}
	}

	/**
	 * Adds event listeners to the target.
	 */
	protected addListeners () {
		if (this.target == null) return;
		this.listeners.push(
			addListener(this.target, "mousedown", this.spawnRipple, {passive: true}),
			addListener(this.target, "touchstart", this.spawnRipple, {passive: true}),
			addListener(this.target, "focusin", this.onFocusIn, {passive: true}),
			addListener(this.target, "focusout", this.onFocusOut, {passive: true})
		);
	}

	/**
	 * Removes listeners.
	 */
	protected removeListeners () {
		removeListeners(this.listeners);
	}

	/**
	 * Handles the mouse down events and spawns a ripple.
	 * If no event is provided the ripple will spawn in the center.
	 * @param {MouseEvent | TouchEvent} e
	 * @param config
	 */
	spawnRipple (e?: MouseEvent | TouchEvent, config?: Partial<IRippleConfig>): RippleReleaseFunction {

		// Check if the ripple is disabled
		if (this.disabled) {

			// Return an empty noop function
			return (() => {
			});
		}

		// Release the existing ripple if there is one
		this.releaseRipple();

		// Compute the spawn coordinates for the ripple
		const rect = this.getBoundingClientRect();
		let x = 0;
		let y = 0;

		if (this.centered || e == null) {
			x = rect.width / 2;
			y = rect.height / 2;
		} else {
			let {clientX, clientY} = normalizePointerEvent(e);
			x = clientX - rect.left;
			y = clientY - rect.top;
		}

		// Show the ripple and store the release function
		const release = this.showRippleAtCoords({x, y}, config);

		// Add the release function to the array of listeners
		this.rippleAnimationListeners.push(release);

		// Only if the target is present or if the ripple is NOT focusable we attach the release listeners.
		if (this.target != null && !this.focusable) {
			this.rippleAnimationListeners.push(
				addListener(this.target, "mouseup", this.releaseRipple, {passive: true}),
				addListener(this.target, "mouseleave", this.releaseRipple, {passive: true}),
				addListener(this.target, "touchend", this.releaseRipple, {passive: true})
			);
		}

		return release;
	}

	/**
	 * Handles the mouse up event and removes the ripple.
	 */
	releaseRipple () {
		removeListeners(this.rippleAnimationListeners);
	}

	/**
	 * Shows a ripple at a specific coordinate.
	 * @param number
	 * @param config
	 */
	showRippleAtCoords ({x, y}: {x: number, y: number}, config?: Partial<IRippleConfig>): RippleReleaseFunction {

		const {offsetWidth, offsetHeight} = this;
		const scale = getScale(window.getComputedStyle(this));
		const {
			releaseDuration = this.releaseDuration,
			initialDuration = this.initialDuration,
			autoRelease = this.autoRelease
		} = config || {};

		// Add the scale in case the ripple is transformed
		x *= scale.x === 0 ? 1 : 1 / scale.x;
		y *= scale.y === 0 ? 1 : 1 / scale.y;

		// Create the ripple
		const $ripple = document.createElement("div");
		$ripple.classList.add("ripple");

		// Compute distance from the center of the rectangle (container) to its corner.
		// If the coords are in the center the ripple would fill the entire container.
		const containerRadius = computeRadius(offsetWidth, offsetHeight);

		// Compute the additional distance we have to add to the radius to make sure it always fills
		// the entire container. The extra distance will be the distance from the center to the coords.
		// If the coords are in the middle the extra radius will be 0.
		const extraRadius = computeRadius(Math.abs((offsetWidth / 2) - x), Math.abs((offsetHeight / 2) - y));

		// The size of the ripple is the diameter
		const radius = Math.round(containerRadius + (extraRadius * 2));
		const diameter = radius * 2;

		// Assign the styles that makes it spawn from the desired coords
		Object.assign($ripple.style, {
			"left": `${x - radius}px`,
			"top": `${y - radius}px`,
			"height": `${diameter}px`,
			"width": `${diameter}px`,
			"position": "absolute"
		});

		// Cleans up the ripple
		let released = false;
		const release = () => {
			if (released) return;
			released = true;

			// Fade the ripple out
			const outAnimation = $ripple.animate(<PropertyIndexedKeyframes>{
				opacity: [`1`, `0`]
			}, {...ANIMATION_CONFIG, duration: releaseDuration});

			// When the out animation finished we remove the ripple before the next frame
			outAnimation.onfinish = () => {
				requestAnimationFrame(() => {
					if (this.shadowRoot!.contains($ripple)) {
						this.shadowRoot!.removeChild($ripple);
					}
				});
			};
		};

		// Start the animation and add the ripple to the DOM
		this.shadowRoot!.appendChild($ripple);

		// Release instantly if autorelease
		if (autoRelease) {
			release();
		}

		// Scale the ripple in
		$ripple.animate(<PropertyIndexedKeyframes>{
			transform: [`scale(0)`, `scale(1)`]
		}, {...ANIMATION_CONFIG, duration: initialDuration});

		return release;
	}

	/**
	 * Add a persistent ripple when the taget gains focus.
	 */
	protected onFocusIn () {
		if (!this.focusable) return;
		this.spawnRipple(undefined, {autoRelease: false});
	}

	/**
	 * Release the current ripple when the focus is lost from the target.
	 */
	protected onFocusOut () {
		if (!this.focusable) return;
		this.releaseRipple();
	}

	/**
	 * Returns the template for the component.
	 */
	protected render (): TemplateResult {
		return html``;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ripple-element": RippleElement;
	}
}
