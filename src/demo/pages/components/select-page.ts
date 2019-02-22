import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";

@customElement("banner-page")
export default class BannerPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<h3>select-element</h3>
			<select-element id="select" placeholder="Select something">
				<option value="" disabled selected>Select something</option>
				<option>Option 1</option>
				<option>Option 2</option>
				<option>Option 3</option>
				<option>Option 4</option>
			</select-element>
		`;
	}
}