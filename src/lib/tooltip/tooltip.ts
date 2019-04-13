import { customElement, html, TemplateResult } from "lit-element";
import { IPopoverProperties, Popover } from "../popover/popover";
import { cssResult } from "../util/css";

import styles from "./tooltip.scss";

/**
 * Properties of the tooltip.
 */
export interface ITooltipProperties extends IPopoverProperties {
}

/**
 * Informative context related text.
 * @cssprop --tooltip-padding - Padding
 * @cssprop --tooltip-bg - Background
 * @cssprop --tooltip-color - Color
 */
@customElement("wl-tooltip")
export class Tooltip extends Popover implements ITooltipProperties {
	static styles = [...Popover.styles, cssResult(styles)];

	/**
	 * Renders the content.
	 */
	protected renderContent (): TemplateResult {
		return html`<wl-popover-card><slot></slot></wl-popover-card>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-tooltip": Tooltip;
	}
}
