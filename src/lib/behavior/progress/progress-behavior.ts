import { LitElement, property } from "lit-element";
import { sharedStyles } from "../../style/shared";
import { AriaRole } from "../../util/aria";
import { cssResult } from "../../util/css";
import { renderAttributes } from "../../util/dom";
import { clamp } from "../../util/number";
import styles from "progress-behavior.scss";

/**
 * Mode of the progress.
 */
export enum ProgressMode {
	INDETERMINATE = "indeterminate",
	DETERMINATE = "determinate"
}

/**
 * Properties of progress behavior.
 */
export interface IProgressBehaviorProperties {
	mode: ProgressMode;
	value: number;
	max: number;
	min: number;
	buffer: number;
	bufferMax: number;
	bufferMin: number;
	role: AriaRole;
}

/**
 * Provides progress behavior.
 */
export abstract class ProgressBehavior extends LitElement implements IProgressBehaviorProperties {
	static styles = [sharedStyles, cssResult(styles)];

	/**
	 * Animation mode.
	 * @attr
	 */
	@property({ type: String, reflect: true }) mode: ProgressMode = ProgressMode.INDETERMINATE;

	/**
	 * Progress value.
	 * @attr
	 */
	@property({ type: Number }) value: number = 0;

	/**
	 * Max progress value.
	 * @attr
	 */
	@property({ type: Number }) max: number = 1;

	/**
	 * Min progress value.
	 * @attr
	 */
	@property({ type: Number }) min: number = 0;

	/**
	 * Buffer progress value.
	 * @attr
	 */
	@property({ type: Number }) buffer: number = 0;

	/**
	 * Max buffer progress value.
	 * @attr
	 */
	@property({ type: Number }) bufferMax: number = 1;

	/**
	 * Min buffer progress value.
	 * @attr
	 */
	@property({ type: Number }) bufferMin: number = 0;

	/**
	 * Role of the progress behavior.
	 * @attr
	 */
	@property({ type: String, reflect: true }) role: AriaRole = "progressbar";

	/**
	 * Progress in percentage.
	 */
	get progressPerc(): number {
		return clamp(this.value / (this.max - this.min), 0, 1);
	}

	/**
	 * Buffer progress in percentage.
	 */
	get bufferPerc(): number {
		return clamp(this.buffer / (this.bufferMax - this.bufferMin), 0, 1);
	}

	/**
	 * Hooks up the element.
	 */
	connectedCallback() {
		super.connectedCallback();
		this.setAttribute("role", this.role);
	}

	/**
	 * Updates the aria attributes.
	 */
	protected updateAria() {
		renderAttributes(this, {
			"aria-valuemin": this.min,
			"aria-valuemax": this.max,
			"aria-valuenow": this.value,
			"aria-valuetext": `${this.progressPerc * 100}%`,
			"aria-busy": "true",
			"aria-live": "polite"
		});
	}

	/**
	 * Handle that the properties has changed.
	 * @param changedProperties
	 */
	protected updated(changedProperties: Map<keyof IProgressBehaviorProperties, unknown>) {
		super.updated(changedProperties);
		this.updateAria();
	}
}
