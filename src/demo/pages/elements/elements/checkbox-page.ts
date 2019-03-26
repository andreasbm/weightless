import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/checkbox/checkbox";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import "../../../../lib/title/title";
import { sharedStyles } from "../../../style/shared";

@customElement("checkbox-page")
export default class CheckboxPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-checkbox></wl-checkbox>
					<wl-checkbox checked></wl-checkbox>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Disabled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-checkbox disabled></wl-checkbox>
					<wl-checkbox checked disabled></wl-checkbox>
				</code-example-element>
			</demo-element>
		`;
	}
}