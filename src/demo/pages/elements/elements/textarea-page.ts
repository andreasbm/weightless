import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/card/card-element";
import "../../../../lib/title/title-element";
import { cssResult } from "../../../../lib/util/css";
import "../../../code-example/code-example-element";
import "../../../demo/demo-element";
import { sharedStyles } from "../../../style/shared";

@customElement("textarea-page")
export default class TextareaPage extends LitElement {

	static styles = [sharedStyles, cssResult(`
		textarea-element:not(:last-child) {
			margin: 0 0 12px;
		}
	`)];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<textarea-element></textarea-element>
					<textarea-element placeholder="Hello World"></textarea-element>
				</code-example-element>
			</demo-element>

			<title-element level="3">Outlined</title-element>
			<demo-element>
				<code-example-element>
					<textarea-element outlined></textarea-element>
					<textarea-element outlined placeholder="Hello World"></textarea-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Filled</title-element>
			<demo-element>
				<code-example-element>
					<textarea-element filled></textarea-element>
					<textarea-element filled placeholder="Hello World"></textarea-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Disabled</title-element>
			<demo-element>
				<code-example-element>
					<textarea-element disabled value="I'm disabled"></textarea-element>
					<textarea-element disabled outlined value="I'm disabled"></textarea-element>
					<textarea-element disabled filled value="I'm disabled"></textarea-element>
					<textarea-element disabled placeholder="Placeholder" value="I'm disabled"></textarea-element>
					<textarea-element disabled outlined placeholder="Placeholder"></textarea-element>
					<textarea-element disabled filled placeholder="Placeholder"></textarea-element>
				</code-example-element>
			</demo-element>
		`;
	}
}