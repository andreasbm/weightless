import { customElement, html, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { IFormElementBehaviorProperties } from "../behavior/form-element";
import { ITextfieldBehaviorProperties, TextfieldBehavior } from "../behavior/textfield/textfield-behavior";
import { Textfield } from "../textfield/textfield";
import { cssResult } from "../util/css";
import { isHidden } from "../util/dom";
import styles from "./textarea.scss";

/**
 * Properties of the textarea.
 */
export interface ITextareaProperties extends ITextfieldBehaviorProperties {
}

/**
 * Multiline text fields.
 * @cssprop --textarea-resize - Resize strategy
 * @cssprop --textarea-height - Height
 * @cssprop --textarea-min-height - Min height
 * @cssprop --textarea-max-height - Max height
 */
@customElement("wl-textarea")
export class Textarea extends TextfieldBehavior implements ITextareaProperties {
	static styles = [...Textfield.styles, cssResult(styles)];

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
	firstUpdated (props: Map<keyof ITextareaProperties, unknown>) {
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
		if (isHidden(this)) {
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
	 * Sets the height of the form element while respecting a potential user set CSS property.
	 * @param height
	 */
	protected setHeight (height?: number) {
		this.$formElement.style.setProperty(`--_textarea-height`, `${height == null ? `` : `${height}px`}`);
	}

	/**
	 * Returns the form element.
	 * Initially the textarea will have rows set to 1.
	 * This is to initially have the textarea starting with having the height of 1 row.
	 * This is a good solution to avoid the textarea having the wrong height if initially being hidden.
	 */
	protected renderFormElement (): TemplateResult {
		return html`
			<textarea
				id="${this.formElementId}"
				?required="${this.required}"
				?disabled="${this.disabled}"
				?readonly="${this.readonly}"
				aria-label="${ifDefined(this.label)}"
				name="${ifDefined(this.name)}"
				pattern="${ifDefined(this.pattern)}"
				autocomplete="${ifDefined(this.autocomplete)}"
				minlength="${ifDefined(this.minLength)}"
				maxlength="${ifDefined(this.maxLength)}"
				rows="1" 
				tabindex="${this.disabled ? "-1" : "0"}"
			></textarea>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-textarea": Textarea;
	}
}
