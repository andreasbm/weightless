import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/icon/wl-icon";
import "../../../../lib/title/wl-title";
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
					<wl-icon>warning</wl-icon>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Different sizes</wl-title>
			<demo-element>
				<code-example-element>
					<wl-icon style="font-size: 16px;">account_box</wl-icon>
					<wl-icon style="font-size: 20px;">delete</wl-icon>
					<wl-icon style="font-size: 30px;">done</wl-icon>
					<wl-icon style="font-size: 40px;">print</wl-icon>
				</code-example-element>
			</demo-element>
		`;
	}
}