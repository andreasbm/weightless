import "@appnest/web-router";
import { customElement, html, LitElement, property, PropertyValues, query } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import "../../../lib/button/button";
import "../../../lib/icon/icon";
import "../../../lib/title/title";
import "../../../lib/text/text";
import { cssResult } from "../../../lib/util/css";
import { BROWSER_SUPPORT, BULLETS, GITHUB_URL, NPM_URL, PACKAGE_JSON_URL } from "../../constants";
import "../../elements/container/container-element";
import "../../elements/footer/footer-element";
import "@a11y/skip-navigation";
import { sharedStyles } from "../../style/shared";

import styles from "./home-page.scss";

/**
 * Invokes a callback when the browser is idle.
 * Fallback to setTimeout.
 * @param cb
 */
export function whenIdle (cb: (() => void)) {
	"requestIdleCallback" in window ? (<any>window).requestIdleCallback(cb) : setTimeout(cb)
}

@customElement("home-page")
export default class HomePage extends LitElement {
	static styles = [sharedStyles, cssResult(styles)];

	@property({type: String}) version?: string;
	@query("#bullets-container") protected $bulletsContainer: HTMLElement;
	@query("#octocat-container") protected $octocatContainer: HTMLElement;


	private bullets = BULLETS;
	private io!: IntersectionObserver;
	private isIntersectingOctocat = false;

