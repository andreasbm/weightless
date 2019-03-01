import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/checkbox/checkbox-element";
import "../../../../lib/label/label-element";
import "../../../../lib/title/title-element";
import "../../../code-example/code-example-element";
import "../../../demo/demo-element";
import { sharedStyles } from "../../../style/shared";

@customElement("label-page")
export default class LabelPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<checkbox-element id="cb"></checkbox-element>
					<label-element for="cb">This is a label</label-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Slotted form elements</title-element>
			<demo-element>
				<code-example-element>
					<label-element>
						<checkbox-element></checkbox-element>
						This is a label
					</label-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Nowrap</title-element>
			<demo-element>
				<code-example-element>
					<checkbox-element id="cb2"></checkbox-element>
					<label-element for="cb2" nowrap style="width: 180px; text-align: left">
						This is a label with nowrap
					</label-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Required</title-element>
			<demo-element>
				<code-example-element>
					<label-element required>This label is required</label-element>
				</code-example-element>
			</demo-element>
		`;
	}
}