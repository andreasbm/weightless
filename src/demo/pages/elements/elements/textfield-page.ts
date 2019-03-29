import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/title/title";
import "../../../../lib/textfield/textfield";
import { cssResult } from "../../../../lib/util/css";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import { sharedStyles } from "../../../style/shared";

@customElement("textfield-page")
export default class TextfieldPage extends LitElement {

	static styles = [sharedStyles, cssResult(`
		wl-textfield:not(:last-child) {
			margin: 0 0 12px;
		}
	`)];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-textfield></wl-textfield>
					<wl-textfield label="Label"></wl-textfield>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Outlined</wl-title>
			<demo-element>
				<code-example-element>
					<wl-textfield outlined></wl-textfield>
					<wl-textfield outlined label="Label"></wl-textfield>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Filled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-textfield filled></wl-textfield>
					<wl-textfield filled label="Label"></wl-textfield>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Before & after slots</wl-title>
			<demo-element>
				<code-example-element>
					<wl-textfield label="Label">
						<wl-icon slot="before">email</wl-icon>
						<wl-icon slot="after">alternate_email</wl-icon>
					</wl-textfield>
					<wl-textfield label="Label" outlined>
						<wl-icon slot="before">email</wl-icon>
						<wl-icon slot="after">alternate_email</wl-icon>
					</wl-textfield>
					<wl-textfield label="Label" filled>
						<wl-icon slot="before">email</wl-icon>
						<wl-icon slot="after">alternate_email</wl-icon>
					</wl-textfield>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Datalist</wl-title>
			<demo-element>
				<code-example-element>
					<wl-textfield outlined label="Datalist" list="datalist"></wl-textfield>
					<datalist id="datalist">
					  <option value="Option 1"></option>
					  <option value="Option 2"></option>
					  <option value="Option 3"></option>
					</datalist>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Disabled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-textfield disabled value="I'm disabled"></wl-textfield>
					<wl-textfield disabled outlined value="I'm disabled"></wl-textfield>
					<wl-textfield disabled filled value="I'm disabled"></wl-textfield>
					<wl-textfield disabled label="Label" value="I'm disabled"></wl-textfield>
					<wl-textfield disabled outlined label="Label"></wl-textfield>
					<wl-textfield disabled filled label="Label"></wl-textfield>
				</code-example-element>
			</demo-element>

			<wl-title level="3">Types</wl-title>
			<demo-element>
				<code-example-element>
					<wl-textfield label="Password" type="password"></wl-textfield>
					<wl-textfield label="Email" type="email"></wl-textfield>
					<wl-textfield label="Number" type="number"></wl-textfield>
					<wl-textfield label="Color" type="color"></wl-textfield>
					<wl-textfield label="Date" type="date"></wl-textfield>
					<wl-textfield label="Search" type="search"></wl-textfield>
					<wl-textfield label="Tel" type="tel"></wl-textfield>
					<wl-textfield label="File" type="file"></wl-textfield>
				</code-example-element>
			</demo-element>

		`;
	}
}