import { customElement, html, LitElement, property, TemplateResult } from "lit-element";
import { sharedStyles } from "../style/shared";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";

import styles from "./icon.scss";

/**
 * Properties of the icon.
 */
export interface IIconProperties {
	role: AriaRole;
}

/**
 * Symbols for common actions and items.
 * @slot - Name of the icon.
 * @cssprop --icon-font - Font family
 * @cssprop --icon-size - Width and height
 */
@customElement("wl-icon")
export class Icon extends LitElement implements IIconProperties {
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
		"wl-icon": Icon;
	}
}
