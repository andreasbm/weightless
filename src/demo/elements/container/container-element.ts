import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";

import styles from "./container-element.scss";

@customElement("container-element")
export class ContainerElement extends LitElement {
	static styles = [sharedStyles, cssResult(styles)];

	/**
	 * Returns the template for the element.
	 */
	protected render () {
		return html`
			<div id="container">
				<slot></slot>
			</div>
		`;
	}
}
