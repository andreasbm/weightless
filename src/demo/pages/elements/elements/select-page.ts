import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../../lib/util/css";
import { sharedStyles } from "../../../style/shared";
import "../../../../lib/title/wl-title";
import "../../../../lib/select/wl-select";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";

@customElement("select-page")
export default class SelectPage extends LitElement {

	static styles = [sharedStyles, cssResult(`
		wl-select:not(:last-child) {
			margin: 0 0 12px;
		}
	`)];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-select label="Select something">
						<option value="" disabled selected>Select something</option>
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
						<option value="4">Option 4</option>
					</wl-select>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Outlined</wl-title>
			<demo-element>
				<code-example-element>
					<wl-select outlined label="Select something">
						<option value="" disabled selected>Select something</option>
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
						<option value="4">Option 4</option>
					</wl-select>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Filled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-select filled label="Select something">
						<option value="" disabled selected>Select something</option>
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
						<option value="4">Option 4</option>
					</wl-select>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Disabled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-select disabled value="3">
						<option value="" disabled selected>Select something</option>
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
						<option value="4">Option 4</option>
					</wl-select>
					<wl-select disabled outlined value="3">
						<option value="" disabled selected>Select something</option>
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
						<option value="4">Option 4</option>
					</wl-select>
					<wl-select disabled filled value="3">
						<option value="" disabled selected>Select something</option>
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
						<option value="4">Option 4</option>
					</wl-select>
				</code-example-element>
			</demo-element>
		`;
	}
}