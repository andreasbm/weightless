import { html, property, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { WlRipple } from "../../ripple/wl-ripple";
import { ENTER, SPACE } from "../../util/constant/keycode";
import { cssResult } from "../../util/css";
import { addListener, stopEvent } from "../../util/event";
import { FormElementBehavior, IFormElementBehaviorProperties } from "../form-element";

import styles from "./button-behavior.scss";

/**
 * Properties of the button behavior.
 */
export interface IButtonBehaviorProperties extends IFormElementBehaviorProperties {
	type: "button" | "submit";
}

/**
 * Provides checkbox behavior.
 */
export abstract class ButtonBehavior extends FormElementBehavior implements IButtonBehaviorProperties {
	static styles = [...FormElementBehavior.styles, cssResult(styles)];

	/**
	 * Type of the button.
	 * @attr
	 */
	@property({type: String}) type: "button" | "submit" = "submit";

	/**
	 * Ripple element.
	 */
	protected get $ripple (): WlRipple | null {
		return null;
	}

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
			stopEvent(e);

			// Show ripple if one has been defined
			if (this.$ripple != null) {
				this.$ripple.spawnRipple(undefined, {autoRelease: true});
			}
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

}

