import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/checkbox/wl-checkbox";
import "../../../../lib/radio/wl-radio";
import "../../../../lib/title/wl-title";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import { sharedStyles } from "../../../style/shared";

@customElement("radio-page")
export default class RadioPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-radio name="food" value="salad"></wl-radio>
					<wl-radio name="food" value="burger"></wl-radio>
					<wl-radio name="food" value="pizza"></wl-radio>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Disabled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-radio disabled></wl-radio>
					<wl-radio checked disabled></wl-radio>
				</code-example-element>
			</demo-element>
		`;
	}
}