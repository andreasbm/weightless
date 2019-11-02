import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/card/card";
import "../../../../lib/title/title";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import { sharedStyles } from "../../../style/shared";

@customElement("card-page")
export default class CardPage extends LitElement {
	static styles = [sharedStyles];

	protected render() {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-card>Card</wl-card>
				</code-example-element>
			</demo-element>

			<wl-title level="3">Hoverable</wl-title>
			<demo-element>
				<code-example-element>
					<wl-card hoverable>Card</wl-card>
				</code-example-element>
			</demo-element>
		`;
	}
}
