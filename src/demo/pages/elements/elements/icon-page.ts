import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/icon/icon-element";
import "../../../../lib/title/title-element";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import { sharedStyles } from "../../../style/shared";

@customElement("icon-page")
export default class IconPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<icon-element>warning</icon-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Different sizes</title-element>
			<demo-element>
				<code-example-element>
					<icon-element style="--size-multiplier: 1.5px">account_box</icon-element>
					<icon-element style="--size-multiplier: 2px">delete</icon-element>
					<icon-element style="--size-multiplier: 2.5px">done</icon-element>
					<icon-element style="--size-multiplier: 3px">print</icon-element>
				</code-example-element>
			</demo-element>
		`;
	}
}