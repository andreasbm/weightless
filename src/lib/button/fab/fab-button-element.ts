import { customElement } from "lit-element";
import { cssResult } from "../../util/css";
import { ButtonElement, IButtonElementProperties } from "../button-element";
import styles from "./fab-button-element.scss";

export interface IFabButtonElementProperties extends IButtonElementProperties {

}

@customElement("fab-button-element")
export class FabButtonElement extends ButtonElement implements IFabButtonElementProperties {
	static styles = [...ButtonElement.styles, cssResult(styles)];
}

declare global {
	interface HTMLElementTagNameMap {
		"fab-button-element": FabButtonElement;
	}
}