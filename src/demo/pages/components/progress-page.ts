import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";

@customElement("progress-page")
export default class ProgressPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<h3>progress-bar-element</h3>
			<progress-bar-element></progress-bar-element>
			<progress-bar-element mode="determinate" value="0.4"></progress-bar-element>
			<progress-bar-element mode="determinate" value="0.4" buffer="0.7"></progress-bar-element>

			<h3>progress-spinner-element</h3>
			<progress-spinner-element></progress-spinner-element>
			<progress-spinner-element mode="determinate" value="0.4"></progress-spinner-element>
			<progress-spinner-element mode="determinate" value="0.4" buffer="0.7"></progress-spinner-element>
		`;
	}
}