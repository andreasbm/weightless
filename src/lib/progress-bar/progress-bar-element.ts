import { html } from "@polymer/lit-element";
import { customElement } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { IProgressBehaviorProperties, ProgressBehavior, ProgressMode } from "../behavior/progress-behavior/progress-behavior";

import styles from "./progress-bar-element.scss";

export interface IProgressBarElementProperties extends IProgressBehaviorProperties {

}

@customElement("progress-bar-element")
export class ProgressBarElement extends ProgressBehavior implements IProgressBarElementProperties {

	static styles = [cssResult(styles), sharedStyles];

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
