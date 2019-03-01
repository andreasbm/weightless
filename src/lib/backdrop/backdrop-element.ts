import { html, LitElement, property } from "lit-element";
import { customElement } from "lit-element";
import { TemplateResult } from "lit-html";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";

import styles from "./backdrop-element.scss";

/**
 * Backdrop properties.
 */
export interface IBackdropElementProperties {
}

/**
 * Dark layer to use behind overlayed elements.
 */
@customElement("backdrop-element")
export class BackdropElement extends LitElement implements IBackdropElementProperties {
	static styles = [cssResult(styles)];

	/**
	 * Role of the backdrop.
	 */
	@property({type: String, reflect: true}) role: AriaRole = "presentation";

	/**
	 * Returns the template of the element.
	 */
	protected render (): TemplateResult {
		return html``;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"backdrop-element": BackdropElement;
	}
}
