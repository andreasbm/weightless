import { customElement, html, LitElement } from "lit-element";
import { sharedStyles } from "../../style/shared";

@customElement("button-page")
export default class ButtonPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<h3>button-element</h3>
			<button-element>Button</button-element>
			<button-element inverted>Button</button-element>
			<button-element outlined>Button</button-element>
			<button-element flat inverted>Button</button-element>
			<button-element flat inverted outlined>Button</button-element>

			<button-element disabled>Button</button-element>
			<button-element inverted disabled>Button</button-element>
			<button-element outlined disabled>Button</button-element>
			<button-element flat inverted disabled>Button</button-element>
			<button-element flat inverted outlined disabled>Button</button-element>
			
			<form>
				<textfield-element placeholder="Required" required minlength="10" autocomplete="off"></textfield-element>
				<button-element>Button</button-element>
			</form>
			
			<h3>fab-button-element</h3>
			<fab-button-element>
				<icon-element>warning</icon-element>
			</fab-button-element>
			<fab-button-element inverted>
				<icon-element>delete</icon-element>
			</fab-button-element>
			<fab-button-element outlined>
				<icon-element>done</icon-element>
			</fab-button-element>
			<fab-button-element flat inverted>
				<icon-element>info</icon-element>
			</fab-button-element>
			<fab-button-element flat inverted outlined>
				<icon-element>print</icon-element>
			</fab-button-element>
		`;
	}
}