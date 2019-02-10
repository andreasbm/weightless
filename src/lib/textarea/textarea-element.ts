import { customElement, html, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import inputStyles from "../input/input-element.scss";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { TextareaBehavior } from "./textarea-behavior";
import styles from "./textarea-element.scss";

@customElement("textarea-element")
export class TextareaElement extends TextareaBehavior {

	static styles = [cssResult(inputStyles), cssResult(styles), sharedStyles];
	protected role = "textbox";

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
