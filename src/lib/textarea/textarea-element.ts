import { customElement, html, property, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { IFormElementBehaviorProperties } from "../behavior/form-element";
import { ITextfieldElementProperties, TextfieldElement } from "../textfield/textfield-element";
import { cssResult } from "../util/css";
import { isHidden } from "../util/dom";
import styles from "./textarea-element.scss";

/**
 * Properties of the textarea.
 */
export interface ITextareaBehaviorProperties extends ITextfieldElementProperties {
	rows?: number;
	cols?: number;
}

/**
 * Multiline text fields.
 */
@customElement("textarea-element")
export class TextareaElement extends TextfieldElement implements ITextareaBehaviorProperties {
	static styles = [...TextfieldElement.styles, cssResult(styles)];

	/**
	 * Amount of rows.
	 * @attr
	 */
	@property({type: Number, reflect: true}) rows?: number;

	/**
	 * Amount of columns.
	 * @attr
	 */
	@property({type: Number, reflect: true}) cols?: number;

	/**
	 * Hooks up the element.
	 */
	connectedCallback () {
		super.connectedCallback();
		this.setAttribute("aria-multiline", "true");
	}

	/**
	 * Refresh the height at the first interaction.
	 * @param props
	 */
	firstUpdated (props: Map<keyof ITextareaBehaviorProperties, unknown>) {
		super.firstUpdated(<Map<keyof IFormElementBehaviorProperties, unknown>>props);
		this.refreshHeight();
	}

	/**
	 * Refreshes the height of the textarea each time the user interacts with it.
	 * @param e
	 */
	onInput (e: Event) {
		super.onInput(e);
		this.refreshHeight();
	}

	/**
	 * Refreshes the height of the textarea.
	 */
	refreshHeight () {

		// Only refresh the height of the rows and cols are not defined
		if (this.rows != null || this.cols != null || isHidden(this)) {
			return;
		}

		requestAnimationFrame(() => {
			// Reset height
			this.setHeight(1);

			// Compute scroll height
			const scrollHeight = this.$formElement.scrollHeight;

			// Set the new height
			this.setHeight(scrollHeight);
		});
	}

	/**
	 * Sets the height of the form element.
	 * @param height
	 */
	protected setHeight (height?: number) {
		this.$formElement.style.minHeight = this.$formElement.style.height = height == null ? null : `${height}px`;
	}

	/**
	 * Returns the form element
	 */
	protected renderFormElement (): TemplateResult {
		return html`
			<textarea
				id="${this.formElementId}"
				?required="${this.required}"
				?disabled="${this.disabled}"
				?readonly="${this.readonly}"
				name="${ifDefined(this.name)}"
				pattern="${ifDefined(this.pattern)}"
				autocomplete="${ifDefined(this.autocomplete)}"
				minlength="${ifDefined(this.minLength)}"
				maxlength="${ifDefined(this.maxLength)}"
				rows="${ifDefined(this.rows)}"
				cols="${ifDefined(this.cols)}"
				tabindex="${this.disabled ? "-1" : "0"}"
			></textarea>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"textarea-element": TextareaElement;
	}
}
