import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { GITHUB_URL } from "../../constants";
import { sharedStyles } from "../../style/shared";
import "../../elements/container/container-element";
import "../../../lib/title/wl-title";
import "../../elements/highlight/highlight-element";
import "../../elements/footer/footer-element";
import "../../elements/code-example/code-example-element";


import styles from "./get-started-page.scss";
import "../../../lib/divider";

@customElement("get-started-page")
export default class GetStartedPage extends LitElement {

	static styles = [sharedStyles, cssResult(styles)];

	protected render () {
		return html`
			<container-element id="main-container">
				<wl-title class="title">Get Started</wl-title>
				<p>Welcome to Weightless! Weightless provides a set of high quality web components with a small footprint.</p>
				
				<p>This guide will show you have to get started in a manner of minutes. Before you begin you should make sure that your development environment includes Node.js and a <a href="https://docs.npmjs.com/about-npm/index.html" target="_blank">NPM package manager</a>.</p>
				
				<wl-divider></wl-divider>
				<wl-title level="3">Installation</wl-title>
				<p>To install Weightless you can run the following command to install all of the components.</p>
				<highlight-element text="npm i weightless"></highlight-element>
				
				<wl-divider></wl-divider>
				<wl-title level="3">Consumation</wl-title>
				<p>To consume the web components you must first import the elements you wish to use. If you for example want to use the <code>wl-button</code> you must import from path <code>"weightless/button"</code>. Then you can use the element in your html like this.</p>
				
				<code-example-element>
					<wl-button>Button</wl-button>
				</code-example-element>
		
				<wl-divider></wl-divider>
				<wl-title level="3">Learn more</wl-title>
				<p>If you want learn more you can either go to the <router-link path="/elements/button"><a href="" rel="noopener" @click="${(e: Event) => e.preventDefault()}">elements overview</a></router-link> or <a href="${GITHUB_URL}" target="_blank">Github repository</a>.</p>

			</container-element>
			<footer-element></footer-element>
		`;
	}
}