import { customElement, html } from "lit-element";
import { TemplateResult } from "lit-html";
import { IPopoverElementProperties, PopoverElement } from "../popover/popover-element";
import { cssResult } from "../util/css";

import styles from "./tooltip-element.scss";

/**
 * Properties of the tooltip.
 */
export interface ITooltipElementProperties extends IPopoverElementProperties {
}

/**
 * Informative context related text.
 * @cssprop --tooltip-padding - Padding.
 * @cssprop --tooltip-bg - Background.
 * @cssprop --tooltip-color - Color.
 */
@customElement("tooltip-element")
export class TooltipElement extends PopoverElement implements ITooltipElementProperties {
	static styles = [...PopoverElement.styles, cssResult(styles)];

	/**
	 * Renders the content.
	 */
	protected renderContent (): TemplateResult {
		return html`<popover-card-element><slot></slot></popover-card-element>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"tooltip-element": TooltipElement;
	}
}
