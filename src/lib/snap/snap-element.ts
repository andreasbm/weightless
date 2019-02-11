import { customElement } from "lit-element";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { SnapBehavior } from "./snap-behavior";

import styles from "./snap-element.scss";

@customElement("snap-element")
export class SnapElement<R> extends SnapBehavior<R> {
	static styles = [sharedStyles, cssResult(styles)];
	protected role = "menu";
}

declare global {
	interface HTMLElementTagNameMap {
		"snap-element": SnapElement<any>;
	}
}
