import { html, LitElement, property } from "lit-element";
import { customElement } from "lit-element";
import { TemplateResult } from "lit-html";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";

import styles from "./wl-backdrop.scss";

/**
 * Backdrop properties.
 */
export interface IBackdropProperties {
}

/**
 * Dark layer to use behind overlayed elements.
 * @cssprop --backdrop-bg - Background.
 */
@customElement("wl-backdrop")
export class WlBackdrop extends LitElement implements IBackdropProperties {
	static styles = [cssResult(styles)];

	/**
	 * Role of the backdrop.
	 * @attr
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
		"wl-backdrop": WlBackdrop;
	}
}
