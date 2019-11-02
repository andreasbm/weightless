import { customElement, html, LitElement, property, TemplateResult } from "lit-element";
import { sharedStyles } from "../style/shared";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";

import styles from "./nav.scss";

/**
 * Properties of the nav.
 */
export interface INavProperties {
	shadow: boolean;
	fixed: boolean;
	role: AriaRole;
}

/**
 * Provide access to destinations in your app.
 * @slot left - Content positioned to the left.
 * @slot right - Content positioned to the right.
 * @slot title - Title.
 * @cssprop --nav-bg - Background
 * @cssprop --nav-color - Color
 * @cssprop --nav-padding - Padding
 * @cssprop --nav-height - Height
 * @cssprop --nav-elevation - Box shadow
 * @cssprop --nav-transition - Transition
 * @cssprop --nav-title-font-size - Font size of the title slot
 * @cssprop --nav-title-font-weight - Font weight of the title slot
 * @cssprop --nav-title-margin - Margin of the title slot
 */
@customElement("wl-nav")
export class Nav extends LitElement implements INavProperties {
	static styles = [sharedStyles, cssResult(styles)];

	/**
	 * Gives the nav a shadow.
	 * @attr
	 */
	@property({ type: Boolean, reflect: true }) shadow: boolean = false;

	/**
	 * Fixes the nav to the top of the page.
	 * @attr
	 */
	@property({ type: Boolean, reflect: true }) fixed: boolean = false;

	/**
	 * Role of the nav.
	 * @attr
	 */
	@property({ type: String, reflect: true }) role: AriaRole = "navigation";

	/**
	 * Returns the template for the element.
	 */
	protected render(): TemplateResult {
		return html`
			<div id="left">
				<slot name="left"></slot>
				<slot name="title"></slot>
			</div>
			<div id="right">
				<slot name="right"></slot>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-nav": Nav;
	}
}
