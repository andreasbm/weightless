import { LitElement, property } from "lit-element";
import { renderAttributes } from "../util/html";
import { clamp } from "../util/number";

export enum ProgressMode {
	INDETERMINATE = "indeterminate",
	DETERMINATE = "determinate"
}

export interface IProgressBehavior {
	mode: ProgressMode;
	value: number;
	max: number;
	min: number;
	buffer: number;
	bufferMax: number;
	bufferMin: number;
}

/**
 * Progress behavior.
 */
export abstract class ProgressBehavior extends LitElement implements IProgressBehavior {

	@property({type: String, reflect: true}) mode: ProgressMode = ProgressMode.INDETERMINATE;

	@property({type: Number}) value = 0;
	@property({type: Number}) max = 1;
	@property({type: Number}) min = 0;

	@property({type: Number}) buffer = 0;
	@property({type: Number}) bufferMax = 1;
	@property({type: Number}) bufferMin = 0;

	get progressPerc (): number {
		return clamp(this.value / (this.max - this.min), 0, 1);
	}

	get bufferPerc (): number {
		return clamp(this.buffer / (this.bufferMax - this.bufferMin), 0, 1);
	}

	protected abstract role: string;

	/**
	 * Hooks up the component.
	 */
	connectedCallback () {
		super.connectedCallback();
		this.setAttribute("role", this.role);
	}

	/**
	 * Updates the aria attributes.
	 */
	protected updateAria () {
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
	protected updated (changedProperties: Map<keyof IProgressBehavior, unknown>) {
		super.updated(changedProperties);
		this.updateAria();
	}
}
