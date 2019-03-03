import { FocusTrap } from "@appnest/focus-trap";
import { customElement, html, property, query, TemplateResult } from "lit-element";
import "../backdrop";
import { BackdropElement } from "../backdrop/backdrop-element";
import { IOverlayBehaviorBaseProperties, IOverlayBehaviorProperties, OverlayBehavior } from "../behavior/overlay/overlay-behavior";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";
import styles from "./dialog-element.scss";

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
export interface IDialogElementBaseProperties extends IOverlayBehaviorBaseProperties {
	size?: DialogSize;
	scrollable: boolean;
}

/**
 * Properties of the dialog.
 */
export interface IDialogElementProperties extends IDialogElementBaseProperties, IOverlayBehaviorProperties {
	role: AriaRole;
}

/**
 * Configuration used when showing a dialog.
 */
export interface IDialogElementConfig extends Partial<IDialogElementBaseProperties> {
}

/**
 * Default configuration when showing a dialog.
 */
export const defaultDialogConfig: IDialogElementConfig = {
	size: DialogSize.MEDIUM,
	blockScrolling: true,
	backdrop: true,
	duration: 200,
	persistent: false,
	fixed: true
};

/**
 * Highly interruptive messages.
 */
@customElement("dialog-element")
export class DialogElement<R = unknown> extends OverlayBehavior<R, Partial<IDialogElementProperties>> implements IDialogElementProperties {
	static styles = [...OverlayBehavior.styles, cssResult(styles)];

	/**
	 * Size of the dialog.
	 */
	@property({type: String, reflect: true}) size?: DialogSize;

	/**
	 * Makes the dialog scrollable.
	 */
	@property({type: Boolean, reflect: true}) scrollable: boolean = false;

	/**
	 * Role of the dialog.
	 */
	@property({type: String, reflect: true}) role: AriaRole = "dialog";

	/**
	 * Focus trap element.
	 */
	@query("#dialog") $focusTrap: FocusTrap;

	/**
	 * Dialog element.
	 */
	@query("#dialog") $dialog: HTMLElement;

	/**
	 * Backdrop element.
	 */
	@query("#backdrop") $backdrop: BackdropElement;

	/**
	 * Animates the dialog in.
	 */
	protected animateIn () {

		// We only want to run the setup function once.
		let ready = false;
		const setup = () => {
			if (ready) return;
			ready = true;
			this.didShow();
		};

		// The animation of the dialog
		const dialogAnimation = this.$dialog.animate(<Keyframe[]>[
			{transform: `scale(0.9) translate(0, 30px)`, opacity: `${0}`},
			{transform: `scale(1) translate(0, 0)`, opacity: `${1}`}
		], this.animationConfig);

		// The animation of the backdrop
		const backdropAnimation = this.$backdrop.animate(<Keyframe[]>[
			{opacity: `${0}`},
			{opacity: `${1}`}
		], this.animationConfig);

		dialogAnimation.onfinish = setup;
		backdropAnimation.onfinish = setup;

		this.currentInAnimations.push(dialogAnimation, backdropAnimation);
	}

	/**
	 * Animates the dialog out.
	 * @param result
	 */
	protected animateOut (result?: R) {

		// Cleans up the component and animation. We only want to run this function once.
		let cleaned = false;
		const cleanup = () => {
			if (cleaned) return;
			cleaned = true;

			this.resolve(result);
			this.didHide(result);
		};

		// The animation of the dialog.
		const dialogAnimation = this.$dialog.animate(<Keyframe[]>[
			{transform: `translateY(0)`, opacity: `${1}`},
			{transform: `translateY(30px)`, opacity: `${0}`}
		], this.animationConfig);

		// The animation of the backdrop.
		const backdropAnimation = this.$backdrop.animate(<Keyframe[]>[
			{opacity: `${1}`},
			{opacity: `${0}`}
		], this.animationConfig);

		dialogAnimation.onfinish = cleanup;
		backdropAnimation.onfinish = cleanup;

		this.currentOutAnimations.push(dialogAnimation, backdropAnimation);
	}

	render (): TemplateResult {
		return html`
			<backdrop-element id="backdrop" @click="${this.clickAway}"></backdrop-element>
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
		"dialog-element": DialogElement;
	}
}
