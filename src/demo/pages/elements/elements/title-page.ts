import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/label/wl-label";
import "../../../../lib/title/wl-title";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import { sharedStyles } from "../../../style/shared";

@customElement("title-page")
export default class ButtonPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default style="text-align: left;">
				<code-example-element>
					<wl-title level="1">This is a H1 element</wl-title>
					<wl-title level="2">This is a H2 element</wl-title>
					<wl-title level="3">This is a H3 element</wl-title>
					<wl-title level="4">This is a H4 element</wl-title>
					<wl-title level="5">This is a H5 element</wl-title>
					<wl-title level="6">This is a H6 element</wl-title>
				</code-example-element>
			</demo-element>
		`;
	}
}