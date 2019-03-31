import { customElement, html, LitElement, property, TemplateResult } from "lit-element";
import { sharedStyles } from "../style/shared";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";

import styles from "./tab-group.scss";

/**
 * Properties of the tab.
 */
export interface ITabGroupProperties {
}

export type TabGroupAlignment = "left" | "center" | "right" | "stretch";

/**
 * Organize navigation between groups of content.
 */
@customElement("wl-tab-group")
export class TabGroup extends LitElement implements ITabGroupProperties {
	static styles = [cssResult(styles), sharedStyles];

	/**
	 * Alignment of the tabs.
	 * @attr
	 */
	@property({type: String, reflect: true}) align: TabGroupAlignment = "left";

	/**
	 * Inverts the colors of the tabs.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) inverted: boolean = false;

	/**
	 * Role of the tab.
	 * @attr
	 */
	@property({type: String, reflect: true}) role: AriaRole = "tablist";

	connectedCallback () {
		super.connectedCallback();
		this.addEventListener("change", e => {
			console.log(e);
		});
	}

	/**
	 * Returns the template of the element.
	 */
	protected render (): TemplateResult {
		return html`
			<input name="hey" type="radio" @change="${() => alert('asd1')}" />
			<input name="hey" type="radio" @change="${() => alert('asd2')}" />
			<slot></slot>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-tab-group": TabGroup;
	}
}
