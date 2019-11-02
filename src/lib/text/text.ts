import { customElement, html, LitElement, property, TemplateResult } from "lit-element";
import { sharedStyles } from "../style/shared";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";

import styles from "./text.scss";

export type TextSize = "large" | "medium";

/**
 * Properties of the text.
 */
export interface ITextProperties {
	size: TextSize;
	role: AriaRole;
}

/**
 * Group text into paragraphs.
 * @slot - Default content.
 * @cssprop --text-margin - Margin
 * @cssprop --text-line-height - Line height
 * @cssprop --text-opacity - Opacity
 * @cssprop --text-font-size-m - Font size medium
 * @cssprop --text-font-size-l - Font size large
 * @cssprop --text-font-family - Font family
 */
@customElement("wl-text")
export class Text extends LitElement implements ITextProperties {
	static styles = [sharedStyles, cssResult(styles)];

	/**
	 * Size of the text.
	 * @attr
	 */
	@property({ type: String, reflect: true }) size: TextSize = "medium";

	/**
	 * Role of the text.
	 * @attr
	 */
	@property({ type: String, reflect: true }) role: AriaRole = "paragraph";

	/**
	 * Returns the template for the element.
	 */
	protected render(): TemplateResult {
		return html`
			<slot></slot>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-text": Text;
	}
}