	firstUpdated (props: PropertyValues) {
		super.firstUpdated(props);

		const options = {
			root: this,
			rootMargin: "0px",
			threshold: 1.0
		};

		this.io = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
			this.isIntersectingOctocat = entries[0].isIntersecting;
			this.requestUpdate().then();
		}, options);

		this.io.observe(this.$octocatContainer);
		whenIdle(() => this.loadVersion());
	}

	disconnectedCallback () {
		super.disconnectedCallback();
		this.io.disconnect();
	}

	/**
	 * Loads the newest version number from npm.
	 */
	private async loadVersion () {
		const pkg = await fetch(PACKAGE_JSON_URL).then(res => {
			if (!res.ok) throw new Error(res.statusText);
			return res.json();
		});

		if (pkg != null) {
			this.version = pkg.version;
		}
	}

	/**
	 * Scrolls to the bullets container.
	 */
	private scrollToBullets () {
		this.$bulletsContainer.scrollIntoView({behavior: "smooth", block: "start"});
	}

	protected render () {
		return html`
			<container-element id="main-container" centered>
				<wl-title class="title" nowrap>Weightless</wl-title>
				<wl-text class="text" size="large">High quality web components with a small footprint.</wl-text>
				<div class="cta-area">
					<router-link path="get-started" delegateFocus>
						<skip-anchor></skip-anchor>
						<wl-button id="get-started">Get Started</wl-button>
					</router-link>
					<div class="mobile-cta">
						<p>or</p>
						<router-link path="elements" delegateFocus>
							<wl-button id="get-started" outlined flat inverted>Try the elements</wl-button>
						</router-link>
					</div>
				</div>
				<wl-button aria-label="Scroll down" class="arrow-down" fab inverted flat @click="${this.scrollToBullets}">
					<wl-icon alt="Down">keyboard_arrow_down</wl-icon>
				</wl-button>
				<a class="version-area" href="${NPM_URL}" rel="noopener" target="_blank">
					<span>Latest version</span>
					<img class="npm" src="/assets/npm-logo.svg" alt="NPM" />
					<span>weightless${this.version != null ? html` - <b>v${this.version}</b>` : ""}</span>
				</a>
			</container-element>
			<container-element id="bullets-container">
				<wl-title class="title" level="2">Why Weightless?</wl-title>
				<div id="bullets">
					${repeat(this.bullets, bullet => html`
						<div class="bullet">
							<img class="img" src="/assets/icon/${bullet.img}.svg" alt="${bullet.title}" />
							<aside>
								<wl-title class="title" level="4">${bullet.title}</wl-title>
								<wl-text class="text">${bullet.text}</wl-text>
							</aside>
						</div>
					`)}
				</div>
			</container-element>
			<a id="octocat-container" href="${GITHUB_URL}/stargazers" target="_blank" rel="noopener" class="${this.isIntersectingOctocat ? `intersecting` : ""}">
				<container-element class="container" centered>
					<div id="octocat-area">
						<svg class="img" width="362" height="279" viewBox="0 0 362 279" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
							<g fill-rule="nonzero" fill="none">
								<path d="M361.06 133.784c-29.759-5.935-60.223-6.076-78.7-5.229 2.962-10.881 3.95-23.6 3.95-37.59 0-20.209-7.617-36.32-19.746-48.473 2.116-6.924 4.936-22.328-2.82-41.971 0 0-13.823-4.381-45.274 16.675-12.27-3.109-25.387-4.663-38.504-4.663-14.386 0-28.913 1.837-42.594 5.511C104.933-4.143 90.688.38 90.688.38c-9.308 23.318-3.526 40.7-1.833 44.94-11.001 11.87-17.63 26.992-17.63 45.504 0 13.99 1.551 26.568 5.5 37.45-18.617-.707-47.953-.424-76.725 5.37l.282 1.272c28.772-5.794 58.39-5.936 76.866-5.229.847 2.261 1.834 4.522 2.821 6.642-18.335.565-49.505 2.968-79.405 11.447l.423 1.272c30.183-8.48 61.634-10.74 79.828-11.306 11.001 20.35 32.44 33.634 70.802 37.732-5.5 3.675-11.001 9.893-13.258 20.492l-1.128 23.741v30.384s-.846 10.881-10.86 14.414c0 0-5.924 4.098.423 6.36 0 0 27.503 2.26 27.503-20.35v-33.352s-1.128-13.284 5.36-17.806v54.832s-.424 13.143-7.194 18.089c0 0-4.513 8.055 5.36 5.935 0 0 18.9-2.685 19.745-24.872l.423-55.538h4.514l.423 55.538c.846 22.046 19.745 24.872 19.745 24.872 9.873 2.261 5.36-5.935 5.36-5.935-6.77-4.946-7.193-18.09-7.193-18.09V199.78c6.488 5.088 5.36 17.382 5.36 17.382v33.352c0 22.61 27.502 20.35 27.502 20.35 6.347-2.262.423-6.36.423-6.36-9.873-3.674-10.86-14.414-10.86-14.414v-43.81c0-17.099-7.193-26.143-14.245-30.807 40.901-4.098 60.506-17.24 69.532-37.873 17.912.424 50.21 2.685 80.957 11.447l.423-1.272c-30.606-8.62-62.621-10.882-80.816-11.447.847-2.12 1.552-4.24 2.257-6.5 18.9-.707 49.505-.707 79.405 5.228l.282-1.272z" fill="#010101"/>
								<path d="M246.41 89.617c8.749 8.058 13.97 17.671 13.97 27.991 0 48.63-36.125 49.903-80.718 49.903-44.592 0-80.718-6.786-80.718-49.903 0-10.32 5.08-19.933 13.83-27.85 14.535-13.288 39.089-6.22 66.888-6.22 27.8 0 52.213-7.21 66.748 6.08z" fill="#F5CCB3"/>
								<g id="arm">
									<path d="M138.36 195.965c-7.476 3.532-30.888 12.294-44.992-12.013 0 0-7.898-14.414-22.99-15.545 0 0-14.668-.282-.987 9.186 0 0 9.732 4.664 16.502 22.046 0 0 8.885 29.677 51.338 20.067l8.908-1.641-1.874-24.093-5.906 1.993z" fill="#000"/>
									<path d="M77.058 172.093c0 1.13-1.262 1.978-2.944 1.978-1.542 0-2.943-.848-2.943-1.978s1.261-1.978 2.943-1.978c1.682 0 2.944.848 2.944 1.978zm8.13 4.521c0 1.13-1.262 1.978-2.944 1.978-1.542 0-2.943-.847-2.943-1.978 0-1.13 1.261-1.978 2.943-1.978 1.682 0 2.944.848 2.944 1.978zm4.906 5.935c0 1.13-1.261 1.978-2.944 1.978-1.541 0-2.943-.848-2.943-1.978s1.261-1.979 2.943-1.979c1.683-.14 2.944.848 2.944 1.979zm4.486 6.782c0 1.13-1.262 1.978-2.944 1.978-1.542 0-2.944-.848-2.944-1.978s1.262-1.979 2.944-1.979c1.682-.14 2.944.848 2.944 1.979zm4.906 6.216c0 1.13-1.262 1.978-2.944 1.978-1.542 0-2.943-.847-2.943-1.978 0-1.13 1.261-1.978 2.943-1.978 1.682 0 2.944.848 2.944 1.978zm6.728 5.51c0 1.131-1.261 1.979-2.943 1.979-1.542 0-2.944-.848-2.944-1.978s1.262-1.978 2.944-1.978c1.682-.142 2.943.847 2.943 1.978zm9.392 3.533c0 1.13-1.262 1.978-2.944 1.978-1.542 0-2.943-.848-2.943-1.978s1.261-1.978 2.943-1.978c1.682 0 2.944.848 2.944 1.978zm9.392 0c0 1.13-1.262 1.978-2.944 1.978-1.542 0-2.944-.848-2.944-1.978s1.262-1.978 2.944-1.978 2.944.848 2.944 1.978zm9.532-1.554c0 1.13-1.262 1.978-2.944 1.978-1.542 0-2.944-.848-2.944-1.978s1.262-1.978 2.944-1.978c1.542 0 2.944.847 2.944 1.978z" fill="#C4E5D9"/>
								</g>
								<g>
									<path d="M135 116c0 25.404 20.595 46 45.999 46C206.404 162 227 141.404 227 116h-92z" fill="#333"/>
									<path d="M156 134c0 14.126 11.453 25.578 25.577 25.578 14.127 0 25.579-11.453 25.579-25.578H156z" fill="#CA2027"/>
								</g>
								<g id="eyes" fill="#FFF300" stroke="#FECC27" stroke-width="6">
									<path d="M167.337 31.963l-9.65 28.455a6.347 6.347 0 0 0 .925 5.837l17.972 24.082c3.147 4.219.092 10.213-5.169 10.145l-30.045-.384a6.35 6.35 0 0 0-5.264 2.683l-17.35 24.533c-3.039 4.297-9.685 3.243-11.249-1.78L98.588 96.84a6.356 6.356 0 0 0-4.179-4.18l-28.692-8.919c-5.026-1.561-6.078-8.21-1.781-11.248l24.533-17.35a6.35 6.35 0 0 0 2.683-5.264l-.384-30.045c-.067-5.263 5.928-8.318 10.145-5.169l24.082 17.971a6.347 6.347 0 0 0 5.836.925l28.456-9.65c4.983-1.691 9.74 3.067 8.05 8.05zM195.162 32.212l9.65 28.456a6.347 6.347 0 0 1-.925 5.836l-17.971 24.083c-3.148 4.218-.092 10.213 5.168 10.145l30.046-.384a6.35 6.35 0 0 1 5.264 2.683l17.35 24.533c3.038 4.297 9.685 3.243 11.248-1.781l8.92-28.692a6.356 6.356 0 0 1 4.179-4.18l28.692-8.919c5.026-1.562 6.078-8.21 1.78-11.248l-24.532-17.35a6.35 6.35 0 0 1-2.683-5.264l.384-30.046c.066-5.262-5.928-8.317-10.145-5.168l-24.083 17.971a6.347 6.347 0 0 1-5.836.925l-28.456-9.65c-4.982-1.692-9.74 3.066-8.05 8.05z"/>
								</g>
							</g>
						</svg>
						<aside>
							<wl-title class="title" level="2">Our Octocat is hungry!</wl-title>
							<wl-text class="text">Do you find this library inspiring? Help us feed our Octocat by becoming a stargazer.</wl-text>
						</aside>
					</div>
				</container-element>
			</a>
			
			<container-element id="browser-support-container">
				<wl-title class="title" level="2">Browser Support</wl-title>
				<wl-text class="text">Weightless elements are supported on all modern browsers. If you want to support old school browsers you’ll need to load polyfills. Luckily it is super easy if you use <a href="https://polyfill.dev" target="_blank" rel="noopener">polyfill.dev</a> or something similar.</wl-text>
				<div id="browsers">
					${repeat(BROWSER_SUPPORT, support => html`
						<div class="browser">
							<img class="img" src="/assets/browser/${support.img}.svg" alt="${support.text}" />
							<span>${support.text}</span>
						</div>
					`)}
				</div>
			</container-element>
			<footer-element></footer-element>
		`;
	}
}