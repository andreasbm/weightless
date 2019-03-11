import { customElement, html, TemplateResult } from "lit-element";
import { IProgressBehaviorProperties, ProgressBehavior, ProgressMode } from "../behavior/progress/progress-behavior";
import { cssResult } from "../util/css";

import styles from "./wl-progress-bar.scss";

/**
 * Properties of the progress bar.
 */
export interface IProgressBarProperties extends IProgressBehaviorProperties {
}

/**
 * Fills a bar from 0% to 100%.
 * @cssprop --progress-bar-height - Height.
 * @cssprop --progress-bar-bg - Background.
 * @cssprop --progress-bar-color - Color.
 * @cssprop --progress-bar-buffer-color - Color of the buffer.
 * @cssprop --progress-bar-determinate-transition - Transition of when determinate.
 * @cssprop --progress-bar-indeterminate-duration - Duration of the transition when indeterminate.
 * @cssprop --progress-bar-indeterminate-short-delay - Duration of the short bar transition when indeterminate.
 * @cssprop --progress-bar-indeterminate-timing-function - Timing function when indeterminate.
 */
@customElement("wl-progress-bar")
export class WlProgressBar extends ProgressBehavior implements IProgressBarProperties {
	static styles = [...ProgressBehavior.styles, cssResult(styles)];

	/**
	 * Returns the template for the element.
	 */
	protected render (): TemplateResult {
		return html`
			${this.bufferPerc > 0 ? html`
				<div id="buffer" style="transform: scaleX(${this.bufferPerc})"></div>`
			: ""}
			<div id="progress" style="${this.mode === ProgressMode.DETERMINATE ? `transform: scaleX(${this.progressPerc})` : ""}"></div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-progress-bar": WlProgressBar;
	}
}
