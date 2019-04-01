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
}

/**
 * Organize navigation between groups of content.
 * @slot - Default content.
 * @cssprop --tab-padding - 
 * @cssprop --tab-transition - 
 * @cssprop --tab-opacity-disabled - 
 * @cssprop --tab-color -
 * @cssprop --tab-bg - 
 * @cssprop --tab-color-active -
 * @cssprop --tab-bg-active - 
 * @cssprop --tab-color-focus-active -
 * @cssprop --tab-bg-focus - 
 * @cssprop --tab-color-hover -
 * @cssprop --tab-bg-hover - 
 * @cssprop --tab-color-disabled -
 * @cssprop --tab-bg-disabled - 
 * @cssprop --tab-color-filled -
 * @cssprop --tab-bg-filled - 
 * @cssprop --tab-color-active-filled -
 * @cssprop --tab-bg-active-filled - 
 * @cssprop --tab-color-focus-active-filled -
 * @cssprop --tab-bg-focus-filled - 
 * @cssprop --tab-color-hover-filled -
 * @cssprop --tab-bg-hover-filled - 
 * @cssprop --tab-color-disabled-filled -
 * @cssprop --tab-bg-disabled-filled -
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
