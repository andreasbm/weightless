import { customElement, html, LitElement, TemplateResult } from "lit-element";
import "../card/card";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";

import styles from "./popover-card.scss";

/**
 * Properties of the popover card.
 */
export interface IPopoverCardProperties {}

/**
 * Give popovers a contextual flair.
 * @slot - Default content.
 * @cssprop --popover-card-elevation - Box shadow
 * @cssprop --popover-card-arrow-width - Width of the arrow
 * @cssprop --popover-card-arrow-height - Height of the arrow
 * @cssprop --popover-card-arrow-fill - Fill of the arrow
 */
@customElement("wl-popover-card")
export class PopoverCard extends LitElement implements IPopoverCardProperties {
	static styles = [sharedStyles, cssResult(styles)];

	/**
	 * Returns the template for the element.
	 */
	protected render(): TemplateResult {
		return html`
			<svg id="arrow" viewBox="0 0 100 100" preserveAspectRatio="none">
				<polygon points="50 0, 100 100, 0 100" />
			</svg>
			<wl-card id="content">
				<slot></slot>
			</wl-card>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-popover-card": PopoverCard;
	}
}
