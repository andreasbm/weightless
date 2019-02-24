import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/label/label-element";
import "../../../../lib/title/title-element";
import "../../../code-example/code-example-element";
import "../../../demo/demo-element";
import { sharedStyles } from "../../../style/shared";

@customElement("title-page")
export default class ButtonPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default style="text-align: left;">
				<code-example-element>
					<title-element level="1">This is a H1 element</title-element>
					<title-element level="2">This is a H2 element</title-element>
					<title-element level="3">This is a H3 element</title-element>
					<title-element level="4">This is a H4 element</title-element>
					<title-element level="5">This is a H5 element</title-element>
					<title-element level="6">This is a H6 element</title-element>
				</code-example-element>
			</demo-element>
		`;
	}
}