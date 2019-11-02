import { FocusTrap } from "@a11y/focus-trap";
import "@a11y/focus-trap";
import { customElement, html, property, query, TemplateResult } from "lit-element";
import "../backdrop";
import { Backdrop } from "../backdrop/backdrop";
import { IOverlayBehaviorBaseProperties, IOverlayBehaviorProperties, OverlayBehavior } from "../behavior/overlay/overlay-behavior";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";
import styles from "./dialog.scss";

/**
 * Available sizes of the dialog.
 */
export enum DialogSize {
	SMALL = "small",
	MEDIUM = "medium",
	LARGE = "large",
	AUTO = "auto",
	FULLSCREEN = "fullscreen"
}

/**
 * Base properties of the dialog. These base properties are used when showing a dialog.
 */
export interface IDialogBaseProperties extends IOverlayBehaviorBaseProperties {
	size?: DialogSize;
	scrollable: boolean;
}

/**
 * Properties of the dialog.
 */
export interface IDialogProperties extends IDialogBaseProperties, IOverlayBehaviorProperties {
	role: AriaRole;
}

/**
 * Configuration used when showing a dialog.
 */
export interface IDialogConfig extends Partial<IDialogBaseProperties> {}

/**
 * Default configuration when showing a dialog.
 */
export const defaultDialogConfig: IDialogConfig = {
	size: DialogSize.MEDIUM,
	blockScrolling: true,
	backdrop: true,
	persistent: false,
	duration: 200,
	fixed: true
};

/**
 * Highly interruptive messages.
 * @slot header - Header content.
 * @slot content - Body content.
 * @slot footer - Footer content.
 * @slot - Default content.
 * @cssprop --dialog-elevation - Box shadow
 * @cssprop --dialog-bg - Background
 * @cssprop --dialog-color - Color
 * @cssprop --dialog-border-radius - Border radius
 * @cssprop --dialog-width - Default width
 * @cssprop --dialog-height - Default height
 * @cssprop --dialog-width-s - Small width
 * @cssprop --dialog-height-s - Small height
 * @cssprop --dialog-width-m - Medium width
 * @cssprop --dialog-height-m - Medium height
 * @cssprop --dialog-width-l - Large width
 * @cssprop --dialog-height-l - Large height
 * @cssprop --dialog-width-fullscreen - Fullscreen width
 * @cssprop --dialog-height-fullscreen - Fullscreen height
 * @cssprop --dialog-min-width - Minimum width
 * @cssprop --dialog-min-height - Minimum height
 * @cssprop --dialog-max-width - Maximum width
 * @cssprop --dialog-max-height - Maximum height
 * @cssprop --dialog-width-auto - Width when auto
 * @cssprop --dialog-height-auto - Height when auto
 * @cssprop --dialog-scrollable-border - Border when scrollable
 * @cssprop --dialog-header-padding - Padding of the header slot
 * @cssprop --dialog-header-padding-scrollable - Padding of the header slot when scrollable
 * @cssprop --dialog-content-padding - Padding of the content slot
 * @cssprop --dialog-footer-padding - Padding of the footer slot
 */
@customElement("wl-dialog")
export class Dialog<R = unknown> extends OverlayBehavior<R, Partial<IDialogProperties>> implements IDialogProperties {
	static styles = [...OverlayBehavior.styles, cssResult(styles)];

	/**
	 * Size of the dialog.
	 * @attr
	 */
	@property({ type: String, reflect: true }) size?: DialogSize;

	/**
	 * Makes the dialog scrollable.
	 * @attr
	 */
	@property({ type: Boolean, reflect: true }) scrollable: boolean = false;

	/**
	 * Role of the dialog.
	 * @attr
	 */
	@property({ type: String, reflect: true }) role: AriaRole = "dialog";

	/**
	 * Dialog element.
	 */
	@query("#dialog") protected $dialog!: FocusTrap;

	/**
	 * Backdrop element.
	 */
	@query("#backdrop") protected $backdrop!: Backdrop;

	/**
	 * Focus trap element.
	 */
	protected get $focusTrap(): FocusTrap {
		return this.$dialog;
	}

	/**
	 * Animates the dialog in.
	 */
	protected animateIn() {
		// We only want to run the setup function once.
		let ready = false;
		const setup = () => {
			if (ready) return;
			ready = true;
			this.didShow();
		};

		// The animation of the dialog
		const dialogAnimation = this.$dialog.animate(
			<Keyframe[]>[{ transform: `scale(0.9) translate(0, 30px)`, opacity: `${0}` }, { transform: `scale(1) translate(0, 0)`, opacity: `${1}` }],
			this.animationConfig
		);

		// The animation of the backdrop
		const backdropAnimation = this.$backdrop.animate(<Keyframe[]>[{ opacity: `${0}` }, { opacity: `${1}` }], this.animationConfig);

		dialogAnimation.onfinish = setup;
		backdropAnimation.onfinish = setup;

		this.activeInAnimations.push(dialogAnimation, backdropAnimation);
	}

	/**
	 * Animates the dialog out.
	 * @param result
	 */
	protected animateOut(result?: R) {
		// Cleans up the component and animation. We only want to run this function once.
		let cleaned = false;
		const cleanup = () => {
			if (cleaned) return;
			cleaned = true;

			this.resolve(result);
			this.didHide(result);
		};

		// The animation of the dialog.
		const dialogAnimation = this.$dialog.animate(
			<Keyframe[]>[{ transform: `translateY(0)`, opacity: `${1}` }, { transform: `translateY(30px)`, opacity: `${0}` }],
			this.animationConfig
		);

		// The animation of the backdrop.
		const backdropAnimation = this.$backdrop.animate(<Keyframe[]>[{ opacity: `${1}` }, { opacity: `${0}` }], this.animationConfig);

		dialogAnimation.onfinish = cleanup;
		backdropAnimation.onfinish = cleanup;

		this.activeOutAnimations.push(dialogAnimation, backdropAnimation);
	}

	render(): TemplateResult {
		return html`
			<wl-backdrop id="backdrop" @click="${this.clickAway}"></wl-backdrop>
			<focus-trap id="dialog" ?inactive="${!this.open || this.disableFocusTrap}">
				<slot name="header"></slot>
				<slot name="content"></slot>
				<slot></slot>
				<slot name="footer"></slot>
			</focus-trap>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-dialog": Dialog;
	}
}
