import { customElement, html, property, query, TemplateResult } from "lit-element";
import { ButtonBehavior, IButtonBehaviorProperties } from "../behavior/button/button-behavior";
import "../ripple";
import { Ripple } from "../ripple/ripple";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";

import styles from "./button.scss";

/**
 * Properties of the button.
 */
export interface IButtonProperties extends IButtonBehaviorProperties {
	flat: boolean;
	outlined: boolean;
	inverted: boolean;
	role: AriaRole;
	noRipple: boolean;
	fab: boolean;
}

/**
 * Allow users to take actions, and make choices, with a single tap.
 * @slot - Default content.
 * @cssprop --button-letter-spacing - Letter spacing
 * @cssprop --button-transition - Transition
 * @cssprop --button-padding - Padding
 * @cssprop --button-font-size - Font size
 * @cssprop --button-border-radius - Border radius
 * @cssprop --button-font-family - Font family
 * @cssprop --button-fab-size - Size of the button when fab attribute is present.
 * @cssprop --button-color - Default color
 * @cssprop --button-bg - Default background
 * @cssprop --button-shadow-color - Default shadow color
 * @cssprop --button-color-hover - Color when :hover or :focus
 * @cssprop --button-bg-hover - Background when :hover or :focus
 * @cssprop --button-shadow-color-hover - Shadow color when :hover or :focus
 * @cssprop --button-color-active - Button color when :active
 * @cssprop --button-bg-active - Background when :active
 * @cssprop --button-bg-active-flat - Background when :active and flat attribute is present.
 * @cssprop --button-color-disabled - Color when disabled
 * @cssprop --button-bg-disabled - Background when disabled
 * @cssprop --button-border-outlined - Border when outlined attribute is present
 */
@customElement("wl-button")
export class Button extends ButtonBehavior implements IButtonProperties {
	static styles = [...ButtonBehavior.styles, cssResult(styles)];

	/**
	 * Inverts the colors of the button.
	 * @attr
	 */
	@property({ type: Boolean, reflect: true }) inverted: boolean = false;

	/**
	 * Makes the button round and squared.
	 * @attr
	 */
	@property({ type: Boolean, reflect: true }) fab: boolean = false;

	/**
	 * Makes the button outlined.
	 * @attr
	 */
	@property({ type: Boolean, reflect: true }) outlined: boolean = false;

	/**
	 * Deactivates the ripple.
	 * @attr
	 */
	@property({ type: Boolean, reflect: true }) noRipple: boolean = false;

	/**
	 * Makes the button flat.
	 * @attr
	 */
	@property({ type: Boolean, reflect: true }) flat: boolean = false;

	/**
	 * Role of the button.
	 * @attr
	 */
	@property({ type: String, reflect: true }) role: AriaRole = "button";

	/**
	 * Ripple element.
	 */
	@query("#ripple") protected $ripple!: Ripple;

	/**
	 * Returns the template of the element.
	 */
	render(): TemplateResult {
		return html`
			<wl-ripple id="ripple" overlay .target="${this}" ?disabled="${this.disabled || this.noRipple}"></wl-ripple>
			<slot></slot>
			${this.renderFormElement()}
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-button": Button;
	}
}
