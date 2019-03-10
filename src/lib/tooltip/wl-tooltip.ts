import { customElement, html } from "lit-element";
import { TemplateResult } from "lit-html";
import { IPopoverProperties, WlPopover } from "../popover/wl-popover";
import { cssResult } from "../util/css";

import styles from "./wl-tooltip.scss";

/**
 * Properties of the tooltip.
 */
export interface ITooltipProperties extends IPopoverProperties {
}

/**
 * Informative context related text.
 * @cssprop --tooltip-padding - Padding.
 * @cssprop --tooltip-bg - Background.
 * @cssprop --tooltip-color - Color.
 */
@customElement("wl-tooltip")
export class WlTooltip extends WlPopover implements ITooltipProperties {
	static styles = [...WlPopover.styles, cssResult(styles)];

	/**
	 * Renders the content.
	 */
	protected renderContent (): TemplateResult {
		return html`<wl-popover-card><slot></slot></wl-popover-card>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-tooltip": WlTooltip;
	}
}
