import { customElement, html, LitElement } from "lit-element";
import "../../../code-example/code-example-element";
import "../../../demo/demo-element";
import "../../../../lib/banner/banner-element";
import "../../../../lib/button/button-element";
import "../../../../lib/icon/icon-element";
import "../../../../lib/title/title-element";
import { sharedStyles } from "../../../style/shared";

@customElement("banner-page")
export default class BannerPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<banner-element>
						<icon-element slot="icon">account_box</icon-element>
						<span slot="text">Your password was updated on your other device. Please sign in again.</span>
						<button-element slot="action" flat inverted>Continue as guest</button-element>
						<button-element slot="action" flat inverted>Sign in</button-element>
					</banner-element>
				</code-example-element>
			</demo-element>
			
		`;
	}
}