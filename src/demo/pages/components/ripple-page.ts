import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";

@customElement("ripple-page")
export default class RipplePage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<style>
				ripple-element {
					width: 200px;
					height: 200px;
					background: white;
					display: inline-block;
					border: 1px solid black;
				}
			</style>
			<h3>ripple-element</h3>
			<ripple-element></ripple-element>
			<ripple-element centered></ripple-element>
			<ripple-element unbounded></ripple-element>
		`;
	}
}