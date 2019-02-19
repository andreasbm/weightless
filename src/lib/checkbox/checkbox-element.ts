import { customElement, html, LitElement, property } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";

import styles from "./checkbox-element.scss";

export interface ICheckboxElementProperties {
	checked: boolean
}

@customElement("checkbox-element")
export class CheckboxElement extends LitElement implements ICheckboxElementProperties {

	static styles = [sharedStyles, cssResult(styles)];
	@property({reflect: true, type: Boolean}) checked = false;

	/**
	 * Returns the template for the component.
	 */
	protected render (): TemplateResult {
		return html`<p>Check</p>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"checkbox-element": CheckboxElement;
	}
}
