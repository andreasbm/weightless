import { customElement, html, LitElement, property } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";

import styles from "./divider-element.scss";

/**
 * Properties of the divider.
 */
export interface IDividerElementProperties {
}

/**
 * Thin line that groups content in lists and layouts.
 */
@customElement("divider-element")
export class DividerElement extends LitElement implements IDividerElementProperties {
	static styles = [cssResult(styles), sharedStyles];

	/**
	 * Role of the backdrop.
	 */
	@property({type: String, reflect: true}) role: AriaRole = "separator";

	/**
	 * Returns the template of the element.
	 */
	protected render (): TemplateResult {
		return html`
			<slot></slot>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"divider-element": DividerElement;
	}
}
