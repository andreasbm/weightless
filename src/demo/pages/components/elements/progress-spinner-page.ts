import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/progress-spinner/progress-spinner-element";
import { sharedStyles } from "../../style/shared";
import "../../code-example/code-example-element";
import "../../demo/demo-element";
import "./../../../lib/title/title-element";

@customElement("progress-spinner-page")
export default class ProgressSpinnerPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<progress-spinner-element></progress-spinner-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Determinate</title-element>
			<demo-element>
				<code-example-element>
					<progress-spinner-element mode="determinate" value="0.4"></progress-spinner-element>
					<progress-spinner-element mode="determinate" value="0.4" buffer="0.7"></progress-spinner-element>
					<progress-spinner-element mode="determinate" value="0.8" buffer="1"></progress-spinner-element>
				</code-example-element>
			</demo-element>
		`;
	}
}