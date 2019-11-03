import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/switch/switch";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import "../../../../lib/title/title";
import { sharedStyles } from "../../../style/shared";

@customElement("switch-page")
export default class SwitchPage extends LitElement {
	static styles = [sharedStyles];

	protected render() {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-switch></wl-switch>
					<wl-switch checked></wl-switch>
				</code-example-element>
			</demo-element>

			<wl-title level="3">Disabled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-switch disabled></wl-switch>
					<wl-switch checked disabled></wl-switch>
				</code-example-element>
			</demo-element>
		`;
	}
}
