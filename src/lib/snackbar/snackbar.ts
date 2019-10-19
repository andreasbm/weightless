import { FocusTrap } from "@a11y/focus-trap";
import "@a11y/focus-trap";
import { customElement, html, property, query, TemplateResult } from "lit-element";
import { Backdrop } from "../backdrop/backdrop";
import { IOverlayBehaviorBaseProperties, IOverlayBehaviorProperties, OverlayBehavior } from "../behavior/overlay/overlay-behavior";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";

import styles from "./snackbar.scss";

/**
 * Base properties of the snackbar. These base properties are used when showing a snackbar.
 */
export interface ISnackbarBaseProperties extends IOverlayBehaviorBaseProperties {
	hideDelay: number;
}

/**
 * Properties of the snackbar.
 */
export interface ISnackbarProperties extends ISnackbarBaseProperties, IOverlayBehaviorProperties {
	role: AriaRole;
}

/**
 * Configuration used when showing a snackbar.
 */
export interface ISnackbarConfig extends Partial<ISnackbarBaseProperties> {
}

/**
 * Default configuration when showing a snackbar.
 */
export const defaultSnackbarConfig: ISnackbarConfig = {
	persistent: false,
	duration: 200,
	fixed: true
};

/**
 * Provide brief messages at the bottom of the screen.
 * @slot icon - Icon content.
 * @slot action - Action content (you can have multiple slots named action).
 * @slot - Default content.
 * @cssprop --snackbar-fixed-padding - Padding of the container when fixed
 * @cssprop --snackbar-icon-margin - Margin of the icon slot
 * @cssprop --snackbar-border-radius - Border radius
 * @cssprop --snackbar-padding - Padding
 * @cssprop --snackbar-content-padding - Padding of the content slot
 * @cssprop --snackbar-icon-color - Color of the icon slot
 * @cssprop --snackbar-elevation - Box shadow
 * @cssprop --snackbar-color - Color
 * @cssprop --snackbar-bg - Background
 */
@customElement("wl-snackbar")
export class Snackbar<R = unknown> extends OverlayBehavior<R, Partial<ISnackbarProperties>> implements ISnackbarProperties {
	static styles = [...OverlayBehavior.styles, cssResult(styles)];

	/**
	 * Role of the snackbar.
	 * @attr
	 */
	@property({type: String, reflect: true}) role: AriaRole = "banner";

	/**
	 * Time in ms before the snackbar is hidden automatically.
	 * @attr
	 */
	@property({type: Number}) hideDelay = 5000;

	/**
	 * Backdrop element.
	 */
	@query("#backdrop") protected $backdrop!: Backdrop;

	/**
	 * Snackbar element.
	 */
	@query("#snackbar") protected $snackbar!: FocusTrap;

	/**
	 * Focus trap element.
	 */
	protected get $focusTrap (): FocusTrap {
		return this.$snackbar;
	}

	/**
	 * Timeout that automatically hides the snackbar.
	 */
	protected autoHideTimeout: number | null = null;

	/**
	 * Animates the snackbar in.
	 */
	protected animateIn () {

		// We only want to run the setup function once.
		let ready = false;
		const setup = () => {
			if (ready) return;
			ready = true;
			this.didShow();
		};

		// The animation of the snackbar
		const snackbarAnimation = this.$snackbar.animate(<Keyframe[]>[
			{transform: `translateY(100%)`, opacity: `${0}`},
			{transform: `translateY(0)`, opacity: `${1}`}
		], this.animationConfig);

		// The animation of the backdrop
		const backdropAnimation = this.$backdrop.animate(<Keyframe[]>[
			{opacity: `${0}`},
			{opacity: `${1}`}
		], this.animationConfig);

		backdropAnimation.onfinish = setup;
		snackbarAnimation.onfinish = setup;

		this.activeInAnimations.push(snackbarAnimation, backdropAnimation);
	}

	/**
	 * Animates the snackbar out.
	 * @param result
	 */
	protected animateOut (result?: R) {

		// Clear the timeout if there is an ongoing auto hide timeout.
		if (this.autoHideTimeout != null) {
			window.clearTimeout(this.autoHideTimeout);
		}

		// Cleans up the component and animation. We only want to run this function once.
		let cleaned = false;
		const cleanup = () => {
			if (cleaned) return;
			cleaned = true;

			this.resolve(result);
			this.didHide(result);
		};

		// The animation of the snackbar.
		const snackbarAnimation = this.$snackbar.animate(<Keyframe[]>[
			{transform: `translateY(0)`, opacity: `${1}`},
			{transform: `translateY(100%)`, opacity: `${0}`}
		], this.animationConfig);

		// The animation of the backdrop.
		const backdropAnimation = this.$backdrop.animate(<Keyframe[]>[
			{opacity: `${1}`},
			{opacity: `${0}`}
		], this.animationConfig);

		backdropAnimation.onfinish = cleanup;
		snackbarAnimation.onfinish = cleanup;

		this.activeOutAnimations.push(snackbarAnimation, backdropAnimation);
	}

	/**
	 * When the snackbar shows we start a timeout that hides it.
	 */
	didShow () {
		super.didShow();

		// Start timeout to hide the snackbar.
		this.autoHideTimeout = window.setTimeout(() => {
			if (!this.persistent) {
				this.hide();
			}
		}, this.hideDelay);
	}

	/**
	 * Returns the template of the element.
	 */
	protected render (): TemplateResult {
		return html`
			<wl-backdrop id="backdrop" @click="${this.clickAway}"></wl-backdrop>
			<focus-trap id="snackbar" ?inactive="${!this.open || this.disableFocusTrap}">
				<div id="content">
					<slot name="icon"></slot>
					<slot></slot>
				</div>
				<div id="actions">
					<slot name="action"></slot>
				</div>
			</focus-trap>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-snackbar": Snackbar;
	}
}
