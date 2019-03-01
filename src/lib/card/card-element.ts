import { html, LitElement, property } from "lit-element";
import { customElement } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";

import styles from "./card-element.scss";

export interface ICardElementProperties {
	hoverable: boolean
}

@customElement("card-element")
export class CardElement extends LitElement implements ICardElementProperties {

	static styles = [sharedStyles, cssResult(styles)];

	/**
	 * Makes the card hoverable.
	 */
	@property({reflect: true, type: Boolean}) hoverable = false;

	/**
	 * Returns the template for the component.
	 */
	protected render (): TemplateResult {
		return html`<slot></slot>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"card-element": CardElement;
	}
}
