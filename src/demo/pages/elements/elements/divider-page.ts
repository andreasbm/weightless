import { customElement, html, LitElement, unsafeCSS } from "lit-element";
import { sharedStyles } from "../../../style/shared";
import "../../../../lib/divider/divider";
import "../../../../lib/title/title";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";

@customElement("divider-page")
export default class DividerPage extends LitElement {

	static styles = [sharedStyles, unsafeCSS`
		wl-divider[vertical] {
			height: 100px;
			margin: 0 auto;
		}
	`];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-divider></wl-divider>
				</code-example-element>
			</demo-element>
			
			<wl-title>Vertical</wl-title>
			<demo-element>
				<code-example-element>
					<wl-divider vertical></wl-divider>
				</code-example-element>
			</demo-element>
		`;
	}
}