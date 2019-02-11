import { customElement, html, property, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { IInputElementProperties, InputElement } from "../input/input-element";
import { cssResult } from "../util/css";
import styles from "./textarea-element.scss";

export interface ITextareaBehaviorProperties extends IInputElementProperties {
	rows?: number;
	cols?: number;
}

@customElement("textarea-element")
export class TextareaElement extends InputElement implements ITextareaBehaviorProperties {

	static styles = [...InputElement.styles, cssResult(styles)];

	@property({type: Number, reflect: true}) rows?: number;
	@property({type: Number, reflect: true}) cols?: number;

	connectedCallback () {
		super.connectedCallback();
		this.setAttribute("aria-multiline", "true");
	}

	/**
	 * Refresh the height at the first interaction.
	 * @param props
	 */
	firstUpdated (props: Map<keyof ITextareaBehaviorProperties, unknown>) {
		super.firstUpdated(<Map<keyof IInputElementProperties, unknown>>props);
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
		requestAnimationFrame(() => {
			// Reset height
			this.setHeight(1);

			// Compute scroll height
			const scrollHeight = this.$formItem.scrollHeight;

			// Set the new height
			this.setHeight(scrollHeight);
		});
	}

	/**
	 * Sets the height of the form item.
	 * @param height
	 */
	protected setHeight (height?: number) {
		this.$formItem.style.minHeight = this.$formItem.style.height = height == null ? null : `${height}px`;
	}

	/**
	 * Returns the form item
	 */
	protected renderFormItem (): TemplateResult {
		return html`
			<textarea
				id="form-item"
				?required="${this.required}"
				?disabled="${this.disabled}"
				?readonly="${this.readonly}"
				type="${ifDefined(this.type)}"
				name="${ifDefined(this.name)}"
				pattern="${ifDefined(this.pattern)}"
				autocomplete="${ifDefined(this.autocomplete)}"
				minlength="${ifDefined(this.minLength)}"
				maxlength="${ifDefined(this.maxLength)}"
				rows="${ifDefined(this.rows)}"
				cols="${ifDefined(this.cols)}"
				tabindex="${this.readonly || this.disabled ? "-1" : "0"}"
			></textarea>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"textarea-element": TextareaElement;
	}
}
