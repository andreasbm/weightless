import { html, LitElement, property, TemplateResult } from "lit-element";
import { customElement } from "lit-element";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";

import styles from "./card.scss";

/**
 * Properties of the card.
 */
export interface ICardProperties {
	hoverable: boolean
}

/**
 * Group related content and action.
 * @slot - Default content.
 * @cssprop --card-transition - Transition
 * @cssprop --card-border-radius - Border radius
 * @cssprop --card-padding - Padding
 * @cssprop --card-elevation - Default box shadow
 * @cssprop --card-elevation-hover - Box shadow when :hover
 * @cssprop --card-color - Color
 * @cssprop --card-bg - Background
 * @cssprop --card-transition - Transition
 * @cssprop --card-border-radius - Border radius
 * @cssprop --card-padding - Padding
 * @cssprop --card-elevation - Default box shadow
 * @cssprop --card-elevation-hover - Box shadow when :hover
 * @cssprop --card-color - Color
 * @cssprop --card-bg - Background
 */
@customElement("wl-card")
export class Card extends LitElement implements ICardProperties {

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
		"wl-card": Card;
	}
}
