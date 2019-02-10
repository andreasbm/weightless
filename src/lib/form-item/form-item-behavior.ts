import { LitElement, property } from "lit-element";
import { addListener, EventListenerSubscription, removeListeners } from "../util/event";

export type FormItem =
	(HTMLInputElement
	| HTMLOutputElement
	| HTMLButtonElement
	| HTMLObjectElement
	| HTMLSelectElement
	| HTMLTextAreaElement) & {value: string};
const FORM_ITEM_EVENTS = ["valid", "invalid", "input"];

export interface IFormItemBehaviorProperties {
	disabled: boolean;
	value: string;
	readonly?: boolean;
	required?: boolean;
	name?: string;
}

export abstract class FormItemBehavior extends LitElement implements IFormItemBehaviorProperties {
	@property({type: Boolean, reflect: true}) disabled: boolean = false;
	@property({type: Boolean, reflect: true}) readonly?: boolean = false;
	@property({type: Boolean, reflect: true}) required?: boolean = false;
	@property({type: String}) name?: string;
	// @property({type: String}) value: string;

	get value () { return this.getValue();  }
	@property({type: String}) set value (value: string) {
		this.setValue(value);
	}

	protected $formItem!: FormItem;
	protected listeners: EventListenerSubscription[] = [];

	get validationMessage (): string {
		return this.$formItem.validationMessage;
	}

	get invalid (): boolean {
		return this.$formItem.validity.valid;
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

		// this.syncWithFormItem = this.syncWithFormItem.bind(this);
		// this.onInput = this.onInput.bind(this);

		// Move the form item to the light DOM
		this.$formItem = this.queryFormItem();
		this.appendChild(this.$formItem);

		// this.listeners.push(
		// 	addListener(this.$formItem, "valid", this.syncWithFormItem, {passive: true}),
		// 	addListener(this.$formItem, "invalid", this.syncWithFormItem, {passive: true}),
		// 	// addListener(this.$formItem, "input", this.onInput, {passive: true})
		// );
	}

	protected setValue (value: string) {
		if (this.$formItem != null) {
			this.$formItem.value = value;
		}
	}

	protected getValue (): string {
		return this.$formItem != null ? this.$formItem.value : "";
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

	// /**
	//  * Syncs the component with the form item.
	//  */
	// protected syncWithFormItem (e: Event) {
	// 	console.log("sync");
	// 	if (this.$formItem == null) return;
	// 	//this.invalid = !this.$formItem.validity.valid;
	// 	//this.value = (<HTMLInputElement>e.target).value;
	// 	// console.log(this.invalid);
	// }
	//
	// /**
	//  * Handles the input event.
	//  * @param e
	//  */
	// protected onInput (e: KeyboardEvent) {
	// 	console.log("INPUT");
	// 	this.syncWithFormItem(e);
	// }

	/**
	 * Queries the form item from the shadow root.
	 */
	protected queryFormItem (): FormItem {
		return this.shadowRoot!.querySelector<FormItem>("#form-item")!;
	}
}