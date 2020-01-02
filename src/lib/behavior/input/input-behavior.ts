import { html, property, TemplateResult } from "lit-element";
import { AriaRole } from "../../util/aria";
import { ENTER } from "../../util/constant/keycode";
import { cssResult } from "../../util/css";
import { renderAttributes } from "../../util/dom";
import { addListener } from "../../util/event";
import { FormElement, FormElementBehavior, IFormElementBehaviorProperties } from "../form-element/form-element-behavior";
import styles from "./input-behavior.scss";

/**
 * Events the input can dispatch.
 */
export enum InputBehaviorEvent {
	SUBMIT = "submit",
	INVALID = "invalid",
	INPUT = "input"
}

/**
 * Properties of the input.
 */
export interface IInputBehaviorProperties extends IFormElementBehaviorProperties {
	outlined: boolean;
	role: AriaRole;
	filled: boolean;
	autocomplete?: "on" | "off";
	label?: string;
}

/**
 * Provides input behavior that interacts with forms.
 * @event submit - Dispatched when the enter key is hit while pressing ctrl or the meta-key.
 * @event invalid - Dispatched when the input becomes invalid.
 * @event input - Dispatches from the native input event each time the input changes.
 * @slot before - Content before the input.
 * @slot after - Content after the input.
 * @cssprop --input-state-color-inactive - Inactive state color
 * @cssprop --input-state-color-active - Active state color
 * @cssprop --input-state-color-hover - Hover state color
 * @cssprop --input-state-color-invalid - Invalid state color
 * @cssprop --input-state-color-disabled - Disabled state color
 * @cssprop --input-color - Default color
 * @cssprop --input-bg - Default background
 * @cssprop --input-color-disabled - Color when disabled
 * @cssprop --input-bg-filled - Background when filled
 * @cssprop --input-bg-filled-hover - Background when filled and hover
 * @cssprop --input-transition - Transition
 * @cssprop --input-border-width - Border width
 * @cssprop --input-border-style - Border style
 * @cssprop --input-border-style-disabled - Border style when disabled
 * @cssprop --input-before-after-color - Color of the before and after slots
 * @cssprop --input-font-size - Font size
 * @cssprop --input-padding-left-right - Left and right padding
 * @cssprop --input-padding-top-bottom - Top and bottom padding
 * @cssprop --input-padding-left-right-outlined - Left and right padding when outlined
 * @cssprop --input-border-radius-filled - Border radius when filled
 * @cssprop --input-border-radius-outlined - Border radius when outlined
 * @cssprop --input-font-family - Font family
 * @cssprop --input-label-color - Color of the label
 * @cssprop --input-label-color-disabled - Color of the label when disabled
 * @cssprop --input-label-font-size - Font size of the label
 * @cssprop --input-label-transition - Transition of the label
 * @cssprop --input-label-space - Space between label and input
 */
export abstract class InputBehavior extends FormElementBehavior implements IInputBehaviorProperties {
	static styles = [...FormElementBehavior.styles, cssResult(styles)];

	/**
	 * Whether autocomplete is on or off.
	 * @attr
	 */
	@property({ type: String, reflect: true }) autocomplete?: "on" | "off";

	/**
	 * Makes the input outlined.
	 * @attr
	 */
	@property({ type: Boolean, reflect: true }) outlined: boolean = false;

	/**
	 * Fills the input with a solid color.
	 * @attr
	 */
	@property({ type: Boolean, reflect: true }) filled: boolean = false;

	/**
	 * Role of the input.
	 * @attr
	 */
	@property({ type: String, reflect: true }) role: AriaRole = "textbox";

	/**
	 * Label text.
	 * @attr
	 */
	@property({ type: String, reflect: true }) label?: string;

	/**
	 * Value of the form element.
	 * @attr
	 * @param value
	 */
	@property({ type: String }) set value(value: string) {
		this.setValue(value);
	}

	get value() {
		return this.getFormItemValue();
	}

	/**
	 * Value of the slider.
	 * @attr
	 * @param value
	 */
	@property({ type: Number }) set valueAsNumber(value: number) {
		this.setValue(value.toString());
	}

	get valueAsNumber() {
		return parseFloat(this.getFormItemValue());
	}

	/**
	 * Returns the main slot element.
	 */
	get $slot(): HTMLSlotElement {
		return this.shadowRoot!.querySelector<HTMLSlotElement>("#slot")!;
	}

	/**
	 * The element that the user interacts with.
	 * This will most likely be the form element.
	 */
	protected get $interactiveElement(): FormElement {
		return this.$formElement;
	}

	/**
	 * Returns whether the component is pristine or has been touched.
	 */
	private _pristine = true;
	get pristine() {
		return this._pristine;
	}

	/**
	 * Returns whether the nativeInput is dirty or not.
	 */
	get dirty(): boolean {
		return this.value != null && this.value !== "";
	}

	/**
	 * Hooks up the element.
	 * @param props
	 */
	protected firstUpdated(props: Map<keyof IInputBehaviorProperties, unknown>) {
		super.firstUpdated(<Map<keyof IFormElementBehaviorProperties, unknown>>props);

		this.listeners.push(
			addListener(this.$formElement, "keydown", this.onKeyDown.bind(this), { passive: true }),
			addListener(this.$formElement, "input", this.onInput.bind(this), { passive: true }),
			addListener(this.$formElement, "focusout", this.onBlur.bind(this), { passive: true }),
			addListener(this.$formElement, "invalid", this.onInvalid.bind(this), { passive: true })
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
	protected updated(props: Map<keyof IInputBehaviorProperties, unknown>) {
		super.updated(props as Map<keyof IFormElementBehaviorProperties, unknown>);
		this.refreshAttributes();
	}

	/**
	 * Creates a root that delegates the focus.
	 * As of now the delegating of focus only works in Chrome.
	 * We will have to come up with another solution for other browsers since they
	 * currently have to tab twice to reach the interactive element.
	 */
	protected createRenderRoot() {
		return this.attachShadow({ mode: "open", delegatesFocus: true });
	}

	/**
	 * Focuses the form element.
	 */
	focus() {
		this.$interactiveElement.focus();
	}

	/**
	 * Sets the value of the form element.
	 * @param value
	 */
	protected setValue(value: string) {
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
	protected onInput(e: Event) {
		this.refreshAttributes();
	}

	/**
	 * Dispatches an invalid event.
	 * We have to "redispatch" it because the native one doesn't bubble.
	 * @param e
	 */
	protected onInvalid(e: Event) {
		this.dispatchInputEvent(InputBehaviorEvent.INVALID);
	}

	/**
	 * Handles the on blur event.
	 */
	protected onBlur() {
		this._pristine = false;
		this.refreshAttributes();
	}

	/**
	 * Refreshes the attributes.
	 */
	protected refreshAttributes() {
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
	protected onKeyDown(e: KeyboardEvent) {
		switch (e.code) {
			case ENTER:
				if (e.ctrlKey || e.metaKey) {
					this.dispatchInputEvent(InputBehaviorEvent.SUBMIT);
				}
				break;
		}
	}

	/**
	 * Dispatches an input behavior event.
	 * @param e
	 */
	protected dispatchInputEvent(e: InputBehaviorEvent) {
		this.dispatchEvent(new CustomEvent(e, { composed: true }));
	}

	/**
	 * Returns the form element template.
	 */
	protected abstract renderFormElement(): TemplateResult;

	/**
	 * Returns the template for the element.
	 */
	protected render(): TemplateResult {
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
