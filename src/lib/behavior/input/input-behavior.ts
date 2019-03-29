import { html, property, TemplateResult } from "lit-element";
import { AriaRole } from "../../util/aria";
import { ENTER } from "../../util/constant/keycode";
import { cssResult } from "../../util/css";
import { renderAttributes } from "../../util/dom";
import { addListener } from "../../util/event";
import { FormElementBehavior, IFormElementBehaviorProperties } from "../form-element/form-element-behavior";
import styles from "./input-behavior.scss";

/**
 * Events the input can dispatch.
 */
export enum InputBehaviorEvent {
	SUBMIT = "submit"
}

/**
 * Properties of the input.
 */
export interface IInputBehaviorProperties extends IFormElementBehaviorProperties{
	outlined: boolean;
	role: AriaRole;
	filled: boolean;
	autocomplete?: "on" | "off";
	label?: string;
}

/**
 * Provides input behavior that interacts with forms.
 * @event submit - Dispatched when the enter key is hit while pressing ctrl or the meta-key.
 * @slot before - Content before the input.
 * @slot after - Content after the input.
 * @cssprop --input-state-color-inactive - State color when inactive.
 * @cssprop --input-state-color-active - State color when active.
 * @cssprop --input-state-color-hover - State color on :hover.
 * @cssprop --input-state-color-invalid - State color when invalid.
 * @cssprop --input-state-color-disabled - State color when disabled.
 * @cssprop --input-color - Default color.
 * @cssprop --input-color-disabled - Color when disabled.
 * @cssprop --input-transition - Transition.
 * @cssprop --input-bg - Default background.
 * @cssprop --input-bg-filled - Background when filled.
 * @cssprop --input-bg-filled-hover - Background on :hover.
 * @cssprop --input-border-width - Width of the border.
 * @cssprop --input-before-after-color - Color of the before and after slots.
 * @cssprop --input-font-size - Font size.
 * @cssprop --input-padding-left-right - Padding for the left and right.
 * @cssprop --input-padding-top-bottom - Padding for the top and bottom.
 * @cssprop --input-padding-left-right-outlined - Padding for the left and right when outlined.
 * @cssprop --input-border-radius-filled - Border radius when filled.
 * @cssprop --input-border-radius-outlined - Border radius when outlined.
 * @cssprop --input-font-family - Font family.
 * @cssprop --input-label-color - Color of the label.
 * @cssprop --input-label-color-disabled - Color of the label when disabled.
 * @cssprop --input-label-font-size - Font size of the label.
 * @cssprop --input-label-transition - Transition of the label.
 * @cssprop --input-label-space - Space between label and input content.
 */
export abstract class InputBehavior extends FormElementBehavior implements IInputBehaviorProperties {
	static styles = [...FormElementBehavior.styles, cssResult(styles)];

	/**
	 * Whether autocomplete is on or off.
	 * @attr
	 */
	@property({type: String, reflect: true}) autocomplete?: "on" | "off";

	/**
	 * Makes the input outlined.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) outlined: boolean = false;

	/**
	 * Fills the input with a solid color.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) filled: boolean = false;

	/**
	 * Role of the input.
	 * @attr
	 */
	@property({type: String, reflect: true}) role: AriaRole = "textbox";

	/**
	 * Label text.
	 * @attr
	 */
	@property({type: String, reflect: true}) label?: string;

	/**
	 * Value of the form element.
	 * @attr
	 * @param value
	 */
	@property({type: String}) set value (value: string) {
		this.setValue(value);
	}

	get value () {
		return this.getFormItemValue();
	}

	/**
	 * Value of the slider.
	 * @attr
	 * @param value
	 */
	@property({type: Number}) set valueAsNumber (value: number) {
		this.setValue(value.toString());
	}

	get valueAsNumber () {
		return parseFloat(this.getFormItemValue());
	}

	/**
	 * Returns the main slot element.
	 */
	get $slot (): HTMLSlotElement {
		return this.shadowRoot!.querySelector<HTMLSlotElement>("#slot")!;
	}

	/**
	 * Returns whether the component is pristine or has been touched.
	 */
	private _pristine = true;
	get pristine () {
		return this._pristine;
	}

	/**
	 * Returns whether the nativeInput is dirty or not.
	 */
	get dirty (): boolean {
		return (this.value != null && this.value !== "");
	}

	/**
	 * Hooks up the element.
	 * @param props
	 */
	protected firstUpdated (props: Map<keyof IInputBehaviorProperties, unknown>) {
		super.firstUpdated(<Map<keyof IFormElementBehaviorProperties, unknown>>props);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onInput = this.onInput.bind(this);
		this.onBlur = this.onBlur.bind(this);

		this.listeners.push(
			addListener(this.$formElement, "keydown", this.onKeyDown, {passive: true}),
			addListener(this.$formElement, "input", this.onInput, {passive: true}),
			addListener(this.$formElement, "focusout", this.onBlur, {passive: true})
		);

		// Set the initial value after the native form element has been created.
		if (this.initialValue != null || this.hasAttribute("value")) {
			this.value = this.initialValue || this.getAttribute("value") || "";
		}
	}

	/**
	 * Reacts when properties are updated.
	 * @param props
	 */
	protected updated (props: Map<keyof IInputBehaviorProperties, unknown>) {
		super.updated(props as Map<keyof IFormElementBehaviorProperties, unknown>);
		this.refreshAttributes();
	}

	/**
	 * Creates a root that delegates the focus.
	 */
	protected createRenderRoot () {
		return this.attachShadow({mode: "open", delegatesFocus: true});
	}

	/**
	 * Focuses the form element.
	 */
	focus () {
		this.$formElement.focus();
	}

	/**
	 * Sets the value of the form element.
	 * @param value
	 */
	protected setValue (value: string) {
		if (this.$formElement != null) {
			this.$formElement.value = value;
			this.refreshAttributes();

		} else {
			// Store the initial value so the correct value can be set when the $formElement is added to the DOM.
			this.initialValue = value;
		}
	}

	/**
	 * Handles the input event.
	 * @param e
	 */
	protected onInput (e: Event) {
		this.refreshAttributes();
	}

	/**
	 * Handles the on blur event.
	 */
	protected onBlur () {
		this._pristine = false;
		this.refreshAttributes();
	}

	/**
	 * Refreshes the attributes.
	 */
	protected refreshAttributes () {
		renderAttributes(this, {
			dirty: this.dirty,
			invalid: !this.valid && !this.pristine,
			pristine: this.pristine
		});
	}

	/**
	 * Handles the key up event.
	 * @param e
	 */
	protected onKeyDown (e: KeyboardEvent) {
		switch (e.code) {
			case ENTER:
				if (e.ctrlKey || e.metaKey) {
					this.dispatchEvent(new CustomEvent(InputBehaviorEvent.SUBMIT, {composed: true}));
				}
				break;
		}
	}

	/**
	 * Returns the form element template.
	 */
	protected abstract renderFormElement (): TemplateResult;

	/**
	 * Returns the template for the element.
	 */
	protected render (): TemplateResult {
		return html`
			<div id="container">
				<slot id="before" name="before"></slot>
				<div id="wrapper">
					<div id="label">${this.label}</div>
					<slot id="slot"></slot>
					${this.renderFormElement()}
				</div>
				<slot id="after" name="after"></slot>
			</div>
		`;
	}
}