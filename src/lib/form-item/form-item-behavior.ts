import { LitElement, property } from "lit-element";
import { addListener, EventListenerSubscription, removeListeners } from "../util/event";

export type FormItem =
	HTMLInputElement
	| HTMLOutputElement
	| HTMLButtonElement
	| HTMLObjectElement
	| HTMLSelectElement
	| HTMLTextAreaElement;
const FORM_ITEM_EVENTS = ["valid", "invalid", "input"];

export interface IFormItemBehaviorProperties {
	disabled: boolean;
	readonly?: boolean;
	required?: boolean;
	invalid?: boolean;
	name?: string;
	value?: string;
}

export abstract class FormItemBehavior extends LitElement implements IFormItemBehaviorProperties {
	@property({type: Boolean, reflect: true}) disabled: boolean = false;
	@property({type: Boolean, reflect: true}) readonly?: boolean = false;
	@property({type: Boolean, reflect: true}) required?: boolean = false;
	@property({type: Boolean, reflect: true}) invalid?: boolean = false;
	@property({type: String}) name?: string;
	@property({type: String}) value?: string;

	protected $formItem!: FormItem;
	protected listeners: EventListenerSubscription[] = [];

	get validationMessage (): string {
		return this.$formItem.validationMessage;
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

		this.syncWithFormItem = this.syncWithFormItem.bind(this);

		// Move the form item to the light DOM
		this.$formItem = this.queryFormItem();
		this.appendChild(this.$formItem);

		this.listeners.push(
			...FORM_ITEM_EVENTS.map(event => addListener(this.$formItem, event, this.syncWithFormItem))
		);
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
	 * Syncs the component with the form item.
	 */
	protected syncWithFormItem () {
		if (this.$formItem == null) return;
		this.invalid = !this.$formItem.validity.valid;
	}

	/**
	 * Queries the form item from the shadow root.
	 */
	protected queryFormItem (): FormItem {
		return this.shadowRoot!.querySelector<FormItem>("#form-item")!;
	}
}