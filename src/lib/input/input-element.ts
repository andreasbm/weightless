import { customElement } from "lit-element";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { InputBehavior } from "./input-behavior";

import styles from "./input-element.scss";

@customElement("input-element")
export class InputElement extends InputBehavior {
	static styles = [sharedStyles, cssResult(styles)];
	protected role = "textbox";
}

declare global {
	interface HTMLElementTagNameMap {
		"textfield-element": InputElement;
	}
}
