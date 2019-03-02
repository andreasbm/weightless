import { customElement, html } from "lit-element";
import { TemplateResult } from "lit-html";
import { CheckboxBehavior, ICheckboxBehaviorProperties } from "../behavior/checkbox/checkbox-behavior";
import "../ripple";
import { cssResult } from "../util/css";

import styles from "./checkbox-element.scss";

/**
 * Properties of the checkbox.
 */
export interface ICheckboxElementProperties extends ICheckboxBehaviorProperties {
}

/**
 * Turn an option on or off.
 */
@customElement("checkbox-element")
export class CheckboxElement extends CheckboxBehavior implements ICheckboxElementProperties {
	static styles = [...CheckboxBehavior.styles, cssResult(styles)];

	/**
	 * Returns the template for the component.
	 */
	protected render (): TemplateResult {
		return html`
			<svg id="checkmark" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 24 24">
                <path id="path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
            </svg>
			<ripple-element id="ripple" .target="${this}" focusable overlay unbounded centered initialDuration="200"></ripple-element>
			${this.renderFormItem()}
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"checkbox-element": CheckboxElement;
	}
}
