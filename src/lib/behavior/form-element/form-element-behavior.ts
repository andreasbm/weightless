import styles from "form-element-behavior.scss";
import { LitElement, property } from "lit-element";
import { sharedStyles } from "../../style/shared";
import { updateTabindex } from "../../util/aria";
import { cssResult } from "../../util/css";
import { renderAttributes } from "../../util/dom";
import { addListener, EventListenerSubscription, removeListeners } from "../../util/event";
import { uniqueID } from "../../util/unique";

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
	@property({type: String}) value: string = "";

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

		// Move the form element to the light DOM
		this.$formElement = this.queryFormElement();
		this.appendChild(this.$formElement);
	}

	/**
	 * Responds to property changes.
	 * @param props
	 */
	protected updated (props: Map<keyof IFormElementBehaviorProperties, unknown>) {
		super.updated(props);

		// When disabled we need to show the aria disabled attribute
		if (props.has("disabled")) {
			renderAttributes(this, {
				"aria-disabled": this.disabled.toString()
			});
		}

		// Update the tab index
		this.updateTabindex(props);
	}

	/**
	 * Updates the tabindex.
	 */
	protected updateTabindex (props: Map<keyof IFormElementBehaviorProperties, unknown>) {
		if (props.has("disabled")) {
			updateTabindex(this, this.disabled);
		}
	}

	/**
	 * Returns the value of the form element.
	 */
	protected getFormItemValue (): string {
		return this.$formElement != null ? this.$formElement.value : this.initialValue || "";
	}

	/**
	 * Queries the form element from the shadow root.
	 */
	protected queryFormElement (): FormElement {
		return this.shadowRoot!.querySelector<FormElement>(`#${this.formElementId}`)!;
	}
}