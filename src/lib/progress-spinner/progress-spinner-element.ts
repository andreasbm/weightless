import { customElement, html, svg } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { IProgressBehaviorProperties, ProgressBehavior, ProgressMode } from "../behavior/progress-behavior/progress-behavior";

import styles from "./progress-spinner-element.scss";

export interface IProgressSpinnerElementProperties extends IProgressBehaviorProperties {

}

const DASH_ARRAY = 285;

@customElement("progress-spinner-element")
export class ProgressSpinnerElement extends ProgressBehavior implements IProgressSpinnerElementProperties {
	static styles = [...ProgressBehavior.styles, cssResult(styles)];

	/**
	 * Returns the template for the component.
	 */
	protected render (): TemplateResult {
		return html`
			<svg focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100">
				${this.bufferPerc > 0 ? svg`<circle id="buffer" cx="50%" cy="50%" r="45" fill="transparent" style="stroke-dashoffset: ${DASH_ARRAY - (DASH_ARRAY * this.bufferPerc)}px"></circle>` : ""}
				<circle id="progress" cx="50%" cy="50%" r="45" fill="transparent" style="${this.mode === ProgressMode.DETERMINATE ? `stroke-dashoffset: ${DASH_ARRAY - (DASH_ARRAY * this.progressPerc)}px;` : ""}"></circle>
			</svg>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"progress-spinner-element": ProgressSpinnerElement;
	}
}
