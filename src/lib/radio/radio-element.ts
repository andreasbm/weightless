import { customElement, html } from "lit-element";
import { TemplateResult } from "lit-html";
import { IRadioBehaviorProperties, RadioBehavior } from "../behavior/radio-behavior/radio-behavior";

import "../ripple";
import { cssResult } from "../util/css";

import styles from "./radio-element.scss";

export interface IRadioElementProperties extends IRadioBehaviorProperties {
}

@customElement("radio-element")
export class RadioElement extends RadioBehavior implements IRadioElementProperties {

	static styles = [...RadioBehavior.styles, cssResult(styles)];

	/**
	 * Returns the template for the component.
	 */
	protected render (): TemplateResult {
		return html`
            <div id="dot"></div>
			<ripple-element id="ripple" .target="${this}" focusable overlay unbounded centered initialDuration="200"></ripple-element>
			${this.renderFormItem()}
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"radio-element": RadioElement;
	}
}
