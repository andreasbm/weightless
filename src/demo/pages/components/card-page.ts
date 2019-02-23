import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";
import "./../../../lib/card/card-element";

@customElement("card-page")
export default class CardPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<h3>card-element</h3>
			<card-element hoverable>
				<p>Hello World</p>
			</card-element>
		`;
	}
}