import { html, property } from "lit-element";
import { TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";
import { AriaRole, updateTabindex } from "../../util/aria";
import { SPACE } from "../../util/constant/keycode";
import { cssResult } from "../../util/css";
import { renderAttributes } from "../../util/dom";
import { addListener, stopEvent } from "../../util/event";
import { FormItemBehavior, IFormItemBehaviorProperties } from "../form-item";

import styles from "./checkbox-behavior.scss";

/**
 * Properties of the checkbox behavior.
 */
export interface ICheckboxBehaviorProperties extends IFormItemBehaviorProperties {
	checked: boolean
}

/**
 * Checkbox behavior.
 */
export abstract class CheckboxBehavior extends FormItemBehavior implements ICheckboxBehaviorProperties {
	static styles = [...FormItemBehavior.styles, cssResult(styles)];

	/**
	 * Checks the checkbox.
	 */
	@property({type: Boolean, reflect: true}) checked: boolean = false;

	/**
	 * Role of the checkbox.
	 */
	@property({type: String, reflect: true}) role: AriaRole = "checkbox";

	/**
	 * Type of the form item.
	 */
	protected formItemType: string = "checkbox";

	/**
	 * Hooks up the element.
	 * @param props
	 */
	protected firstUpdated (props: Map<keyof ICheckboxBehaviorProperties, unknown>) {
		super.firstUpdated(<Map<keyof IFormItemBehaviorProperties, unknown>>props);

		this.onClick = this.onClick.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);

		this.listeners.push(
			addListener(this, "click", this.onClick),
			addListener(this, "keydown", this.onKeyDown)
		);
	}

	/**
	 * Updates aria attributes when the properties updates.
	 * @param props
	 */
	protected updated (props: Map<keyof ICheckboxBehaviorProperties, unknown>) {
		super.updated(props);

		// When checked we need to show the aria checked attribute
		if (props.has("checked")) {
			renderAttributes(this, {
				"aria-checked": this.checked.toString()
			});
		}

		// When disabled, the element is not tabbable.
		this.updateTabindex(props);
	}

	/**
	 * Updates the tabindex.
	 */
	protected updateTabindex (props: Map<keyof ICheckboxBehaviorProperties, unknown>) {
		if (props.has("disabled")) {
			updateTabindex(this, this.disabled);
		}
	}

	/**
	 * Handles that the checkbox was clicked.
	 * @param e
	 */
	protected onClick (e: MouseEvent) {
		if (this.disabled) {
			stopEvent(e);
			return;
		}

		this.toggle();
	}

	/**
	 * Checks and unchecks the component.
	 */
	protected toggle () {
		this.checked = !this.checked;
	}

	/**
	 * Handles the key down event.
	 * @param e
	 */
	protected onKeyDown (e: KeyboardEvent) {
		if (e.code === SPACE) {
			this.click();
			stopEvent(e);
		}
	}

	/**
	 * Returns the template for the form item
	 */
	protected renderFormItem (): TemplateResult {
		return html`
			<input
				id="form-item"
				type="${this.formItemType}"
				?checked="${this.checked}"
				?required="${this.required}"
				?disabled="${this.disabled}"
				?readonly="${this.readonly}"
				.value="${ifDefined(this.value)}"
				name="${ifDefined(this.name)}"
				tabindex="-1"
			/>
		`;
	}
}

