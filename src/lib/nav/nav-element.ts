import { customElement, html, LitElement, property } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";

import styles from "./nav-element.scss";

export interface INavElementProperties {
	shadow: boolean;
	fixed: boolean;
	role: AriaRole;
}

@customElement("nav-element")
export class NavElement extends LitElement implements INavElementProperties {

	static styles = [sharedStyles, cssResult(styles)];

	@property({type: Boolean, reflect: true}) shadow: boolean = false;
	@property({type: Boolean, reflect: true}) fixed: boolean = false;
	@property({type: String, reflect: true}) role: AriaRole = "navigation";

	/**
	 * Returns the template for the component.
	 */
	protected render (): TemplateResult {
		return html`
			<aside id="left-container">
				<slot name="left"></slot>
				<slot name="title"></slot>
			</aside>
			<aside id="right_container">
				<slot name="right"></slot>
			</aside>
		`;
	}
}