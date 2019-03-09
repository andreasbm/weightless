import { customElement, html, svg } from "lit-element";
import { TemplateResult } from "lit-html";
import { IProgressBehaviorProperties, ProgressBehavior, ProgressMode } from "../behavior/progress/progress-behavior";
import { cssResult } from "../util/css";

import styles from "./progress-spinner-element.scss";

/**
 * Properties of the progress spinner.
 */
export interface IProgressSpinnerElementProperties extends IProgressBehaviorProperties {
}

/**
 * Base dash array length of the SVG circle.
 */
const DASH_ARRAY = 285;

/**
 * Fills a circle from 0% to 100%.
 * @cssprop --progress-spinner-size - Width and height.
 * @cssprop --progress-spinner-color - Color.
 * @cssprop --progress-spinner-buffer-color - Color of the buffer.
 * @cssprop --progress-spinner-stroke-width - Width of the spinner stroke.
 * @cssprop --progress-spinner-indeterminate-container-duration - Spinner container animation duration when indeterminate.
 * @cssprop --progress-spinner-indeterminate-progress-duration - Spinner animation duration when indeterminate.
 * @cssprop --progress-spinner-indeterminate-timing-function - Spinner animation timing function when indeterminate.
 * @cssprop --progress-spinner-determinate-progress-transition - Transition when determinate.
 */
@customElement("progress-spinner-element")
export class ProgressSpinnerElement extends ProgressBehavior implements IProgressSpinnerElementProperties {
	static styles = [...ProgressBehavior.styles, cssResult(styles)];

	/**
	 * Returns the template for the element.
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
