import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../../lib/util/css";
import { sharedStyles } from "../../../style/shared";
import "../../../../lib/title/title-element";
import "../../code-example/code-example-element";
import "../../demo/demo-element";

@customElement("select-page")
export default class SelectPage extends LitElement {

	static styles = [sharedStyles, cssResult(`
		select-element:not(:last-child) {
			margin: 0 0 12px;
		}
	`)];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<select-element placeholder="Select something">
						<option value="" disabled selected>Select something</option>
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
						<option value="4">Option 4</option>
					</select-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Outlined</title-element>
			<demo-element>
				<code-example-element>
					<select-element outlined placeholder="Select something">
						<option value="" disabled selected>Select something</option>
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
						<option value="4">Option 4</option>
					</select-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Filled</title-element>
			<demo-element>
				<code-example-element>
					<select-element filled placeholder="Select something">
						<option value="" disabled selected>Select something</option>
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
						<option value="4">Option 4</option>
					</select-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Disabled</title-element>
			<demo-element>
				<code-example-element>
					<select-element disabled value="3">
						<option value="" disabled selected>Select something</option>
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
						<option value="4">Option 4</option>
					</select-element>
					<select-element disabled outlined value="3">
						<option value="" disabled selected>Select something</option>
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
						<option value="4">Option 4</option>
					</select-element>
					<select-element disabled filled value="3">
						<option value="" disabled selected>Select something</option>
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
						<option value="4">Option 4</option>
					</select-element>
				</code-example-element>
			</demo-element>
		`;
	}
}