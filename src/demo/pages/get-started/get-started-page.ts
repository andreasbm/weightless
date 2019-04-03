import "@a11y/skip-navigation";
import { customElement, html, LitElement } from "lit-element";
import "../../../lib/divider";
import "../../../lib/title/title";
import { cssResult } from "../../../lib/util/css";
import { ALL_ELEMENTS_DEMO_URL, GITHUB_URL } from "../../constants";
import "../../elements/code-example/code-example-element";
import "../../elements/container/container-element";
import "../../elements/footer/footer-element";
import "../../elements/highlight/highlight-element";
import { sharedStyles } from "../../style/shared";

import styles from "./get-started-page.scss";

@customElement("get-started-page")
export default class GetStartedPage extends LitElement {

	static styles = [sharedStyles, cssResult(styles)];

	protected render () {
		return html`
			<skip-anchor></skip-anchor>
			<container-element id="main-container">
				<wl-title class="title">Get Started</wl-title>
				<p>Welcome to Weightless! Weightless provides a set of high quality web components with a small footprint.</p>
				
				<p>This guide will show you have to get started in a manner of minutes. Before you begin you should make sure that your development environment includes Node.js and a <a id="npm-link" href="https://docs.npmjs.com/about-npm/index.html" target="_blank">NPM package manager</a>.</p>
				
				<wl-divider></wl-divider>
				<wl-title level="3">Installation</wl-title>
				<p>To install Weightless you can run the following command</p>
				<highlight-element text="npm i weightless"></highlight-element>
				
				<wl-divider></wl-divider>
				<wl-title level="3">Usage</wl-title>
				<p>To consume the web components you must first import the elements you wish to use. If you for example want to use the <code>wl-button</code> you must import from path <code>"weightless/button"</code> like this.</p>
				<highlight-element lang="js" text='import "weightless/button"'></highlight-element>
				
				<p>Then you can use the element in your html like this.</p>
				
				<code-example-element lang="js" style="position: relative;">
					<wl-button>Button</wl-button>
				</code-example-element>
		
				<wl-divider></wl-divider>
				<wl-title level="3">Learn more</wl-title>
				<p>If you want learn more you can:</p>
				<ul>
					<li>Go to the <router-link path="/elements/button"><a href="" rel="noopener" @click="${(e: Event) => e.preventDefault()}">elements overview</a></router-link>.</li>
					<li>Check out the <a href="${GITHUB_URL}" target="_blank">Github repository</a>.</li>
					<li>Try out the library in the <a href="${ALL_ELEMENTS_DEMO_URL}" target="_blank">playground</a>.</li>
					<li>Run <code>npm init web-config new my-project --lit</code> to quickly setup a project with weightless.</li>
				</ul>

			</container-element>
			<footer-element></footer-element>
		`;
	}
}