import { html, property, TemplateResult } from "lit-element";
import { AriaRole } from "../../util/aria";
import { ENTER } from "../../util/constant/keycode";
import { cssResult } from "../../util/css";
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
	autocomplete: "on" | "off";
	outlined: boolean;
	role: AriaRole;
	filled: boolean;
	placeholder?: string;
}

/**
 * Provides input behavior that interacts with forms.
 * @event submit - Dispatched when the enter key is hit while holding down ctrl or the meta-key.
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
 * @cssprop --input-placeholder-color - Color of the placeholder.
 * @cssprop --input-placeholder-color-disabled - Color of the placeholder when disabled.
 * @cssprop --input-placeholder-font-size - Font size of the placeholder.
 * @cssprop --input-placeholder-transition - Transition of the placeholder.
 * @cssprop --input-placeholder-space - Space between placeholder and input content.
 */
export abstract class InputBehavior extends FormElementBehavior implements IInputBehaviorProperties {
	static styles = [...FormElementBehavior.styles, cssResult(styles)];

	/**
	 * Whether autocomplete is on or off.
	 * @attr
	 */
	@property({type: String, reflect: true}) autocomplete: "on" | "off";

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
	 * Placeholder text.
	 * @attr
	 */
	@property({type: String, reflect: true}) placeholder?: string;

	/**
	 * Returns the main slot element.
	 */
	get $slot (): HTMLSlotElement {
		return this.shadowRoot!.querySelector<HTMLSlotElement>("#slot")!;
	}

	/**
	 * Hooks up the element.
	 * @param props
	 */
	protected firstUpdated (props: Map<keyof IInputBehaviorProperties, unknown>) {
		super.firstUpdated(<Map<keyof IFormElementBehaviorProperties, unknown>>props);
		this.onKeyDown = this.onKeyDown.bind(this);

		this.listeners.push(
			addListener(this.$formElement, "keydown", this.onKeyDown, {passive: true})
		);

		// Set the initial value after the native form element has been created.
		this.value = this.getAttribute("value") || "";
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
	 * Focuses the form element.
	 */
	focus () {
		this.$formElement.focus();
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
					<div id="placeholder">${this.placeholder}</div>
					<slot id="slot"></slot>
					${this.renderFormElement()}
				</div>
				<slot id="after" name="after"></slot>
			</div>
		`;
	}
}