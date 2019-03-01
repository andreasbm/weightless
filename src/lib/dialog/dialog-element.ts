import { FocusTrap } from "@appnest/focus-trap";
import { customElement, html, property, query, TemplateResult } from "lit-element";
import "../backdrop";
import { IOverlayBehaviorBaseProperties, IOverlayBehaviorProperties, OverlayBehavior } from "../behavior/overlay-behavior/overlay-behavior";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";
import styles from "./dialog-element.scss";

export enum DialogSize {
	SMALL = "small",
	MEDIUM = "medium",
	LARGE = "large",
	AUTO = "auto",
	FULLSCREEN = "fullscreen"
}

export interface IDialogElementBaseProperties extends IOverlayBehaviorBaseProperties {
	size?: DialogSize;
	scrollable: boolean;
	role: AriaRole;
}

export interface IDialogElementProperties extends IDialogElementBaseProperties, IOverlayBehaviorProperties {
}

export interface IDialogElementConfig extends Partial<IDialogElementBaseProperties> {
}

export const defaultDialogConfig: IDialogElementConfig = {
	size: DialogSize.MEDIUM,
	blockScrolling: true,
	backdrop: true,
	duration: 200,
	persistent: false,
	fixed: true
};

@customElement("dialog-element")
export class DialogElement<R = unknown> extends OverlayBehavior<R, Partial<IDialogElementProperties>> implements IDialogElementProperties {
	static styles = [...OverlayBehavior.styles, cssResult(styles)];

	// The size of the dialog
	@property({type: String, reflect: true}) size?: DialogSize;

	// Whether the dialog is scrollable or not
	@property({type: Boolean, reflect: true}) scrollable: boolean = false;

	// The role of the dialog
	@property({type: String, reflect: true}) role: AriaRole = "dialog";

	@query("#dialog") $focusTrap: FocusTrap;
	@query("#dialog") $dialog: HTMLElement;
	@query("#backdrop") $backdrop: HTMLElement;

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
			<focus-trap id="dialog" ?inactive="${!this.open}">
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
