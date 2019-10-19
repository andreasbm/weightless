import { property } from "lit-element";
import { cssResult } from "../../util/css";
import { IInputBehaviorProperties, InputBehavior } from "../input/input-behavior";
import styles from "./textfield-behavior.scss";

/**
 * Properties of the textfield.behavior
 */
export interface ITextfieldBehaviorProperties extends IInputBehaviorProperties {
	pattern?: string;
	minLength?: number;
	maxLength?: number;
	list?: string;
}

/**
 * Text field behavior.
 */
export abstract class TextfieldBehavior extends InputBehavior implements ITextfieldBehaviorProperties {
	static styles = [...InputBehavior.styles, cssResult(styles)];

	/**
	 * Value pattern.
	 * @attr
	 */
	@property({type: String}) pattern?: string;

	/**
	 * Min value length.
	 * @attr
	 */
	@property({type: Number}) minLength?: number;

	/**
	 * Max value length.
	 * @attr
	 */
	@property({type: Number}) maxLength?: number;

}