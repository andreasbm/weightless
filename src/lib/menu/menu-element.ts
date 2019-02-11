import { customElement } from "lit-element";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { MenuBehavior } from "./menu-behavior";

import styles from "./menu-element.scss";

@customElement("menu-element")
export class MenuElement<R> extends MenuBehavior<R> {
	static styles = [sharedStyles, cssResult(styles)];
	protected role = "menu";
}

declare global {
	interface HTMLElementTagNameMap {
		"menu-element": MenuElement<any>;
	}
}
