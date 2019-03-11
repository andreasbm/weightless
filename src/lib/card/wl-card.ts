import { html, LitElement, property, TemplateResult } from "lit-element";
import { customElement } from "lit-element";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";

import styles from "./wl-card.scss";

/**
 * Properties of the card.
 */
export interface ICardProperties {
	hoverable: boolean
}

/**
 * Group related content and action.
 * @slot - Default content.
 * @cssprop --card-transition - Transition.
 * @cssprop --card-color - Color
 * @cssprop --card-border-radius - Border radius.
 * @cssprop --card-bg - Background.
 * @cssprop --card-padding - Padding.
 * @cssprop --card-elevation - Default box shadow.
 * @cssprop --card-elevation-hover - Box shadow on :hover.
 */
@customElement("wl-card")
export class WlCard extends LitElement implements ICardProperties {

	static styles = [sharedStyles, cssResult(styles)];

	/**
	 * Makes the card hoverable.
	 * @attr
	 */
	@property({reflect: true, type: Boolean}) hoverable: boolean = false;

	/**
	 * Returns the template of the element.
	 */
	protected render (): TemplateResult {
		return html`<slot></slot>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-card": WlCard;
	}
}
