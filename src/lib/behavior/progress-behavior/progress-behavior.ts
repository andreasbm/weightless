import { LitElement, property } from "lit-element";
import { renderAttributes } from "../../util/dom";
import { clamp } from "../../util/number";

export enum ProgressMode {
	INDETERMINATE = "indeterminate",
	DETERMINATE = "determinate"
}

export interface IProgressBehaviorProperties {
	mode: ProgressMode;
	value: number;
	max: number;
	min: number;
	buffer: number;
	bufferMax: number;
	bufferMin: number;
	role: string;
}

/**
 * Progress behavior.
 */
export abstract class ProgressBehavior extends LitElement implements IProgressBehaviorProperties {

	@property({type: String, reflect: true}) mode: ProgressMode = ProgressMode.INDETERMINATE;

	@property({type: Number}) value = 0;
	@property({type: Number}) max = 1;
	@property({type: Number}) min = 0;

	@property({type: Number}) buffer = 0;
	@property({type: Number}) bufferMax = 1;
	@property({type: Number}) bufferMin = 0;

	@property({type: String, reflect: true}) role = "progressbar";

	get progressPerc (): number {
		return clamp(this.value / (this.max - this.min), 0, 1);
	}

	get bufferPerc (): number {
		return clamp(this.buffer / (this.bufferMax - this.bufferMin), 0, 1);
	}

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
	protected updated (changedProperties: Map<keyof IProgressBehaviorProperties, unknown>) {
		super.updated(changedProperties);
		this.updateAria();
	}
}
