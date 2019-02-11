import { customElement, html, LitElement } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";

import styles from "./divider-element.scss";

export interface IDividerElementProperties {

}

@customElement("divider-element")
export class DividerElement extends LitElement implements IDividerElementProperties {
	static styles = [cssResult(styles), sharedStyles];

	protected render (): TemplateResult {
		return html`
			<slot></slot>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"divider-element": DividerElement;
	}
}
