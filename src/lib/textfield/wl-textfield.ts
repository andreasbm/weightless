import { customElement, html, property, TemplateResult} from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { IInputBehaviorProperties, InputBehavior } from "../behavior/input/input-behavior";
import { cssResult } from "../util/css";
import { InputType } from "./input-type";
import styles from "./wl-textfield.scss";

/**
 * Properties of the textfield.
 */
export interface ITextfieldProperties extends IInputBehaviorProperties {
	pattern?: string;
	maxLength?: number;
	minLength?: number;
	type: InputType;
	list?: string;
}

/**
 * Singleline text fields.
 */
@customElement("wl-textfield")
export class WlTextfield extends InputBehavior implements ITextfieldProperties {
	static styles = [...InputBehavior.styles, cssResult(styles)];

	/**
	 * Type of the input.
	 * @attr
	 */
	@property({type: String, reflect: true}) type: InputType = "text";

	/**
	 * Value pattern.
	 * @attr
	 */
	@property({type: String, reflect: true}) pattern?: string;

	/**
	 * Min value length.
	 * @attr
	 */
	@property({type: Number, reflect: true}) minLength?: number;

	/**
	 * Max value length.
	 * @attr
	 */
	@property({type: Number, reflect: true}) maxLength?: number;

	/**
	 * Datalist id.
	 * @attr
	 */
	@property({type: String}) list?: string;

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
				list="${ifDefined(this.list)}"
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
		"wl-textfield": WlTextfield;
	}
}
