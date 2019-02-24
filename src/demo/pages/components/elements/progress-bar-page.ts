import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../../lib/util/css";
import "../../../code-example/code-example-element";
import "../../demo/demo-element";
import { sharedStyles } from "../../style/shared";
import "./../../../lib/progress-bar/progress-bar-element";
import "./../../../lib/title/title-element";

@customElement("progress-bar-page")
export default class ProgressBarPage extends LitElement {

	static styles = [sharedStyles, cssResult(`
		progress-bar-element:not(:last-child) {
			margin: 0 0 12px;
		}
	`)];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<progress-bar-element></progress-bar-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Determinate</title-element>
			<demo-element>
				<code-example-element>
					<progress-bar-element mode="determinate" value="0.4"></progress-bar-element>
					<progress-bar-element mode="determinate" value="0.4" buffer="0.7"></progress-bar-element>
					<progress-bar-element mode="determinate" value="0.8" buffer="1"></progress-bar-element>
				</code-example-element>
			</demo-element>
		`;
	}
}