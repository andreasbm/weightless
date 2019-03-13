import { html, property, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { AriaRole } from "../../util/aria";
import { ENTER, SPACE } from "../../util/constant/keycode";
import { cssResult } from "../../util/css";
import { addListener, stopEvent } from "../../util/event";
import { FormElementBehavior, IFormElementBehaviorProperties } from "../form-element";

import styles from "./checkbox-behavior.scss";

/**
 * Properties of the checkbox behavior.
 */
export interface ICheckboxBehaviorProperties extends IFormElementBehaviorProperties {
	checked: boolean;
	ariaChecked: string;
}

/**
 * Provides checkbox behavior.
 */
export abstract class CheckboxBehavior extends FormElementBehavior implements ICheckboxBehaviorProperties {
	static styles = [...FormElementBehavior.styles, cssResult(styles)];

	/**
	 * Checks the checkbox.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) checked: boolean = false;

	/**
	 * Aria checked attribute.
	 * @attr - aria-checked
	 */
	@property({type: String, reflect: true, attribute: "aria-checked"}) ariaChecked: string = this.checked.toString();

	/**
	 * Role of the checkbox.
	 * @attr
	 */
	@property({type: String, reflect: true}) role: AriaRole = "checkbox";

	/**
	 * Type of the form element.
	 */
	protected formElementType: string = "checkbox";

	/**
	 * Event target for the listeners and click simulation.
	 */
	protected get eventTarget (): HTMLElement {
		return this;
	}

	/**
	 * Hooks up the element.
	 * @param props
	 */
	protected firstUpdated (props: Map<keyof ICheckboxBehaviorProperties, unknown>) {
		super.firstUpdated(<Map<keyof IFormElementBehaviorProperties, unknown>>props);

		this.onClick = this.onClick.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.attachListeners();
	}

	/**
	 * Reacts to properties when they change.
	 * @param props
	 */
	protected updated (props: Map<keyof ICheckboxBehaviorProperties, unknown>) {
		super.updated(props as Map<keyof IFormElementBehaviorProperties, unknown>);

		// When checked we need to show the aria checked attribute
		if (props.has("checked")) {
			this.ariaChecked = this.checked.toString();
		}
	}

	/**
	 * Attaches the keydown and click listeners.
	 */
	protected attachListeners () {
		this.listeners.push(
			addListener(this.eventTarget, "click", this.onClick),
			addListener(this.eventTarget, "keydown", this.onKeyDown)
		);
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
		if (e.code === SPACE || e.code === ENTER) {
			this.eventTarget.click();
			stopEvent(e);
		}
	}

	/**
	 * Returns the template for the form element
	 */
	protected renderFormElement (): TemplateResult {
		return html`
			<input
				id="${this.formElementId}"
				type="${<any>this.formElementType}"
				?checked="${this.checked}"
				?required="${this.required}"
				?disabled="${this.disabled}"
				?readonly="${this.readonly}"
				.value="${ifDefined(this.value)}"
				name="${ifDefined(this.name)}"
				style="display: none"
				aria-hidden="true"
				tabindex="-1"
			/>
		`;
	}
}

