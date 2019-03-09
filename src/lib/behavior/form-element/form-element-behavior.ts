import { LitElement, property } from "lit-element";
import { sharedStyles } from "../../style/shared";
import { cssResult } from "../../util/css";
import { addListener, EventListenerSubscription, removeListeners } from "../../util/event";
import { renderAttributes } from "../../util/dom";
import { uniqueID } from "../../util/unique";
import styles from "form-element-behavior.scss";

export type FormElement =
	(HTMLInputElement
		| HTMLOutputElement
		| HTMLButtonElement
		| HTMLObjectElement
		| HTMLSelectElement
		| HTMLTextAreaElement) & {value: string};

export interface IFormElementBehaviorProperties {
	disabled: boolean;
	value: string;
	readonly: boolean;
	required: boolean;
	name?: string;
}

/**
 * Provides form element behavior that interacts with forms.
 */
export abstract class FormElementBehavior extends LitElement implements IFormElementBehaviorProperties {
	static styles = [sharedStyles, cssResult(styles)];

	/**
	 * Disables the element.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) disabled: boolean = false;

	/**
	 * Makes the element readonly (disabled but tabbable)
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) readonly: boolean = false;

	/**
	 * Makes the element required in a form context.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) required: boolean = false;

	/**
	 * Name of the native form element.
	 * @attr
	 */
	@property({type: String}) name?: string;

	/**
	 * Value of the form element.
	 * @attr
	 * @param value
	 */
	@property({type: String}) set value (value: string) {
		this.setValue(value);
	}

	get value () {
		return this.getValue();
	}

	/**
	 * Initial value is only set if the form element doesn't exist which will be the case
	 * if it is set before the first update.
	 */
	protected initialValue?: string;

	/**
	 * Id of the native form element.
	 */
	protected formElementId = uniqueID();

	/**
	 * Native form element.
	 */
	protected $formElement!: FormElement;

	/**
	 * Active listeners on the element.
	 */
	protected listeners: EventListenerSubscription[] = [];

	/**
	 * Message for the current validation.
	 */
	get validationMessage (): string {
		return this.$formElement.validationMessage;
	}

	/**
	 * Returns whether the component is pristine or has been touched.
	 */
	private _pristine = true;
	get pristine () {
		return this._pristine;
	}

	/**
	 * Returns whether the nativeInput is dirty or not.
	 */
	get dirty (): boolean {
		return (this.value != null && this.value !== "");
	}

	/**
	 * Returns whether the nativeInput is valid or not.
	 * @returns {boolean}
	 */
	get valid (): boolean {
		return (this.validity != null ? this.validity.valid : true);
	}

	/**
	 * Returns the validity state.
	 */
	get validity (): ValidityState {
		return this.$formElement.validity;
	}

	/**
	 * Returns whether an element will successfully validate based on forms validation rules and constraints.
	 */
	get willValidate (): boolean {
		return this.$formElement.willValidate;
	}

	/**
	 * Returns the associated form of the native form element.
	 */
	get form (): HTMLFormElement | null {
		return this.$formElement.form;
	}

	/**
	 * Tears down the component.
	 */
	disconnectedCallback () {
		super.disconnectedCallback();
		removeListeners(this.listeners);
	}

	/**
	 * Checks the validity of the form element.
	 */
	checkValidity (): boolean {
		return this.$formElement.checkValidity();
	}

	/**
	 * Sets a custom validity on the form element.
	 * @param error
	 */
	setCustomValidity (error: string) {
		return this.$formElement.setCustomValidity(error);
	}

	/**
	 * When the form element first updates we add the form element to the light DOM.
	 * @param props
	 */
	protected firstUpdated (props: Map<keyof IFormElementBehaviorProperties, unknown>) {
		super.firstUpdated(props);

		this.onInput = this.onInput.bind(this);
		this.onBlur = this.onBlur.bind(this);

		// Move the form element to the light DOM
		this.$formElement = this.queryFormElement();
		this.appendChild(this.$formElement);

		this.listeners.push(
			addListener(this.$formElement, "input", this.onInput, {passive: true}),
			addListener(this.$formElement, "focusout", this.onBlur, {passive: true})
		);
	}

	/**
	 * Sets the value of the form element.
	 * @param value
	 */
	protected setValue (value: string) {
		if (this.$formElement != null) {
			this.$formElement.value = value;
			this.refreshAttributes();
		} else {
			// Store the initial value so the correct value can be set when the $formElement is added to the DOM.
			this.initialValue = value;
		}
	}

	/**
	 * Returns the value of the form element.
	 */
	protected getValue (): string {
		return this.$formElement != null ? this.$formElement.value : this.initialValue || "";
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
	 * Queries the form element from the shadow root.
	 */
	protected queryFormElement (): FormElement {
		return this.shadowRoot!.querySelector<FormElement>(`#${this.formElementId}`)!;
	}
}