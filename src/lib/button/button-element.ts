import { customElement, html, TemplateResult } from "lit-element";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { ButtonBehavior } from "./button-behavior";
import styles from "./button-element.scss";

@customElement("button-element")
export class ButtonElement extends ButtonBehavior {

	static styles = [cssResult(styles), sharedStyles];
	protected role = "button";

	/**
	 * Returns the template for the button.
	 */
	render (): TemplateResult {
		return html`
			<slot></slot>
			${super.renderFormItem()}
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"button-element": ButtonElement;
	}
}