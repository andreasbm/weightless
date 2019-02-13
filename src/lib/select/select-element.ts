import { customElement, html } from "lit-element";
import { TemplateResult } from "lit-html";
import { IInputBehaviorProperties, InputBehavior } from "../input/input-behavior";
import { cssResult } from "../util/css";
import styles from "./select-element.scss";

export interface ISelectElementProperties extends IInputBehaviorProperties {
}

@customElement("select-element")
export class SelectElement extends InputBehavior implements ISelectElementProperties {
	static styles = [...InputBehavior.styles, cssResult(styles)];

	/**
	 * Returns the form item
	 */
	protected renderFormItem (): TemplateResult {
		return html`
			<select id="form-item"></select>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"select-element": SelectElement;
	}
}
