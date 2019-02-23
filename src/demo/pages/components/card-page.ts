import { customElement, html, LitElement } from "lit-element";
import { sharedStyles } from "../../style/shared";
import "../../code-example/code-example-element";
import "../../demo/demo-element";
import "./../../../lib/card/card-element";
import "./../../../lib/title/title-element";

@customElement("card-page")
export default class CardPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<card-element>Card</card-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Hoverable</title-element>
			<demo-element>
				<code-example-element>
					<card-element hoverable>Card</card-element>
				</code-example-element>
			</demo-element>
		`;
	}
}