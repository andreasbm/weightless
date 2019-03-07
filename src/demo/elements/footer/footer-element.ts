import { customElement, html, LitElement, property, PropertyValues } from "lit-element";
import "../../../lib/button";
import { AriaRole } from "../../../lib/util/aria";
import { cssResult } from "../../../lib/util/css";
import { GITHUB_URL, TWITTER_URL } from "../../constants";
import { sharedStyles } from "../../style/shared";
import styles from "./footer-element.scss";

@customElement("footer-element")
export class FooterComponent extends LitElement {

	static styles = [sharedStyles, cssResult(styles)];

	@property({type: String, reflect: true}) role: AriaRole = "contentinfo";

	protected render () {
		return html`
			<aside>
				<span>Released under <a href="https://github.com/andreasbm/weightless/blob/master/LICENSE.md" target="_blank" rel="noopener">MIT LICENSE</a>. Copyright © 2019 Andreas Mehlsen</span>
			</aside>
			<aside>
				<a class="social" href="${GITHUB_URL}" target="_blank" rel="noopener">
					<img class="img" src="/assets/social/github.svg" alt="Github" />
				</a>
				<a class="social" href="${TWITTER_URL}" target="_blank" rel="noopener">
					<img class="img" src="/assets/social/twitter.svg" alt="Twitter" />
				</a>
			</aside>
		`;
	}
}