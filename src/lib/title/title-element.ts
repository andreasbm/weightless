import { customElement, html, LitElement, property } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";
import { renderAttributes } from "../util/dom";

import styles from "./title-element.scss";

/**
 * Properties of the title.
 */
export interface ITitleElementProperties {
	level: number;
	role: AriaRole;
}

/**
 * Indicate the start of a new section.
 */
@customElement("title-element")
export class TitleElement extends LitElement implements ITitleElementProperties {
	static styles = [sharedStyles, cssResult(styles)];

	@property({type: Number, reflect: true}) level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
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
	 * Returns the template for the component.
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
