import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/checkbox/checkbox";
import "../../../../lib/label/label";
import "../../../../lib/title/title";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import { sharedStyles } from "../../../style/shared";

@customElement("label-page")
export default class LabelPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-checkbox id="cb"></wl-checkbox>
					<wl-label for="cb">This is a label</wl-label>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Slotted form elements</wl-title>
			<demo-element>
				<code-example-element>
					<wl-label>
						<wl-checkbox></wl-checkbox>
						This is a label
					</wl-label>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Nowrap</wl-title>
			<demo-element>
				<code-example-element>
					<wl-checkbox id="cb2"></wl-checkbox>
					<wl-label for="cb2" nowrap style="width: 180px; text-align: left">
						This is a label with nowrap
					</wl-label>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Required</wl-title>
			<demo-element>
				<code-example-element>
					<wl-label required>This label is required</wl-label>
				</code-example-element>
			</demo-element>
		`;
	}
}