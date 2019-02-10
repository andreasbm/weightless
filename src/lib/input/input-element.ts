import { customElement, html } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { InputBehavior } from "./input-behavior";

import styles from "./input-element.scss";

@customElement("input-element")
export class InputElement extends InputBehavior {

	static styles = [sharedStyles, cssResult(styles)];
	protected role = "textbox";

	protected render (): TemplateResult {
		return html`
			<div id="container">
				<div id="placeholder">${this.placeholder}</div>
				<slot></slot>
				<div id="ruler"></div>
			</div>
			${super.renderFormItem()}
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"textfield-element": InputElement;
	}
}
