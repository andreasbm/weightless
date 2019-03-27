import { customElement, html, TemplateResult } from "lit-element";
import { SwitchBehavior, ISwitchBehaviorProperties } from "../behavior/switch/switch-behavior";
import "../ripple";
import { cssResult } from "../util/css";

import styles from "./switch.scss";

/**
 * Properties of the switch.
 */
export interface ISwitchProperties extends ISwitchBehaviorProperties {
}

/**
 * Turn an option on or off.
 */
@customElement("wl-switch")
export class Switch extends SwitchBehavior implements ISwitchProperties {
	static styles = [...SwitchBehavior.styles, cssResult(styles)];

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
		"wl-switch": Switch;
	}
}
