import { customElement, html } from "lit-element";
import { TemplateResult } from "lit-html";
import { IProgressBehaviorProperties, ProgressBehavior, ProgressMode } from "../behavior/progress-behavior/progress-behavior";
import { cssResult } from "../util/css";

import styles from "./progress-bar-element.scss";

/**
 * Properties of the progress bar.
 */
export interface IProgressBarElementProperties extends IProgressBehaviorProperties {
}

/**
 * Fills a bar from 0% to 100%.
 */
@customElement("progress-bar-element")
export class ProgressBarElement extends ProgressBehavior implements IProgressBarElementProperties {

	static styles = [...ProgressBehavior.styles, cssResult(styles)];

	/**
	 * Returns the template for the component.
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
		"progress-bar-element": ProgressBarElement;
	}
}
