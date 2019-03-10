import { customElement, html, property, PropertyValues, query, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { FormElementBehavior, IFormElementBehaviorProperties } from "../behavior/form-element/form-element-behavior";
import "../ripple";
import { RIPPLE_INITIAL_DURATION, WlRipple } from "../ripple/wl-ripple";
import { AriaRole, updateTabindex } from "../util/aria";
import { ENTER, SPACE } from "../util/constant/keycode";
import { cssResult } from "../util/css";
import { renderAttributes } from "../util/dom";
import { addListener, stopEvent } from "../util/event";

import styles from "./wl-button.scss";

/**
 * Properties of the button.
 */
export interface IButtonProperties extends IFormElementBehaviorProperties {
	type: "button" | "submit";
	inverted: boolean;
	outlined: boolean;
	flat: boolean;
	role: AriaRole;
	noRipple: boolean;
	fab: boolean;
}

/**
 * Default ripple duration.
 */
export const BUTTON_RIPPLE_DURATION = RIPPLE_INITIAL_DURATION;

/**
 * Ripple duration when fab.
 */
export const BUTTON_FAB_RIPPLE_DURATION = 200;

/**
 * Allow users to take actions, and make choices, with a single tap.
 * @slot - Default content.
 * @cssprop --button-letter-spacing - Letter spacing.
 * @cssprop --button-fab-size - Size of the button when fab attribute is present.
 * @cssprop --button-color - Default color.
 * @cssprop --button-bg - Default background.
 * @cssprop --button-shadow-color - Default shadow color.
 * @cssprop --button-color-hover - Color on :hover.
 * @cssprop --button-bg-hover - Background on :hover.
 * @cssprop --button-shadow-color-hover - Shadow color on hover.
 * @cssprop --button-color-active - Color on :active.
 * @cssprop --button-bg-active - Background on :active.
 * @cssprop --button-bg-active-flat - Background on :active when flat attribute is present.
 * @cssprop --button-color-disabled - Color when disabled.
 * @cssprop --button-bg-disabled - Background when disabled.
 * @cssprop --button-border-outlined - Border when outline attribute is present.
 * @cssprop --button-transition - Transition.
 * @cssprop --button-padding - Padding.
 * @cssprop --button-font-size - Font size.
 * @cssprop --button-border-radius - Border radius.
 * @cssprop --button-font-family - Font family.
 */
@customElement("wl-button")
export class WlButton extends FormElementBehavior implements IButtonProperties {
	static styles = [...FormElementBehavior.styles, cssResult(styles)];

	/**
	 * Type of the button.
	 * @attr
	 */
	@property({type: String}) type: "button" | "submit" = "submit";

	/**
	 * Inverts the colors of the button.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) inverted: boolean = false;

	/**
	 * Makes the button round and squared.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) fab: boolean = false;

	/**
	 * Makes the button outlined.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) outlined: boolean = false;

	/**
	 * Deactivates the ripple.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) noRipple: boolean = false;

	/**
	 * Makes the button flat.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) flat: boolean = false;

	/**
	 * Role of the button.
	 * @attr
	 */
	@property({type: String, reflect: true}) role: AriaRole = "button";

	/**
	 * Ripple element.
	 * @attr
	 */
	@query("#ripple") protected $ripple!: WlRipple;

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

		// Re-fire the event on the inner form element to interact with the form if there is one
		if (e.target == this && !e.defaultPrevented) {
			this.$formElement.dispatchEvent(new MouseEvent("click", {relatedTarget: this, composed: true}));
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
			updateTabindex(this, this.disabled);
			renderAttributes(this, {"aria-disabled": `${this.disabled}`});
		}
	}

	/**
	 * Returns the form element
	 */
	protected renderFormElement (): TemplateResult {
		return html`
			<button
				id="${this.formElementId}"
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
			<wl-ripple id="ripple" overlay .target="${this}" ?centered="${this.fab}" ?disabled="${this.disabled || this.noRipple}" initialDuration="${this.fab ? BUTTON_FAB_RIPPLE_DURATION : BUTTON_RIPPLE_DURATION}"></wl-ripple>
			<slot></slot>
			${this.renderFormElement()}
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-button": WlButton;
	}
}
