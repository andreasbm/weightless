import { html, property, PropertyValues, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { FormItemBehavior, IFormItemBehaviorProperties } from "../form-item/form-item-behavior";
import { ENTER, SPACE } from "../util/constant/keycode";
import { addListener, stopEvent } from "../util/event";

export enum ButtonBehaviorEvent {
	SUBMIT = "submit"
}

export interface IButtonBehaviorProperties extends IFormItemBehaviorProperties {
	type: "button" | "submit";
	inverted: boolean;
	outlined: boolean;
	flat: boolean;
}

/**
 * Button behavior.
 */
export abstract class ButtonBehavior extends FormItemBehavior implements IButtonBehaviorProperties {
	@property({type: String}) type: "button" | "submit" = "submit";
	@property({type: Boolean, reflect: true}) inverted = false;
	@property({type: Boolean, reflect: true}) outlined = false;
	@property({type: Boolean, reflect: true}) flat = false;

	protected abstract role: string;

	/**
	 * Hook up the component.
	 */
	connectedCallback () {
		super.connectedCallback();
		this.setAttribute("role", this.role);

		this.onClick = this.onClick.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);

		this.listeners.push(
			addListener(this, "click", this.onClick),
			addListener(this, "keyup", this.onKeyUp)
		);
	}

	/**
	 * Handles the key up event.
	 * @param e
	 */
	protected onKeyUp (e: KeyboardEvent) {
		if (e.code === ENTER || e.code === SPACE) {
			this.onClick(e);
		}
	}

	/**
	 * Handle click events on the button.
	 * @param e
	 */
	protected onClick (e: Event) {

		// If disabled we stop the event here
		if (this.disabled) {
			stopEvent(e);
			return;
		}

		// Simulate the click on the form item to interact with the form if there is one.
		this.$formItem.click();
		this.dispatchEvent(new CustomEvent(ButtonBehaviorEvent.SUBMIT));
	}

	/**
	 * Each time a property updates we need to check if we should respond.
	 * @param props
	 */
	protected updated (props: PropertyValues) {
		super.updated(props);

		if (props.has("disabled")) {
			this.updateTabIndex();
		}
	}

	/**
	 * Updates the tab index based on the disabled property.
	 */
	protected updateTabIndex () {
		this.tabIndex = this.disabled ? -1 : 0;
	}

	/**
	 * Returns the form item
	 */
	protected renderFormItem (): TemplateResult {
		return html`
			<button
				id="form-item"
				style="display: none"
				aria-hidden="true"
				tabindex="-1"
				type="${this.type}"
				?disabled="${this.disabled}"
				name="${ifDefined(this.name)}"
				value="${ifDefined(this.value)}">
			</button>
		`;
	}
}