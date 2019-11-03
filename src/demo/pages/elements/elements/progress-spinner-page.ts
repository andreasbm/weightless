import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/progress-spinner/progress-spinner";
import "../../../../lib/title/title";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import { sharedStyles } from "../../../style/shared";

@customElement("progress-spinner-page")
export default class ProgressSpinnerPage extends LitElement {
	static styles = [sharedStyles];

	protected render() {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-progress-spinner></wl-progress-spinner>
				</code-example-element>
			</demo-element>

			<wl-title level="3">Determinate</wl-title>
			<demo-element>
				<code-example-element>
					<wl-progress-spinner mode="determinate" value="0.4"></wl-progress-spinner>
					<wl-progress-spinner mode="determinate" value="0.4" buffer="0.7"></wl-progress-spinner>
					<wl-progress-spinner mode="determinate" value="0.8" buffer="1"></wl-progress-spinner>
				</code-example-element>
			</demo-element>
		`;
	}
}
