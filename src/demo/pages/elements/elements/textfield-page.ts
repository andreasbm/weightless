import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/title/wl-title";
import "../../../../lib/textfield/wl-textfield";
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
					<wl-textfield placeholder="Placeholder"></wl-textfield>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Outlined</wl-title>
			<demo-element>
				<code-example-element>
					<wl-textfield outlined></wl-textfield>
					<wl-textfield outlined placeholder="Placeholder"></wl-textfield>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Filled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-textfield filled></wl-textfield>
					<wl-textfield filled placeholder="Placeholder"></wl-textfield>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Before & after slots</wl-title>
			<demo-element>
				<code-example-element>
					<wl-textfield placeholder="Placeholder">
						<wl-icon slot="before">email</wl-icon>
						<wl-icon slot="after">alternate_email</wl-icon>
					</wl-textfield>
					<wl-textfield placeholder="Placeholder" outlined>
						<wl-icon slot="before">email</wl-icon>
						<wl-icon slot="after">alternate_email</wl-icon>
					</wl-textfield>
					<wl-textfield placeholder="Placeholder" filled>
						<wl-icon slot="before">email</wl-icon>
						<wl-icon slot="after">alternate_email</wl-icon>
					</wl-textfield>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Disabled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-textfield disabled value="I'm disabled"></wl-textfield>
					<wl-textfield disabled outlined value="I'm disabled"></wl-textfield>
					<wl-textfield disabled filled value="I'm disabled"></wl-textfield>
					<wl-textfield disabled placeholder="Placeholder" value="I'm disabled"></wl-textfield>
					<wl-textfield disabled outlined placeholder="Placeholder"></wl-textfield>
					<wl-textfield disabled filled placeholder="Placeholder"></wl-textfield>
				</code-example-element>
			</demo-element>

			<wl-title level="3">Types</wl-title>
			<demo-element>
				<code-example-element>
					<wl-textfield placeholder="Password" type="password"></wl-textfield>
					<wl-textfield placeholder="Email" type="email"></wl-textfield>
					<wl-textfield placeholder="Number" type="number"></wl-textfield>
					<wl-textfield placeholder="Color" type="color"></wl-textfield>
					<wl-textfield placeholder="Date" type="date"></wl-textfield>
					<wl-textfield placeholder="Search" type="search"></wl-textfield>
					<wl-textfield placeholder="Tel" type="tel"></wl-textfield>
					<wl-textfield placeholder="File" type="file"></wl-textfield>
					<wl-textfield placeholder="Range" type="range"></wl-textfield>
				</code-example-element>
			</demo-element>

		`;
	}
}