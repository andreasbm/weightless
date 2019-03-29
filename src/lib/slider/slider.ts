import { customElement, html, property, query, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { IInputBehaviorProperties, InputBehavior } from "../behavior/input/input-behavior";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";
import styles from "./slider.scss";

/**
 * Properties of the slider.
 */
export interface ISliderProperties extends IInputBehaviorProperties {
}

/**
 * Make selections from a range of values.
 */
@customElement("wl-slider")
export class Slider extends InputBehavior implements ISliderProperties {
	static styles = [...InputBehavior.styles, cssResult(styles)];

	/**
	 * Role of the slider.
	 * @attr
	 */
	@property({type: String, reflect: true}) role: AriaRole = "slider";

	/**
	 * Label above the thumb that shows the value.
	 * @attr
	 */
	@property({type: Boolean}) thumbLabel: boolean = false;

	/**
	 * The minimum value allowed.
	 * @attr
	 */
	@property({type: Number}) min: number = 0;

	/**
	 * The maximum value allowed.
	 * @attr
	 */
	@property({type: Number}) max: number = 100;

	/**
	 * The legal number intervals
	 * @attr
	 */
	@property({type: Number}) step?: number;

	/**
	 * The minimum buffer value allowed.
	 * @attr
	 */
	@property({type: Number}) bufferMin: number = 0;

	/**
	 * The maximum buffer value allowed.
	 * @attr
	 */
	@property({type: Number}) bufferMax: number = 100;

	/**
	 * The buffer value.
	 * @attr
	 */
	@property({type: Number}) bufferValue?: number;

	/**
	 * Slider element.
	 */
	@query("#slider") $slider!: HTMLInputElement;

	/**
	 * Value in percentage.
	 */
	get perc () {
		return (this.$slider.valueAsNumber - this.min) / (this.max - this.min);
	}

	/**
	 * Buffer value in percentage.
	 */
	get bufferPerc () {
		return ((this.bufferValue || 0) - this.bufferMin) / (this.bufferMax - this.bufferMin);
	}

	/**
	 * When the properties changes we need to upgrade the background.
	 * @param props
	 */
	protected updated (props: Map<keyof ISliderProperties, unknown>) {
		super.updated(props as Map<keyof IInputBehaviorProperties, unknown>);
		this.updateBackground();
	}

	/**
	 * Sets the value of the form element and updates the background.
	 * @param value
	 */
	protected setValue (value: string) {
		super.setValue(value);

		// Update the slider that the user interacts with
		if (this.$slider != null) {
			this.$slider.value = value;
			this.updateBackground();
		}
	}

	/**
	 * Updates the background properties.
	 */
	protected updateBackground () {
		requestAnimationFrame(() => {
			this.style.setProperty("--_perc", this.perc.toString());
			this.style.setProperty("--_buffer-perc", this.bufferPerc.toString());
		});
	}

	/**
	 * Update the value of the form element when the slider value changes.
	 */
	protected sliderValueChanged () {
		this.value = this.$slider.value;
		this.requestUpdate().then();
	}

	/**
	 * Renders the form element
	 */
	protected renderFormElement (id?: string, style?: string, onInput?: ((e: Event) => void)): TemplateResult {
		return html`
			<input
				type="range"
				style="${ifDefined(style)}"
				id="${ifDefined(id)}"
				.value="${ifDefined(this.value)}"
				?required="${this.required}"
				?disabled="${this.disabled}"
				?readonly="${this.readonly}"
				aria-label="${ifDefined(this.label)}"
				name="${ifDefined(this.name)}"
				autocomplete="${ifDefined(this.autocomplete)}"
				min="${ifDefined(this.min)}"
				max="${ifDefined(this.max)}"
				step="${ifDefined(this.step)}"
				@input="${ifDefined(onInput)}"
				tabindex="${this.disabled ? "-1" : "0"}"
			/>
		`;
	}

	/**
	 * Returns the template for the element.
	 */
	protected render (): TemplateResult {
		return html`
			<div id="container">
				<slot id="before" name="before"></slot>
				<div id="wrapper">
					<div id="label">${this.label}</div>
					<div id="slot-wrapper">
						${this.thumbLabel ? html`<div id="thumb-label">${this.value}</div>` : undefined}
						${this.renderFormElement("slider", undefined, this.sliderValueChanged)}
						<slot id="slot"></slot>
					</div>
					${this.renderFormElement(this.formElementId, `display: none`)}
				</div>
				<slot id="after" name="after"></slot>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-slider": Slider;
	}
}
