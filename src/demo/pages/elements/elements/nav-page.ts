import { customElement, html, LitElement, unsafeCSS } from "lit-element";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import "../../../../lib/button/button";
import "../../../../lib/nav/nav";
import "../../../../lib/icon/icon";
import "../../../../lib/title/title";
import { sharedStyles } from "../../../style/shared";

@customElement("nav-page")
export default class BannerPage extends LitElement {

	static styles = [sharedStyles, unsafeCSS`
		a:not(:last-child) {
			margin: 0 12px 0 0;
		}
	`];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-nav>
						<div slot="left">
							<wl-button slot="left" fab flat inverted>
								<wl-icon alt="menu">menu</wl-icon>
							</wl-button>
						</div>
						<h1 slot="title">Page title</h1>
						<div slot="right">
							<a href="#">Link 1</a>
							<a href="#">Link 2</a>
						</div>
					</wl-nav>
				</code-example-element>
			</demo-element>
			
		`;
	}
}