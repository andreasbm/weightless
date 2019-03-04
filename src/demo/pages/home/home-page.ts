import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";
import "../../elements/container/container-element";
import "../../../lib/title/title-element";
import "../../../lib/button/button-element";
import "@appnest/web-router";

import styles from "./home-page.scss";

@customElement("home-page")
export default class HomePage extends LitElement {

	static styles = [sharedStyles, cssResult(styles)];

	protected render () {
		return html`
			<container-element id="main-container" centered>
				<title-element class="title">Weightless</title-element>
				<span class="text">High quality Web Components with a small footprint.</span>
				<div class="cta-area">
					<router-link path="get-started"><button-element>Get Started</button-element></router-link>
				</div>
				<div class="version-area">
					<span>Latest version :github: Weightless 1.3.2</span>
				</div>
			</container-element>
		`;
	}
}