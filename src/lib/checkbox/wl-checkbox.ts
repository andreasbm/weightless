import { customElement, html, TemplateResult } from "lit-element";
import { CheckboxBehavior, ICheckboxBehaviorProperties } from "../behavior/checkbox/checkbox-behavior";
import "../ripple";
import { cssResult } from "../util/css";

import styles from "./wl-checkbox.scss";

/**
 * Properties of the checkbox.
 */
export interface ICheckboxProperties extends ICheckboxBehaviorProperties {
}

/**
 * Turn an option on or off.
 * @cssprop --checkbox-size - Width and height.
 * @cssprop --checkbox-bg - Default background.
 * @cssprop --checkbox-bg-checked - Background when checked.
 * @cssprop --checkbox-bg-disabled - Background when disabled.
 * @cssprop --checkbox-bg-disabled-checked - Background when disabled and checked
 * @cssprop --checkbox-color - Default color.
 * @cssprop --checkbox-color-checked - Color when checked.
 * @cssprop --checkbox-color-disabled - Color when disabled.
 * @cssprop --checkbox-color-disabled-checked - Color when disabled and checked.
 * @cssprop --checkbox-border-config - Border configuration (width and style)
 * @cssprop --checkbox-border-radius - Border radius.
 * @cssprop --checkbox-transition - Transition.
 * @cssprop --checkbox-checkmark-size - Width and height of the checkmark.
 * @cssprop --checkbox-checkmark-stroke-color - Color of the checkmark.
 * @cssprop --checkbox-checkmark-transition - Transition of the checkmark.
 * @cssprop --checkbox-checkmark-path-width - Width of the checkmark.
 * @cssprop --checkbox-checkmark-path-dasharray - Dasharray of the checkmark.
 * @cssprop --checkbox-checkmark-path-delay - Transition delay of the checkmark animation.
 * @cssprop --checkbox-ripple-transform - Transform of the ripple.
 */
@customElement("wl-checkbox")
export class WlCheckbox extends CheckboxBehavior implements ICheckboxProperties {
	static styles = [...CheckboxBehavior.styles, cssResult(styles)];

	/**
	 * Returns the template for the component.
	 */
	protected render (): TemplateResult {
		return html`
			<svg id="checkmark" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 24 24">
                <path id="path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
            </svg>
			<wl-ripple id="ripple" .target="${this}" focusable overlay unbounded centered initialDuration="200"></wl-ripple>
			${this.renderFormElement()}
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-checkbox": WlCheckbox;
	}
}
