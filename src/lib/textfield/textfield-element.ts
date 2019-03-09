import { customElement, html, property } from "lit-element";
import { TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";
import { IInputBehaviorProperties, InputBehavior } from "../behavior/input/input-behavior";
import { cssResult } from "../util/css";
import { InputType } from "./input-type";
import styles from "./textfield-element.scss";

/**
 * Properties of the textfield.
 */
export interface ITextfieldElementProperties extends IInputBehaviorProperties {
	pattern?: string;
	maxLength?: number;
	minLength?: number;
	type: InputType;
}

/**
 * Singleline text fields.
 */
@customElement("textfield-element")
export class TextfieldElement extends InputBehavior implements ITextfieldElementProperties {
	static styles = [...InputBehavior.styles, cssResult(styles)];

	/**
	 * Type of the input.
	 */
	@property({type: String, reflect: true}) type: InputType = "text";

	/**
	 * Value pattern.
	 */
	@property({type: String, reflect: true}) pattern?: string;

	/**
	 * Min value length.
	 */
	@property({type: Number, reflect: true}) minLength?: number;

	/**
	 * Max value length.
	 */
	@property({type: Number, reflect: true}) maxLength?: number;

	/**
	 * Renders the form element
	 */
	protected renderFormElement (): TemplateResult {
		return html`
			<input
				id="${this.formElementId}"
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
				tabindex="${this.disabled ? "-1" : "0"}"
			/>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"textfield-element": TextfieldElement;
	}
}
