import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";
import "../../demo/demo-element";
import "../../code-example/code-example-element";
import "./../../../lib/title/title-element";

@customElement("textfield-page")
export default class TextfieldPage extends LitElement {

	static styles = [sharedStyles, cssResult(`
		textfield-element:not(:last-child) {
			margin: 0 0 12px;
		}
	`)];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<textfield-element></textfield-element>
					<textfield-element placeholder="Placeholder"></textfield-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Outlined</title-element>
			<demo-element>
				<code-example-element>
					<textfield-element outlined></textfield-element>
					<textfield-element outlined placeholder="Placeholder"></textfield-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Filled</title-element>
			<demo-element>
				<code-example-element>
					<textfield-element filled></textfield-element>
					<textfield-element filled placeholder="Placeholder"></textfield-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Before & after slots</title-element>
			<demo-element>
				<code-example-element>
					<textfield-element placeholder="Placeholder">
						<icon-element slot="before">email</icon-element>
						<icon-element slot="after">alternate_email</icon-element>
					</textfield-element>
					<textfield-element placeholder="Placeholder" outlined>
						<icon-element slot="before">email</icon-element>
						<icon-element slot="after">alternate_email</icon-element>
					</textfield-element>
					<textfield-element placeholder="Placeholder" filled>
						<icon-element slot="before">email</icon-element>
						<icon-element slot="after">alternate_email</icon-element>
					</textfield-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Disabled</title-element>
			<demo-element>
				<code-example-element>
					<textfield-element disabled value="I'm disabled"></textfield-element>
					<textfield-element disabled outlined value="I'm disabled"></textfield-element>
					<textfield-element disabled filled value="I'm disabled"></textfield-element>
					<textfield-element disabled placeholder="Placeholder" value="I'm disabled"></textfield-element>
					<textfield-element disabled outlined placeholder="Placeholder"></textfield-element>
					<textfield-element disabled filled placeholder="Placeholder"></textfield-element>
				</code-example-element>
			</demo-element>

			<title-element level="3">Types</title-element>
			<demo-element>
				<code-example-element>
					<textfield-element placeholder="Password" type="password"></textfield-element>
					<textfield-element placeholder="Email" type="email"></textfield-element>
					<textfield-element placeholder="Number" type="number"></textfield-element>
					<textfield-element placeholder="Color" type="color"></textfield-element>
					<textfield-element placeholder="Date" type="date"></textfield-element>
					<textfield-element placeholder="Search" type="search"></textfield-element>
					<textfield-element placeholder="Tel" type="tel"></textfield-element>
					<textfield-element placeholder="File" type="file"></textfield-element>
				</code-example-element>
			</demo-element>

		`;
	}
}