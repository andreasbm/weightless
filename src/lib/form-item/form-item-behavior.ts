import { LitElement, property } from "lit-element";
import { addListener, EventListenerSubscription, removeListeners } from "../util/event";
import { renderAttributes } from "../util/html";

export type FormItem =
	(HTMLInputElement
		| HTMLOutputElement
		| HTMLButtonElement
		| HTMLObjectElement
		| HTMLSelectElement
		| HTMLTextAreaElement) & {value: string};

export interface IFormItemBehaviorProperties {
	disabled: boolean;
	value: string;
	readonly: boolean;
	required: boolean;
	name?: string;
}

export abstract class FormItemBehavior extends LitElement implements IFormItemBehaviorProperties {
	@property({type: Boolean, reflect: true}) disabled: boolean = false;
	@property({type: Boolean, reflect: true}) readonly: boolean = false;
	@property({type: Boolean, reflect: true}) required: boolean = false;
	@property({type: String}) name?: string;

	@property({type: String}) set value (value: string) {
		this.setValue(value);
	}

	get value () {
		return this.getValue();
	}

	protected $formItem!: FormItem;
	protected listeners: EventListenerSubscription[] = [];

	get validationMessage (): string {
		return this.$formItem.validationMessage;
	}

	get invalid (): boolean {
		return this.$formItem.validity.valid;
	}

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

	get validity (): ValidityState {
		return this.$formItem.validity;
	}

	get willValidate (): boolean {
		return this.$formItem.willValidate;
	}

	get form (): HTMLFormElement | null {
		return this.$formItem.form;
	}

	/**
	 * When the form item first updates we add the form item to the light DOM.
	 * @param props
	 */
	protected firstUpdated (props: Map<keyof IFormItemBehaviorProperties, unknown>) {
		super.firstUpdated(props);

		this.onInput = this.onInput.bind(this);
		this.onBlur = this.onBlur.bind(this);

		// Move the form item to the light DOM
		this.$formItem = this.queryFormItem();
		this.appendChild(this.$formItem);

		this.listeners.push(
			addListener(this.$formItem, "input", this.onInput, {passive: true}),
			addListener(this.$formItem, "focusout", this.onBlur, {passive: true})
		);
	}

	/**
	 * Sets the value of the form item.
	 * @param value
	 */
	protected setValue (value: string) {
		if (this.$formItem != null) {
			this.$formItem.value = value;
			this.refreshAttributes();
		}
	}

	/**
	 * Gets the value of the form item.
	 */
	protected getValue (): string {
		return this.$formItem != null ? this.$formItem.value : "";
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
	 * Tear down the component.
	 */
	disconnectedCallback () {
		super.disconnectedCallback();
		removeListeners(this.listeners);
	}

	/**
	 * Checks the validity of the form item.
	 */
	checkValidity (): boolean {
		return this.$formItem.checkValidity();
	}

	/**
	 * Sets a custom validity on the form item.
	 * @param error
	 */
	setCustomValidity (error: string) {
		return this.$formItem.setCustomValidity(error);
	}

	/**
	 * Queries the form item from the shadow root.
	 */
	protected queryFormItem (): FormItem {
		return this.shadowRoot!.querySelector<FormItem>("#form-item")!;
	}
}