import { html } from "@polymer/lit-element";
import { customElement } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { IconBehavior } from "./icon-behavior";

import styles from "./icon-element.scss";

@customElement("icon-element")
export class IconElement extends IconBehavior {
	static styles = [cssResult(styles), sharedStyles];
	protected role = "img";

	/**
	 * Returns the template for the component.
	 */
	protected render (): TemplateResult {
		return html`
			<slot></slot>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"icon-element": IconElement;
	}
}
