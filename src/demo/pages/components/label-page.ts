import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";

@customElement("label-page")
export default class LabelPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<h3>label-element</h3>
			<checkbox-element id="cb"></checkbox-element>
			<label-element for="cb">This is a label</label-element>

			<label-element nowrap style="width: 260px;">
				<checkbox-element></checkbox-element>
				This is another label with nowrap
			</label-element>

			<label-element required>This label is required</label-element>
		`;
	}
}