import { html, property, PropertyValues, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { FormItemBehavior, IFormItemBehavior } from "../form-item/form-item-behavior";
import { ENTER, SPACE } from "../util/constant/keycode";
import { addListener, EventListenerSubscription, removeListeners } from "../util/event-listener";

export interface IButtonBehavior extends IFormItemBehavior {
	type: "button" | "submit";
	inverted: boolean;
	outlined: boolean;
	flat: boolean;
}

/**
 * Button behavior.
 */
export abstract class ButtonBehavior extends FormItemBehavior implements IButtonBehavior {
	@property({type: String}) type: "button" | "submit" = "submit";

	@property({type: Boolean, reflect: true}) inverted = false;
	@property({type: Boolean, reflect: true}) outlined = false;
	@property({type: Boolean, reflect: true}) flat = false;

	protected listeners: EventListenerSubscription[] = [];
	protected abstract role: string;

	/**
	 * Hook up the component.
	 */
	connectedCallback () {
		super.connectedCallback();
		this.setAttribute("role", this.role);

		this.onClick = this.onClick.bind(this);
		this.listeners = [
			addListener(this, "click", this.onClick),
			addListener(this, "keyup", (e: KeyboardEvent) => e.code === ENTER || e.code === SPACE ? this.onClick(e) : undefined)
		];
	}

	/**
	 * Tear down the component.
	 */
	disconnectedCallback () {
		super.disconnectedCallback();
		removeListeners(this.listeners);
	}

	/**
	 * Handle click events on the button.
	 * @param e
	 */
	protected onClick (e: Event) {

		// If disabled we stop the event here
		if (this.disabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		// Simulate the click on the form item to interact with the form if there is one.
		this.$formItem.click();
	}

	/**
	 * Each time a property updates we need to check if we should respond.
	 * @param props
	 */
	updated (props: PropertyValues) {
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