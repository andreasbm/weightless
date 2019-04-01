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
 * @cssprop --tab-padding - Padding.
 * @cssprop --tab-before-margin - Margin of the before slot.
 * @cssprop --tab-padding-vertical - Padding when vertical.
 * @cssprop --tab-before-margin-vertical - Margin of the before slot when vertical.
 * @cssprop --tab-transition - Transition.
 * @cssprop --tab-opacity-disabled - Opacity when disabled.
 * @cssprop --tab-color - Color.
 * @cssprop --tab-bg - Background.
 * @cssprop --tab-color-active - Color when checked.
 * @cssprop --tab-bg-active - Background when checked.
 * @cssprop --tab-color-hover - Color when hover.
 * @cssprop --tab-bg-hover - Background when hover.
 * @cssprop --tab-bg-hover-active - Background when hover and checked.
 * @cssprop --tab-color-disabled - Color when disabled.
 * @cssprop --tab-bg-disabled - Background when disabled.
 * @cssprop --tab-color-filled - Color when filled.
 * @cssprop --tab-bg-filled - Background when filled.
 * @cssprop --tab-color-active-filled - Color when checked and filled.
 * @cssprop --tab-bg-active-filled - Background when checked and filled.
 * @cssprop --tab-color-hover-filled - Color when hover and filled.
 * @cssprop --tab-bg-hover-filled - Background when hover and filled.
 * @cssprop --tab-bg-hover-active-filled - Background when hover and checked and filled.
 * @cssprop --tab-color-disabled-filled - Color when disabled and filled.
 * @cssprop --tab-bg-disabled-filled - Background when disabled and filled.
 */
@customElement("wl-tab")
export class Tab extends RadioBehavior implements ITabProperties {
	static styles = [cssResult(styles), sharedStyles];

	/**
	 * Role of the tab.
	 * @attr
	 */
	@property({type: String, reflect: true}) role: AriaRole = "tab";

	/**
	 * Vertical tab style.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) vertical: boolean = false;

	/**
	 * Query the group.
	 */
	protected queryGroup (): RadioBehavior[] {
		return Array.from(this.parentElement!.querySelectorAll(`${this.nodeName.toLowerCase()}:not([disabled])`));
	}

	/**
	 * Focuses a grouped element.
	 * @param elem
	 */
	protected rowToElement (elem: RadioBehavior) {
		elem.focus();
	}

	/**
	 * Returns the template of the element.
	 */
	protected render (): TemplateResult {
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
