import { customElement, html } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { DividerBehavior } from "./divider-behavior";

import styles from "./divider-element.scss";

@customElement("divider-element")
export class DividerElement extends DividerBehavior {
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
