import { customElement, html, property } from "lit-element";
import { WlCard } from "../../../lib/card/wl-card";
import { cssResult } from "../../../lib/util/css";

import styles from "./demo-element.scss";

@customElement("demo-element")
export class DemoElement extends WlCard {
	static styles = [...WlCard.styles, cssResult(styles)];

	@property({type: Boolean, reflect: true}) default = false;


	/**
	 * Returns the template for the component.
	 */
	protected render () {
		return html`
			<slot></slot>
		`;
	}
}
