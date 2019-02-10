import { customElement } from "lit-element";
import inputStyles from "../input/input-element.scss";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { TextareaBehavior } from "./textarea-behavior";
import styles from "./textarea-element.scss";

@customElement("textarea-element")
export class TextareaElement extends TextareaBehavior {
	static styles = [cssResult(inputStyles), cssResult(styles), sharedStyles];
	protected role = "textbox";
}

declare global {
	interface HTMLElementTagNameMap {
		"textarea-element": TextareaElement;
	}
}
