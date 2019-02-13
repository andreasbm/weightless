import { html, property, TemplateResult } from "lit-element";
import { FormItemBehavior, IFormItemBehaviorProperties } from "../form-item/form-item-behavior";
import { sharedStyles } from "../style/shared";
import { ENTER } from "../util/constant/keycode";
import { cssResult } from "../util/css";
import { addListener } from "../util/event";
import styles from "./input-behavior.scss";

export enum InputBehaviorEvent {
	SUBMIT = "submit"
}

export interface IInputBehaviorProperties extends IFormItemBehaviorProperties{
	autocomplete: "on" | "off";
	outlined: boolean;
	role: string;
	filled: boolean;
	placeholder?: string;
}

export abstract class InputBehavior extends FormItemBehavior implements IInputBehaviorProperties {
	static styles = [sharedStyles, cssResult(styles)];

	@property({type: String, reflect: true}) autocomplete: "on" | "off";
	@property({type: Boolean, reflect: true}) outlined: boolean = false;
	@property({type: Boolean, reflect: true}) filled: boolean = false;
	@property({type: String, reflect: true}) role = "textbox";
	@property({type: String, reflect: true}) placeholder?: string;

	firstUpdated (props: Map<keyof IInputBehaviorProperties, unknown>) {
		super.firstUpdated(<Map<keyof IFormItemBehaviorProperties, unknown>>props);
		this.onKeyDown = this.onKeyDown.bind(this);

		this.listeners.push(
			addListener(this.$formItem, "keydown", this.onKeyDown, {passive: true})
		);

		this.value = this.getAttribute("value") || "";
	}

	focus () {
		this.$formItem.focus();
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

	/**
	 * Returns the form item
	 */
	protected abstract renderFormItem (): TemplateResult;

	/**
	 * Renders the textfield.
	 */
	protected render (): TemplateResult {
		return html`
			<div id="container">
				<slot id="before" name="before"></slot>
				<div id="wrapper">
					<div id="placeholder">${this.placeholder}</div>
					<slot></slot>
				</div>
				<slot id="after" name="after"></slot>
				<div id="ruler"></div>
			</div>
			${this.renderFormItem()}
		`;
	}
}