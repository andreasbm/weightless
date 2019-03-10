import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/card/wl-card";
import "../../../../lib/title/wl-title";
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
					<wl-textarea placeholder="Hello World"></wl-textarea>
				</code-example-element>
			</demo-element>

			<wl-title level="3">Outlined</wl-title>
			<demo-element>
				<code-example-element>
					<wl-textarea outlined></wl-textarea>
					<wl-textarea outlined placeholder="Hello World"></wl-textarea>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Filled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-textarea filled></wl-textarea>
					<wl-textarea filled placeholder="Hello World"></wl-textarea>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Disabled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-textarea disabled value="I'm disabled"></wl-textarea>
					<wl-textarea disabled outlined value="I'm disabled"></wl-textarea>
					<wl-textarea disabled filled value="I'm disabled"></wl-textarea>
					<wl-textarea disabled placeholder="Placeholder" value="I'm disabled"></wl-textarea>
					<wl-textarea disabled outlined placeholder="Placeholder"></wl-textarea>
					<wl-textarea disabled filled placeholder="Placeholder"></wl-textarea>
				</code-example-element>
			</demo-element>
		`;
	}
}