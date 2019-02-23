import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";
import "./../../../lib/progress-spinner/progress-spinner-element";
import "./../../../lib/progress-bar/progress-bar-element";

@customElement("progress-spinner-page")
export default class ProgressSpinnerPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<h3>progress-spinner-element</h3>
			<progress-spinner-element></progress-spinner-element>
			<progress-spinner-element mode="determinate" value="0.4"></progress-spinner-element>
			<progress-spinner-element mode="determinate" value="0.4" buffer="0.7"></progress-spinner-element>
		`;
	}
}