import { customElement, html, LitElement, property } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";
import { renderAttributes } from "../util/dom";

import styles from "./title-element.scss";

/**
 * Title levels.
 */
export type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Properties of the title.
 */
export interface ITitleElementProperties {
	level: number;
	role: AriaRole;
}

/**
 * Indicate the start of a new section.
 * @slot - Default content.
 * @cssprop --title-margin - Margin.
 * @cssprop --title-font-family - Font family.
 * @cssprop --title-font-weight - Font weight.
 * @cssprop --title-font-size-level-1 - Font size of level 1 heading.
 * @cssprop --title-font-size-level-2 - Font size of level 2 heading.
 * @cssprop --title-font-size-level-3 - Font size of level 3 heading.
 * @cssprop --title-font-size-level-4 - Font size of level 4 heading.
 * @cssprop --title-font-size-level-5 - Font size of level 5 heading.
 * @cssprop --title-font-size-level-6 - Font size of level 6 heading.
 */
@customElement("title-element")
export class TitleElement extends LitElement implements ITitleElementProperties {
	static styles = [sharedStyles, cssResult(styles)];

	/**
	 * Level of the title.
	 * @attr
	 */
	@property({type: Number, reflect: true}) level: TitleLevel = 1;

	/**
	 * Role of the title.
	 * @attr
	 */
	@property({type: String, reflect: true}) role: AriaRole = "heading";

	/**
	 * Reflect the updates when properties change.
	 * @param props
	 */
	protected updated (props: Map<keyof ITitleElementProperties, unknown>) {
		super.updated(props);

		// Update the aria attributes
		if (props.has("level")) {
			renderAttributes(this, {
				"aria-level": this.level
			});
		}
	}

	/**
	 * Returns the template for the element.
	 */
	protected render (): TemplateResult {
		return html`
			<slot></slot>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"title-element": TitleElement;
	}
}
