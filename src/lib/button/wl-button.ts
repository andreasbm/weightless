import { customElement, html, property, query, TemplateResult } from "lit-element";
import { ButtonBehavior, IButtonBehaviorProperties } from "../behavior/button/button-behavior";
import "../ripple";
import { WlRipple } from "../ripple/wl-ripple";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";

import styles from "./wl-button.scss";

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
export class WlButton extends ButtonBehavior implements IButtonProperties {
	static styles = [...ButtonBehavior.styles, cssResult(styles)];

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
	 */
	@query("#ripple") protected $ripple!: WlRipple;

	/**
	 * Returns the template of the element.
	 */
	render (): TemplateResult {
		return html`
			<wl-ripple id="ripple" overlay .target="${this}" ?disabled="${this.disabled || this.noRipple}"></wl-ripple>
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
