import { LitElement, property } from "lit-element";
import { sharedStyles } from "../../style/shared";
import { AriaRole } from "../../util/aria";
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
	role: AriaRole;
}

/**
 * Progress behavior.
 */
export abstract class ProgressBehavior extends LitElement implements IProgressBehaviorProperties {
	static styles = [sharedStyles];

	@property({type: String, reflect: true}) mode: ProgressMode = ProgressMode.INDETERMINATE;

	@property({type: Number}) value: number = 0;
	@property({type: Number}) max: number = 1;
	@property({type: Number}) min: number = 0;

	@property({type: Number}) buffer: number = 0;
	@property({type: Number}) bufferMax: number = 1;
	@property({type: Number}) bufferMin: number = 0;

	@property({type: String, reflect: true}) role: AriaRole = "progressbar";

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
