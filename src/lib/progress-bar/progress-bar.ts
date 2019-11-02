import { customElement, html, TemplateResult } from "lit-element";
import { IProgressBehaviorProperties, ProgressBehavior, ProgressMode } from "../behavior/progress/progress-behavior";
import { cssResult } from "../util/css";

import styles from "./progress-bar.scss";

/**
 * Properties of the progress bar.
 */
export interface IProgressBarProperties extends IProgressBehaviorProperties {}

/**
 * Fills a bar from 0% to 100%.
 * @cssprop --progress-bar-height - Height
 * @cssprop --progress-bar-bg - Background
 * @cssprop --progress-bar-color - Color
 * @cssprop --progress-bar-buffer-color - Color of the buffer
 * @cssprop --progress-bar-determinate-transition - Transition when determinate
 * @cssprop --progress-bar-indeterminate-duration - Duration of the indeterminate animation
 * @cssprop --progress-bar-indeterminate-short-delay - Delay of the short bar of indeterminate animation
 * @cssprop --progress-bar-indeterminate-timing-function - Timing function of the indeterminate animation
 */
@customElement("wl-progress-bar")
export class ProgressBar extends ProgressBehavior implements IProgressBarProperties {
	static styles = [...ProgressBehavior.styles, cssResult(styles)];

	/**
	 * Returns the template for the element.
	 */
	protected render(): TemplateResult {
		return html`
			${this.bufferPerc > 0
				? html`
						<div id="buffer" style="transform: scaleX(${this.bufferPerc})"></div>
				  `
				: ""}
			<div id="progress" style="${this.mode === ProgressMode.DETERMINATE ? `transform: scaleX(${this.progressPerc})` : ""}">
				<div id="before"></div>
				<div id="after"></div>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-progress-bar": ProgressBar;
	}
}
