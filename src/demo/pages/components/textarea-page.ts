import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";

@customElement("textarea-page")
export default class TextareaPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<h3>textarea-element</h3>
			<textarea-element></textarea-element>
			<textarea-element placeholder="Hello World"></textarea-element>

			<textarea-element outlined></textarea-element>
			<textarea-element outlined placeholder="Hello World"></textarea-element>

			<textarea-element filled></textarea-element>
			<textarea-element filled placeholder="Hello World"></textarea-element>
		`;
	}
}