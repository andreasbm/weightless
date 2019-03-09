import { html, property, TemplateResult } from "lit-element";
import { AriaRole } from "../../util/aria";
import { ENTER } from "../../util/constant/keycode";
import { cssResult } from "../../util/css";
import { addListener } from "../../util/event";
import { FormElementBehavior, IFormElementBehaviorProperties } from "../form-element/form-element-behavior";
import styles from "./input-behavior.scss";

export enum InputBehaviorEvent {
	SUBMIT = "submit"
}

export interface IInputBehaviorProperties extends IFormElementBehaviorProperties{
	autocomplete: "on" | "off";
	outlined: boolean;
	role: AriaRole;
	filled: boolean;
	placeholder?: string;
}

export abstract class InputBehavior extends FormElementBehavior implements IInputBehaviorProperties {
	static styles = [...FormElementBehavior.styles, cssResult(styles)];

	@property({type: String, reflect: true}) autocomplete: "on" | "off";
	@property({type: Boolean, reflect: true}) outlined: boolean = false;
	@property({type: Boolean, reflect: true}) filled: boolean = false;
	@property({type: String, reflect: true}) role: AriaRole = "textbox";
	@property({type: String, reflect: true}) placeholder?: string;

	get $slot (): HTMLSlotElement {
		return this.shadowRoot!.querySelector<HTMLSlotElement>("#slot")!;
	}

	firstUpdated (props: Map<keyof IInputBehaviorProperties, unknown>) {
		super.firstUpdated(<Map<keyof IFormElementBehaviorProperties, unknown>>props);
		this.onKeyDown = this.onKeyDown.bind(this);

		this.listeners.push(
			addListener(this.$formElement, "keydown", this.onKeyDown, {passive: true})
		);

		this.value = this.getAttribute("value") || "";
	}

	/**
	 * Focuses the form element.
	 */
	focus () {
		this.$formElement.focus();
	}

	protected updated (props: Map<keyof IInputBehaviorProperties, unknown>) {
		super.updated(props);
		this.refreshAttributes();
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
	 * Returns the form element
	 */
	protected abstract renderFormElement (): TemplateResult;

	/**
	 * Renders the textfield.
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