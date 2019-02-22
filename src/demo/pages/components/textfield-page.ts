import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";

@customElement("textfield-page")
export default class TextfieldPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<h3>textfield-element</h3>
			<textfield-element></textfield-element>
			<textfield-element placeholder="Hello World"></textfield-element>

			<textfield-element outlined></textfield-element>
			<textfield-element outlined placeholder="Hello World"></textfield-element>

			<textfield-element filled></textfield-element>
			<textfield-element filled placeholder="Hello World"></textfield-element>
			<textfield-element filled outlined placeholder="Hello World"></textfield-element>

			<textfield-element placeholder="Hello World">
				<icon-element slot="before">email</icon-element>
				<icon-element slot="after">alternate_email</icon-element>
			</textfield-element>

			<textfield-element placeholder="Hello World" outlined>
				<icon-element slot="before">email</icon-element>
				<icon-element slot="after">alternate_email</icon-element>
			</textfield-element>

			<textfield-element placeholder="Password" type="password"></textfield-element>
			<textfield-element placeholder="Email" type="email"></textfield-element>
			<textfield-element placeholder="Number" type="number"></textfield-element>
			<textfield-element placeholder="Color" type="color"></textfield-element>
			<textfield-element placeholder="Date" type="date"></textfield-element>
			<textfield-element placeholder="Search" type="search"></textfield-element>
			<textfield-element placeholder="Tel" type="tel"></textfield-element>
			<textfield-element placeholder="File" type="file"></textfield-element>

			<h4>Disabled</h4>
			<textfield-element disabled value="This is disabled"></textfield-element>
			<textfield-element disabled placeholder="Hello World" value="This is disabled"></textfield-element>

			<textfield-element disabled outlined></textfield-element>
			<textfield-element disabled outlined placeholder="Hello World"></textfield-element>

			<textfield-element disabled filled></textfield-element>
		`;
	}
}