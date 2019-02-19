import { customElement, html, LitElement, property } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { addListener, EventListenerSubscription, removeListeners } from "../util/event";
import { computeRadius } from "../util/number";
import { normalizePointerEvent } from "../util/swipe";

import styles from "./ripple-element.scss";

export interface IRippleElementProperties {
	centered: boolean;
	unbounded: boolean;
	disabled: boolean;
	autoRelease: boolean;
	overlay: boolean;
	initialDuration: number;
	releaseDuration: number;
	target: EventTarget;
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
	@property({type: Boolean, reflect: true}) autoRelease = false;
	@property({type: Number}) initialDuration = 1000;
	@property({type: Number}) releaseDuration = 500;
	@property({type: Object}) target = this;
	@property({type: String, reflect: true}) role = "presentation";

	connectedCallback () {
		super.connectedCallback();
		this.spawnRipple = this.spawnRipple.bind(this);
		this.releaseRipple = this.releaseRipple.bind(this);

		this.listeners.push(
			addListener(this.target, "mousedown", this.spawnRipple, {passive: true}),
			addListener(this.target, "touchstart", this.spawnRipple, {passive: true})
		);
	}

	disconnectedCallback () {
		super.disconnectedCallback();
		removeListeners(this.listeners);
	}

	/**
	 * Handles the mouse down events and spawns a ripple.
	 * If no event is provided the ripple will spawn in the center.
	 * @param {MouseEvent | TouchEvent} e
	 */
	spawnRipple (e?: MouseEvent | TouchEvent): RippleReleaseFunction {
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
		const release = this.showRippleAtCoords({x, y});

		// Add listeners for when the ripple should be released
		this.rippleAnimationListeners.push(
			release,
			addListener(this.target, "mouseup", this.releaseRipple, {passive: true}),
			addListener(this.target, "mouseleave", this.releaseRipple, {passive: true}),
			addListener(this.target, "touchend", this.releaseRipple, {passive: true})
		);

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
	 * @param number
	 */
	showRippleAtCoords ({x, y}: {x: number, y: number}): RippleReleaseFunction {

		const {offsetWidth, offsetHeight} = this;

		// Create the ripple
		const $ripple = document.createElement("div");
		$ripple.classList.add("ripple");

		// Compute distance from the center of the rectangle (container) to its corner.
		// If the coords are in the center the ripple would fill the entire container.
		const containerRadius = computeRadius(this.offsetWidth, offsetHeight);

		// Compute the additional distance we have to add to the radius to make sure it always fills
		// the entire container. The extra distance will be the distance from the center to the coords.
		// If the coords are in the middle the extra radius will be 0.
		const extraRadius = computeRadius(Math.abs((offsetWidth / 2) - x), Math.abs((offsetHeight / 2) - y));

		// The size of the ripple is the diameter
		const radius = containerRadius + (extraRadius * 2);
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
			}, {...ANIMATION_CONFIG, duration: this.releaseDuration});

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
		if (this.autoRelease) {
			release();
		}

		// Scale the ripple in
		$ripple.animate(<PropertyIndexedKeyframes>{
			transform: [`scale(0)`, `scale(1)`]
		}, {...ANIMATION_CONFIG, duration: this.initialDuration});

		return release;
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
