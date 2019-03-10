import { customElement, html, LitElement } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import "../card/wl-card";

import styles from "./wl-popover-card.scss";

/**
 * Properties of the popover card.
 */
export interface IPopoverCardProperties {
}

/**
 * Give popovers a contextual flair.
 * @slot - Default content.
 * @cssprop --popover-card-arrow-width - Width of the arrow.
 * @cssprop --popover-card-arrow-height - Height of the arrow.
 * @cssprop --popover-card-arrow-fill - Color of the arrow.
 * @cssprop --popover-card-elevation - Box shadow of the card.
 */
@customElement("wl-popover-card")
export class WlPopoverCard extends LitElement implements IPopoverCardProperties {
	static styles = [sharedStyles, cssResult(styles)];

	/**
	 * Returns the template for the element.
	 */
	protected render (): TemplateResult {
		return html`
			<svg id="arrow" viewBox="0 0 100 100" preserveAspectRatio="none" >
				<polygon points="50 0, 100 100, 0 100"/>
			</svg>
			<wl-card id="content">
				<slot></slot>
			</wl-card>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-popover-card": WlPopoverCard;
	}
}
