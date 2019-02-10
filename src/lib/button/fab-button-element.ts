import { customElement } from "lit-element";
import { cssResult } from "../util/css";
import { ButtonElement } from "./button-element";
import styles from "./fab-button-element.scss";

@customElement("fab-button-element")
export class FabButtonElement extends ButtonElement {
	static styles = [...ButtonElement.styles, cssResult(styles)];
}

declare global {
	interface HTMLElementTagNameMap {
		"fab-button-element": FabButtonElement;
	}
}