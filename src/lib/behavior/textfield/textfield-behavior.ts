import { property } from "lit-element";
import { cssResult } from "../../util/css";
import { IInputBehaviorProperties, InputBehavior } from "../input/input-behavior";
import { InputType } from "./input-type";
import styles from "./textfield-behavior.scss";

/**
 * Properties of the textfield.behavior
 */
export interface ITextfieldBehaviorProperties extends IInputBehaviorProperties {
	pattern?: string;
	maxLength?: number;
	minLength?: number;
	type: InputType;
	list?: string;
}

/**
 * Slider behavior.
 */
export abstract class TextfieldBehavior extends InputBehavior implements ITextfieldBehaviorProperties {
	static styles = [...InputBehavior.styles, cssResult(styles)];

	/**
	 * Type of the input.
	 * @attr
	 */
	@property({type: String, reflect: true}) type: InputType = "text";

	/**
	 * Value pattern.
	 * @attr
	 */
	@property({type: String, reflect: true}) pattern?: string;

	/**
	 * Min value length.
	 * @attr
	 */
	@property({type: Number, reflect: true}) minLength?: number;

	/**
	 * Max value length.
	 * @attr
	 */
	@property({type: Number, reflect: true}) maxLength?: number;
}