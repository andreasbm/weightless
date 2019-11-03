import { customElement, html, property, TemplateResult } from "lit-element";
import { IRadioBehaviorProperties, RadioBehavior } from "../behavior/radio/radio-behavior";
import "../button";
import { sharedStyles } from "../style/shared";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";

import styles from "./tab.scss";

/**
 * Properties of the tab.
 */
export interface ITabProperties extends IRadioBehaviorProperties {
	role: AriaRole;
	vertical: boolean;
}

/**
 * Organize navigation between groups of content.
 * @slot - Default content.
 * @slot before - Default content.
 * @cssprop --tab-padding - Padding
 * @cssprop --tab-before-margin - Margin of the before slot
 * @cssprop --tab-padding-vertical - Padding when vertical
 * @cssprop --tab-before-margin-vertical - margin of the before slot when vertical
 * @cssprop --tab-transition - transition
 * @cssprop --tab-opacity-disabled - opacity when disabled
 * @cssprop --tab-color - default color
 * @cssprop --tab-bg - default background
 * @cssprop --tab-color-active - color when active
 * @cssprop --tab-bg-active - background when active
 * @cssprop --tab-color-hover - color when hover
 * @cssprop --tab-bg-hover - background when hover
 * @cssprop --tab-color-active-hover - color when active and hover
 * @cssprop --tab-bg-active-hover - background when active and hover
 * @cssprop --tab-color-disabled - color when disabled
 * @cssprop --tab-bg-disabled - background when disabled
 * @cssprop --tab-color-filled - default color when filled
 * @cssprop --tab-bg-filled - default background when filled
 * @cssprop --tab-color-active-filled - color when active and filled
 * @cssprop --tab-bg-active-filled - background when active and filled
 * @cssprop --tab-color-hover-filled - color when hover and filled
 * @cssprop --tab-bg-hover-filled - background when hover and filled
 * @cssprop --tab-color-active-hover-filled - color when active, hover and filled
 * @cssprop --tab-bg-active-hover-filled - background when active, hover and filled
 * @cssprop --tab-color-disabled-filled - color when disabled and filled
 * @cssprop --tab-bg-disabled-filled - background when disabled and filled
 */
@customElement("wl-tab")
export class Tab extends RadioBehavior implements ITabProperties {
	static styles = [cssResult(styles), sharedStyles];

	/**
	 * Role of the tab.
	 * @attr
	 */
	@property({ type: String, reflect: true }) role: AriaRole = "tab";

	/**
	 * Vertical tab style.
	 * @attr
	 */
	@property({ type: Boolean, reflect: true }) vertical: boolean = false;

	/**
	 * Query the group.
	 */
	queryGroup(): RadioBehavior[] {
		return Array.from(this.parentElement!.querySelectorAll(`${this.nodeName.toLowerCase()}:not([disabled])`));
	}

	/**
	 * Focuses a grouped element.
	 * @param elem
	 */
	rowToElement(elem: RadioBehavior) {
		elem.focus();
	}

	/**
	 * Returns the template of the element.
	 */
	protected render(): TemplateResult {
		return html`
			<slot name="before"></slot>
			<slot></slot>
			<wl-ripple id="ripple" overlay .target="${this}" ?disabled="${this.disabled}"></wl-ripple>
			${this.renderFormElement()}
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-tab": Tab;
	}
}
