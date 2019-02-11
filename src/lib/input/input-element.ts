import { customElement, html, property } from "lit-element";
import { TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";
import { FormItemBehavior, IFormItemBehaviorProperties } from "../form-item/form-item-behavior";
import { sharedStyles } from "../style/shared";
import { ENTER } from "../util/constant/keycode";
import { cssResult } from "../util/css";
import { addListener } from "../util/event";
import styles from "./input-element.scss";

export enum InputBehaviorEvent {
	SUBMIT = "submit"
}

export interface IInputElementProperties extends IFormItemBehaviorProperties {
	autocomplete: "on" | "off";
	type: string;
	box: boolean;
	role: string;
	pattern?: string;
	maxLength?: number;
	minLength?: number;
	placeholder?: string;
}

@customElement("input-element")
export class InputElement extends FormItemBehavior implements IInputElementProperties {
	static styles = [sharedStyles, cssResult(styles)];

	@property({type: String, reflect: true}) autocomplete: "on" | "off";
	@property({type: Boolean, reflect: true}) box: boolean = false;
	@property({type: String, reflect: true}) type: string = "text";
	@property({type: String, reflect: true}) role = "textbox";

	@property({type: String, reflect: true}) placeholder?: string;
	@property({type: String, reflect: true}) pattern?: string;
	@property({type: Number, reflect: true}) maxLength?: number;
	@property({type: Number, reflect: true}) minLength?: number;


	firstUpdated (props: Map<keyof IInputElementProperties, unknown>) {
		super.firstUpdated(<Map<keyof IFormItemBehaviorProperties, unknown>>props);
		this.onKeyDown = this.onKeyDown.bind(this);

		this.listeners.push(
			addListener(this.$formItem, "keydown", this.onKeyDown, {passive: true})
		);

		this.value = this.getAttribute("value") || "";
	}

	protected updated (props: Map<keyof IInputElementProperties, unknown>) {
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

declare global {
	interface HTMLElementTagNameMap {
		"input-element": InputElement;
	}
}
