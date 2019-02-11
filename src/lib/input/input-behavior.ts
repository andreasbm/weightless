import { html, property } from "lit-element";
import { TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";
import { FormItemBehavior, IFormItemBehaviorProperties } from "../form-item/form-item-behavior";
import { ENTER } from "../util/constant/keycode";
import { addListener } from "../util/event";

export enum InputBehaviorEvent {
	SUBMIT = "submit"
}

export interface IInputBehaviorProperties extends IFormItemBehaviorProperties {
	autocomplete: "on" | "off";
	type: string;
	box: boolean;
	pattern?: string;
	maxLength?: number;
	minLength?: number;
	placeholder?: string;
}

export abstract class InputBehavior extends FormItemBehavior implements IInputBehaviorProperties {
	@property({type: String, reflect: true}) autocomplete: "on" | "off";
	@property({type: Boolean, reflect: true}) box: boolean = false;
	@property({type: String, reflect: true}) type: string = "text";

	@property({type: String, reflect: true}) placeholder?: string;
	@property({type: String, reflect: true}) pattern?: string;
	@property({type: Number, reflect: true}) maxLength?: number;
	@property({type: Number, reflect: true}) minLength?: number;

	protected abstract role: string;

	connectedCallback () {
		super.connectedCallback();
		this.onKeyDown = this.onKeyDown.bind(this);
		this.setAttribute("role", this.role);
	}

	firstUpdated (props: Map<keyof IInputBehaviorProperties, unknown>) {
		super.firstUpdated(<Map<keyof IFormItemBehaviorProperties, unknown>>props);
		this.listeners.push(
			addListener(this.$formItem, "keydown", this.onKeyDown, {passive: true})
		);

		this.value = this.getAttribute("value") || "";
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
					this.dispatchEvent(new CustomEvent(InputBehaviorEvent.SUBMIT));
				}
				break;
		}
	}

	protected render (): TemplateResult {
		return html`
			<div id="container">
				<div id="placeholder">${this.placeholder}</div>
				<slot></slot>
				<div id="ruler"></div>
			</div>
			${this.renderFormItem()}
		`;
	}

	/**
	 * Returns the form item
	 */
	protected renderFormItem (): TemplateResult {
		return html`
			<input
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
			/>
		`;
	}
}