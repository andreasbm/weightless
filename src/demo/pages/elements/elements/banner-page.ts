import { customElement, html, LitElement } from "lit-element";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import "../../../../lib/banner/banner";
import "../../../../lib/button/button";
import "../../../../lib/icon/icon";
import "../../../../lib/title/title";
import { sharedStyles } from "../../../style/shared";

@customElement("banner-page")
export default class BannerPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-banner>
						<wl-icon slot="icon">account_box</wl-icon>
						<span slot="text">Your password was updated on your other device. Please sign in again.</span>
						<wl-button slot="action" flat inverted>Continue as guest</wl-button>
						<wl-button slot="action" flat inverted>Sign in</wl-button>
					</wl-banner>
				</code-example-element>
			</demo-element>
			
		`;
	}
}