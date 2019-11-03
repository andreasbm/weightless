import { customElement, html, TemplateResult } from "lit-element";
import { IRadioBehaviorProperties, RadioBehavior } from "../behavior/radio/radio-behavior";

import "../ripple";
import { cssResult } from "../util/css";

import styles from "./radio.scss";

/**
 * Properties of the radio.
 */
export interface IRadioProperties extends IRadioBehaviorProperties {}

/**
 * Select one option from a set.
 * @cssprop --radio-size - Width and height
 * @cssprop --radio-color - Default color
 * @cssprop --radio-bg - Default background
 * @cssprop --radio-color-checked - Color when checked
 * @cssprop --radio-bg-checked - Background when checked
 * @cssprop --radio-color-disabled - Color when disabled
 * @cssprop --radio-bg-disabled - Background when disabled and checked
 * @cssprop --radio-color-disabled-checked - Color when disabled and checked
 * @cssprop --radio-bg-disabled-checked - Background when disabled and checked
 * @cssprop --radio-border-config - Border configuration (width and style)
 * @cssprop --radio-border-radius - Border radius
 * @cssprop --radio-transition - Transition
 * @cssprop --radio-dot-size - Size of the dot
 * @cssprop --radio-dot-border-radius - Border radius of the dot
 * @cssprop --radio-dot-transition - Transition of the dot
 * @cssprop --radio-ripple-transform - Transform of the ripple
 */
@customElement("wl-radio")
export class Radio extends RadioBehavior implements IRadioProperties {
	static styles = [...RadioBehavior.styles, cssResult(styles)];

	/**
	 * Returns the template for the element.
	 */
	protected render(): TemplateResult {
		return html`
			<div id="dot"></div>
			<wl-ripple id="ripple" .target="${this}" focusable overlay unbounded centered initialDuration="200"></wl-ripple>
			<slot></slot>
			${this.renderFormElement()}
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-radio": Radio;
	}
}
