import { customElement, html, LitElement, property } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";

import styles from "./icon-element.scss";

/**
 * Properties of the icon.
 */
export interface IIconElementProperties {
	role: AriaRole;
}

/**
 * Symbols for common actions and items.
 * @slot - Name of the icon.
 * @cssprop --icon-font - Icon font family.
 * @cssprop --icon-size - Font size.
 */
@customElement("icon-element")
export class IconElement extends LitElement implements IIconElementProperties {
	static styles = [cssResult(styles), sharedStyles];

	/**
	 * Roles of the icon.
	 * @attr
	 */
	@property({type: String, reflect: true}) role: AriaRole = "presentation";

	/**
	 * Returns the template for the element.
	 */
	protected render (): TemplateResult {
		return html`
			<slot></slot>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"icon-element": IconElement;
	}
}
