import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";

@customElement("radio-page")
export default class RadioPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<h3>radio-element</h3>
			<radio-element name="food" value="salad"></radio-element>
			<radio-element name="food" value="burger"></radio-element>
			<radio-element name="food" value="pizza"></radio-element>

			<radio-element disabled></radio-element>
			<radio-element checked disabled></radio-element>
		`;
	}
}