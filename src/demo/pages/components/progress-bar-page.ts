import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";
import "./../../../lib/progress-spinner/progress-spinner-element";
import "./../../../lib/progress-bar/progress-bar-element";

@customElement("progress-bar-page")
export default class ProgressBarPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<h3>progress-bar-element</h3>
			<progress-bar-element></progress-bar-element>
			<progress-bar-element mode="determinate" value="0.4"></progress-bar-element>
			<progress-bar-element mode="determinate" value="0.4" buffer="0.7"></progress-bar-element>
		`;
	}
}