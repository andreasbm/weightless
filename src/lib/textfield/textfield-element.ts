import { customElement, html, property } from "lit-element";
import { TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";
import { IInputBehaviorProperties, InputBehavior } from "../input/input-behavior";
import { cssResult } from "../util/css";
import styles from "./textfield-element.scss";

export interface ITextfieldElementProperties extends IInputBehaviorProperties {
	pattern?: string;
	maxLength?: number;
	minLength?: number;
	type: string;
}

@customElement("textfield-element")
export class TextfieldElement extends InputBehavior implements ITextfieldElementProperties {
	static styles = [...InputBehavior.styles, cssResult(styles)];

	@property({type: String, reflect: true}) type: string = "text";
	@property({type: String, reflect: true}) pattern?: string;
	@property({type: Number, reflect: true}) maxLength?: number;
	@property({type: Number, reflect: true}) minLength?: number;

	/**
	 * Returns the form item
	 */
	protected renderFormItem (): TemplateResult {
		return html`
			<input
				id="form-item"
				.value="${ifDefined(this.value)}"
				?required="${this.required}"
				?disabled="${this.disabled}"
				?readonly="${this.readonly}"
				type="${ifDefined(this.type)}"
				name="${ifDefined(this.name)}"
				pattern="${ifDefined(this.pattern)}"
				autocomplete="${ifDefined(this.autocomplete)}"
				minlength="${ifDefined(this.minLength)}"
				maxlength="${ifDefined(this.maxLength)}"
				tabindex="${this.readonly || this.disabled ? "-1" : "0"}"
			/>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"textfield-element": TextfieldElement;
	}
}
