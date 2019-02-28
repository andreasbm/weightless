import { customElement, html, property, PropertyValues, query, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { FormItemBehavior, IFormItemBehaviorProperties } from "../behavior/form-item-behavior/form-item-behavior";
import "../ripple";
import { RippleElement } from "../ripple/ripple-element";
import { sharedStyles } from "../style/shared";
import { ENTER, SPACE } from "../util/constant/keycode";
import { cssResult } from "../util/css";
import { renderAttributes } from "../util/dom";
import { addListener, stopEvent } from "../util/event";

import styles from "./button-element.scss";

/**
 * Properties of the button.
 */
export interface IButtonElementProperties extends IFormItemBehaviorProperties {
	type: "button" | "submit";
	inverted: boolean;
	outlined: boolean;
	flat: boolean;
	role: string;
	noRipple: boolean;
	fab: boolean;
}

/**
 * Allow users to take actions, and make choices, with a single tap.
 */
@customElement("button-element")
export class ButtonElement extends FormItemBehavior implements IButtonElementProperties {
	static styles = [sharedStyles, cssResult(styles)];

	/**
	 * Type of the button.
	 */
	@property({type: String}) type: "button" | "submit" = "submit";

	/**
	 * Inverts the colors of the button.
	 */
	@property({type: Boolean, reflect: true}) inverted = false;

	/**
	 * Makes the button round and squared.
	 */
	@property({type: Boolean, reflect: true}) fab = false;

	/**
	 * Makes the button outlined.
	 */
	@property({type: Boolean, reflect: true}) outlined = false;

	/**
	 * Deactivates the ripple.
	 */
	@property({type: Boolean, reflect: true}) noRipple = false;

	/**
	 * Makes the button flat.
	 */
	@property({type: Boolean, reflect: true}) flat = false;

	/**
	 * Role of the button.
	 */
	@property({type: String, reflect: true}) role = "button";

	/**
	 * Ripple element.
	 */
	@query("#ripple") protected $ripple!: RippleElement;

	/**
	 * Hooks up the component.
	 */
	connectedCallback () {
		super.connectedCallback();

		this.onClick = this.onClick.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);

		this.listeners.push(
			addListener(this, "click", this.onClick),
			addListener(this, "keydown", this.onKeyDown)
		);
	}

	/**
	 * Handles the key down event.
	 * @param e
	 */
	protected onKeyDown (e: KeyboardEvent) {
		if (e.code === ENTER || e.code === SPACE) {
			this.click();
			this.$ripple.spawnRipple(undefined, {autoRelease: true});
			stopEvent(e);
		}
	}

	/**
	 * Handles click events on the button.
	 * @param e
	 */
	protected onClick (e: Event) {

		// If disabled we stop the event here
		if (this.disabled) {
			stopEvent(e);
			return;
		}

		// Re-fire the event on the inner form item to interact with the form if there is one
		if (e.target == this && !e.defaultPrevented) {
			this.$formItem.dispatchEvent(new MouseEvent("click", {relatedTarget: this, composed: true}));
			e.preventDefault();
		}
	}

	/**
	 * Responds to property changes.
	 * @param props
	 */
	protected updated (props: PropertyValues) {
		super.updated(props);

		// Update the tab index and aria-disabled based on the disabled property.
		if (props.has("disabled")) {
			this.tabIndex = this.disabled ? -1 : 0;
			renderAttributes(this, {"aria-disabled": this.disabled});
		}
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

	/**
	 * Returns the template of the element.
	 */
	render (): TemplateResult {
		return html`
			<ripple-element id="ripple" overlay .target="${this}" ?disabled="${this.disabled || this.noRipple}"></ripple-element>
			<slot></slot>
			${this.renderFormItem()}
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"button-element": ButtonElement;
	}
}
