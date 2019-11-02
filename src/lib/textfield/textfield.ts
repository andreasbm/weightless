import { customElement, html, property, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { TextfieldType } from "./textfield-type";
import { ITextfieldBehaviorProperties, TextfieldBehavior } from "../behavior/textfield/textfield-behavior";
import { cssResult } from "../util/css";
import styles from "./textfield.scss";

/**
 * Properties of the textfield.
 */
export interface ITextfieldProperties extends ITextfieldBehaviorProperties {
	list?: string;
	min?: number;
	max?: number;
	type: TextfieldType;
}

/**
 * Singleline text fields.
 */
@customElement("wl-textfield")
export class Textfield extends TextfieldBehavior implements ITextfieldProperties {
	static styles = [...TextfieldBehavior.styles, cssResult(styles)];

	/**
	 * Datalist id.
	 * @attr
	 */
	@property({type: String}) list?: string;

	/**
	 * Type of the input.
	 * @attr
	 */
	@property({type: String, reflect: true}) type: TextfieldType = "text";

	/**
	 * Min number value.
	 * @attr
	 */
	@property({type: Number}) min?: number;

	/**
	 * Max number value.
	 * @attr
	 */
	@property({type: Number}) max?: number;

	/**
	 * Renders the form element
	 */
	protected renderFormElement (): TemplateResult {
		return html`
			<input
				id="${this.formElementId}"
				.value="${this.value}"
				value="${ifDefined(this.initialValue)}"
				?required="${this.required}"
				?disabled="${this.disabled}"
				?readonly="${this.readonly}"
				aria-label="${ifDefined(this.label)}"
				type="${ifDefined(this.type)}"
				name="${ifDefined(this.name)}"
				list="${ifDefined(this.list)}"
				pattern="${ifDefined(this.pattern)}"
				autocomplete="${ifDefined(this.autocomplete)}"
				minlength="${ifDefined(this.minLength)}"
				maxlength="${ifDefined(this.maxLength)}"
				min="${ifDefined(this.min)}"
				max="${ifDefined(this.max)}"
				tabindex="${this.disabled ? -1 : 0}"
			/>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-textfield": Textfield;
	}
}
