import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";
import "./../../../lib/checkbox/checkbox-element";

@customElement("checkbox-page")
export default class CheckboxPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<h3>checkbox-element</h3>
			<checkbox-element></checkbox-element>
			<checkbox-element checked></checkbox-element>
			<checkbox-element disabled></checkbox-element>
			<checkbox-element checked disabled></checkbox-element>
		`;
	}
}