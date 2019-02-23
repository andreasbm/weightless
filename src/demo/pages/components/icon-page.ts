import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";
import "./../../../lib/icon/icon-element";

@customElement("icon-page")
export default class IconPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<h3>icon-element</h3>
			<icon-element>warning</icon-element>
			<icon-element style="--size-multiplier: 2px">account_box</icon-element>
		`;
	}
}