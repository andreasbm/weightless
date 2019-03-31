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
	inverted: boolean;
}

/**
 * Organize navigation between groups of content.
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
	 * Inverts the colors of the tab.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) inverted: boolean = false;

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
