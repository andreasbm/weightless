import { html, property, PropertyValues } from "lit-element";
import { TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";
import { FormItem, FormItemBehavior, IFormItemBehaviorProperties } from "../form-item/form-item-behavior";
import { addListener } from "../util/event";
import { renderAttributes } from "../util/html";

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

	/**
	 * Whether the component is pristine or has been touched.
	 */
	private _pristine = true;
	get pristine () {
		return this._pristine;
	}

	/**
	 * Whether the nativeInput is dirty or not.
	 */
	get dirty (): boolean {
		return (this.value != null && this.value !== "");
	}

	/**
	 * Whether the nativeInput is valid or not.
	 * @returns {boolean}
	 */
	get valid (): boolean {
		return (this.validity != null ? this.validity.valid : true);
	}

	connectedCallback () {
		super.connectedCallback();
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.setAttribute("role", this.role);
	}

	firstUpdated (props: Map<keyof IInputBehaviorProperties, unknown>) {
		super.firstUpdated(<Map<keyof IFormItemBehaviorProperties, unknown>>props);

		this.listeners.push(
			addListener(this.$formItem, "change", this.onChange, {passive: true}),
			addListener(this.$formItem, "focusout", this.onBlur, {passive: true})
		);
	}

	protected updated (props: Map<keyof IInputBehaviorProperties, unknown>) {
		super.updated(props);

		renderAttributes(this, {
			dirty: this.dirty,
			invalid: !this.valid && !this.pristine,
			pristine: this.pristine
		});
	}

	protected onChange (e: Event) {
		this.value = (<HTMLInputElement>e.target).value;
	}

	/**
	 * Handles the on blur event.
	 */
	protected onBlur () {
		this._pristine = false;
		this.requestUpdate().then();
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