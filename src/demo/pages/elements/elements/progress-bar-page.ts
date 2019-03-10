import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/progress-bar/wl-progress-bar";
import "../../../../lib/title/wl-title";
import { cssResult } from "../../../../lib/util/css";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import { sharedStyles } from "../../../style/shared";

@customElement("progress-bar-page")
export default class ProgressBarPage extends LitElement {

	static styles = [sharedStyles, cssResult(`
		wl-progress-bar:not(:last-child) {
			margin: 0 0 12px;
		}
	`)];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-progress-bar></wl-progress-bar>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Determinate</wl-title>
			<demo-element>
				<code-example-element>
					<wl-progress-bar mode="determinate" value="0.4"></wl-progress-bar>
					<wl-progress-bar mode="determinate" value="0.4" buffer="0.7"></wl-progress-bar>
					<wl-progress-bar mode="determinate" value="0.8" buffer="1"></wl-progress-bar>
				</code-example-element>
			</demo-element>
		`;
	}
}