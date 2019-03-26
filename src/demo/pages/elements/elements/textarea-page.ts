import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/card/card";
import "../../../../lib/title/title";
import "../../../../lib/textarea/textarea";
import { cssResult } from "../../../../lib/util/css";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import { sharedStyles } from "../../../style/shared";

@customElement("textarea-page")
export default class TextareaPage extends LitElement {

	static styles = [sharedStyles, cssResult(`
		wl-textarea:not(:last-child) {
			margin: 0 0 12px;
		}
	`)];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-textarea></wl-textarea>
					<wl-textarea label="Hello World"></wl-textarea>
				</code-example-element>
			</demo-element>

			<wl-title level="3">Outlined</wl-title>
			<demo-element>
				<code-example-element>
					<wl-textarea outlined></wl-textarea>
					<wl-textarea outlined label="Hello World"></wl-textarea>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Filled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-textarea filled></wl-textarea>
					<wl-textarea filled label="Hello World"></wl-textarea>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Disabled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-textarea disabled value="I'm disabled"></wl-textarea>
					<wl-textarea disabled outlined value="I'm disabled"></wl-textarea>
					<wl-textarea disabled filled value="I'm disabled"></wl-textarea>
					<wl-textarea disabled label="Label" value="I'm disabled"></wl-textarea>
					<wl-textarea disabled outlined label="Label"></wl-textarea>
					<wl-textarea disabled filled label="Label"></wl-textarea>
				</code-example-element>
			</demo-element>
		`;
	}
}