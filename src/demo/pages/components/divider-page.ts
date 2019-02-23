import { customElement, html, LitElement } from "lit-element";
import { sharedStyles } from "../../style/shared";
import "./../../../lib/divider/divider-element";
import "./../../../lib/title/title-element";
import "../../code-example/code-example-element";
import "../../demo/demo-element";

@customElement("divider-page")
export default class DividerPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<divider-element></divider-element>
				</code-example-element>
			</demo-element>
		`;
	}
}