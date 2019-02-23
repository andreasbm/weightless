import { customElement, html, LitElement } from "lit-element";
import { sharedStyles } from "../../style/shared";
import "./../../../lib/checkbox/checkbox-element";
import "../../demo/demo-element";
import "./../../../lib/card/card-element";
import "../../code-example/code-example-element";
import "./../../../lib/title/title-element";

@customElement("checkbox-page")
export default class CheckboxPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<checkbox-element></checkbox-element>
					<checkbox-element checked></checkbox-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Disabled</title-element>
			<demo-element>
				<code-example-element>
					<checkbox-element disabled></checkbox-element>
					<checkbox-element checked disabled></checkbox-element>
				</code-example-element>
			</demo-element>
		`;
	}
}