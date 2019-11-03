import { customElement, html, TemplateResult } from "lit-element";
import { SwitchBehavior, ISwitchBehaviorProperties } from "../behavior/switch/switch-behavior";
import "../ripple";
import { cssResult } from "../util/css";

import styles from "./switch.scss";

/**
 * Properties of the switch.
 */
export interface ISwitchProperties extends ISwitchBehaviorProperties {}

/**
 * Turn an option on or off.
 * @cssprop --switch-width - Width
 * @cssprop --switch-height - Height
 * @cssprop --switch-border-radius - Border radius
 * @cssprop --switch-transition - Transition
 * @cssprop --switch-color - Default color
 * @cssprop --switch-bg - Default background
 * @cssprop --switch-color-checked - Color when checked
 * @cssprop --switch-bg-checked - Background when checked
 * @cssprop --switch-color-disabled - Color when disabled
 * @cssprop --switch-bg-disabled - Background when disabled
 * @cssprop --switch-color-disabled-checked - Color when disabled and checked
 * @cssprop --switch-bg-disabled-checked - Background when disabled and checked
 * @cssprop --switch-knob-size - Width and height of the knob
 * @cssprop --switch-knob-border-radius - Border radius of the knob
 * @cssprop --switch-knob-transition - Transition of the knob
 * @cssprop --switch-knob-elevation - Box shadow of the knob
 * @cssprop --switch-ripple-transform - Transform of the ripple
 */
@customElement("wl-switch")
export class Switch extends SwitchBehavior implements ISwitchProperties {
	static styles = [...SwitchBehavior.styles, cssResult(styles)];

	/**
	 * Returns the template for the component.
	 */
	protected render(): TemplateResult {
		return html`
			<div id="knob">
				<wl-ripple id="ripple" .target="${this}" focusable overlay unbounded centered initialDuration="200"></wl-ripple>
			</div>
			${this.renderFormElement()}
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-switch": Switch;
	}
}
