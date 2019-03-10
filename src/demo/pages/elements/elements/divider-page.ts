import { customElement, html, LitElement } from "lit-element";
import { sharedStyles } from "../../../style/shared";
import "../../../../lib/divider/wl-divider";
import "../../../../lib/title/wl-title";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";

@customElement("divider-page")
export default class DividerPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-divider></wl-divider>
				</code-example-element>
			</demo-element>
		`;
	}
}