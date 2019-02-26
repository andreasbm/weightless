import { customElement, html, LitElement } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import "../card/card-element";

import styles from "./popover-card-element.scss";

export interface IPopoverCardElementProperties {

}

@customElement("popover-card-element")
export class PopoverCardElement extends LitElement implements IPopoverCardElementProperties {
	static styles = [sharedStyles, cssResult(styles)];

	protected render (): TemplateResult {
		return html`
			<svg id="arrow" viewBox="0 0 100 100" preserveAspectRatio="none" >
				<polygon points="50 0, 100 100, 0 100"/>
			</svg>
			<card-element id="content">
				<slot></slot>
			</card-element>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"popover-card-element": PopoverCardElement;
	}
}
