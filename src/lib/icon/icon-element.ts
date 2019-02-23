import { customElement, html, LitElement, property } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";

import styles from "./icon-element.scss";

export interface IIconElementProperties {
	role: string;
}

@customElement("icon-element")
export class IconElement extends LitElement implements IIconElementProperties {
	static styles = [cssResult(styles), sharedStyles];

	@property({type: String, reflect: true}) role = "img";


	/**
	 * Returns the template for the component.
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
