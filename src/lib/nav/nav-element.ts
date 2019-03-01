import { customElement, html, LitElement, property } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";

import styles from "./nav-element.scss";

/**
 * Properties of the nav.
 */
export interface INavElementProperties {
	shadow: boolean;
	fixed: boolean;
	role: AriaRole;
}

/**
 * Provide access to destinations in your app.
 */
@customElement("nav-element")
export class NavElement extends LitElement implements INavElementProperties {
	static styles = [sharedStyles, cssResult(styles)];

	/**
	 * Gives the nav a shadow.
	 */
	@property({type: Boolean, reflect: true}) shadow: boolean = false;

	/**
	 * Fixes the nav to the top of the page.
	 */
	@property({type: Boolean, reflect: true}) fixed: boolean = false;

	/**
	 * Role of the nav.
	 */
	@property({type: String, reflect: true}) role: AriaRole = "navigation";

	/**
	 * Returns the template for the element.
	 */
	protected render (): TemplateResult {
		return html`
			<aside id="left-container">
				<slot name="left"></slot>
				<slot name="title"></slot>
			</aside>
			<aside id="right_container">
				<slot name="right"></slot>
			</aside>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"nav-element": NavElement;
	}
}