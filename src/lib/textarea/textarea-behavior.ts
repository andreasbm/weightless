import { html, property, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { IInputBehaviorProperties, InputBehavior } from "../input/input-behavior";

export interface ITextareaBehaviorProperties extends IInputBehaviorProperties {
	rows?: number;
	cols?: number;
}

export abstract class TextareaBehavior extends InputBehavior implements ITextareaBehaviorProperties {
	@property({type: Number, reflect: true}) rows?: number;
	@property({type: Number, reflect: true}) cols?: number;
	protected formItem!: HTMLTextAreaElement;

	connectedCallback () {
		super.connectedCallback();
		this.setAttribute("aria-multiline", "true");
	}

	/**
	 * Refresh the height at the first interaction.
	 * @param props
	 */
	firstUpdated (props: Map<keyof ITextareaBehaviorProperties, unknown>) {
		super.firstUpdated(<Map<keyof IInputBehaviorProperties, unknown>>props);
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
				rows="${ifDefined(this.rows)}"
				cols="${ifDefined(this.cols)}"
				tabindex="${this.readonly || this.disabled ? "-1" : "0"}"
			></textarea>
		`;
	}
}