import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";
import "./../../../lib/banner/banner-element";
import "./../../../lib/icon/icon-element";
import "./../../../lib/button/button-element";

@customElement("banner-page")
export default class BannerPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<h3>banner-element</h3>
			<banner-element>
				<icon-element slot="icon">warning</icon-element>
				<span slot="text">No internet connection.</span>
				<button-element slot="action" flat inverted>Try again</button-element>
			</banner-element>
			<banner-element>
				<icon-element slot="icon">account_box</icon-element>
				<span slot="text">Your password was updated on your other device. Please sign in again.</span>
				<button-element slot="action" flat inverted>Continue as guest</button-element>
				<button-element slot="action" flat inverted>Sign in</button-element>
			</banner-element>
		`;
	}
}