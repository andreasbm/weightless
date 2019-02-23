import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";
import "./../../../lib/divider/divider-element";

@customElement("divider-page")
export default class DividerPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<h3>divider-element</h3>
			<divider-element></divider-element>
		`;
	}
}