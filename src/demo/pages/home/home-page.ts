import { customElement, html, LitElement, property, PropertyValues, query } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import { cssResult } from "../../../lib/util/css";
import { BULLETS, GITHUB_URL, NPM_URL } from "../../constants";
import { sharedStyles } from "../../style/shared";
import "../../elements/container/container-element";
import "../../../lib/title/title-element";
import "../../../lib/button/button-element";
import "../../../lib/icon/icon-element";
import "@appnest/web-router";

import styles from "./home-page.scss";


@customElement("home-page")
export default class HomePage extends LitElement {
	static styles = [sharedStyles, cssResult(styles)];

	@query("#bullets-container") $bulletsContainer: HTMLElement;
	@query("#octocat-container") $octocatContainer: HTMLElement;


	private bullets = BULLETS;
	private io!: IntersectionObserver;
	private isIntersectingOctocat = false;

	firstUpdated (props: PropertyValues) {
		super.firstUpdated(props);

		const options = {
			root: this,
			rootMargin: '0px',
			threshold: 1.0
		};

		this.io = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
			this.isIntersectingOctocat = entries[0].isIntersecting;
			this.requestUpdate().then();
		}, options);

		this.io.observe(this.$octocatContainer);
	}

	disconnectedCallback () {
		super.disconnectedCallback();
		this.io.disconnect();
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
				<title-element class="title">Weightless</title-element>
				<span class="text">High quality Web Components with a small footprint.</span>
				<div class="cta-area">
					<router-link path="get-started"><button-element>Get Started</button-element></router-link>
				</div>
				<button-element class="arrow-down" fab inverted flat @click="${this.scrollToBullets}">
					<icon-element>keyboard_arrow_down</icon-element>
				</button-element>
				<a class="version-area" href="${NPM_URL}" target="_blank">
					<span>Latest version</span>
					<img class="npm" src="/assets/npm-logo.svg" />
					<span>@weightless/all - <b>v1.0.3</b></span>
				</a>
			</container-element>
			<container-element id="bullets-container">
				<title-element class="title" level="2">Your app, your way</title-element>
				<div id="bullets">
					${repeat(this.bullets, bullet => html`
						<div class="bullet">
							<img class="img" src="${bullet.img}" />
							<aside>
								<title-element class="title" level="4">${bullet.title}</title-element>
								<span class="text">${bullet.text}</span>
							</aside>
						</div>
					`)}
				</div>
			</container-element>
			<a id="octocat-container" href="${GITHUB_URL}/stargazers" target="_blank" class="${this.isIntersectingOctocat ? `intersecting` : ""}">
				<container-element class="container" centered>
					<div id="octocat-area">
						<svg class="img" width="362" height="291" viewBox="0 0 362 291" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
							<defs>
								<path d="M87.643 29.462l13.298 26.945a6.347 6.347 0 0 0 4.78 3.472l29.737 4.321c5.209.758 7.287 7.157 3.52 10.83L117.46 96.002a6.35 6.35 0 0 0-1.825 5.62l5.079 29.615c.89 5.187-4.555 9.141-9.213 6.694l-26.595-13.981a6.356 6.356 0 0 0-5.91 0L52.4 137.932c-4.658 2.45-10.103-1.507-9.213-6.694l5.079-29.616a6.35 6.35 0 0 0-1.825-5.62L24.924 75.03c-3.768-3.674-1.69-10.073 3.52-10.829l29.736-4.32a6.347 6.347 0 0 0 4.78-3.473L76.26 29.462c2.326-4.72 9.055-4.72 11.384 0z" id="b"/>
								<filter x="-41.1%" y="-51%" width="200.9%" height="205.5%" filterUnits="objectBoundingBox" id="a">
									<feMorphology radius="3" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"/>
									<feOffset dx="11" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"/>
									<feGaussianBlur stdDeviation="17" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>
									<feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"/>
									<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" in="shadowBlurOuter1"/>
								</filter>
								<path d="M198.241 29.712l13.298 26.945a6.347 6.347 0 0 0 4.78 3.472l29.737 4.321c5.209.758 7.287 7.157 3.52 10.829l-21.518 20.973a6.35 6.35 0 0 0-1.824 5.62l5.078 29.616c.89 5.186-4.555 9.141-9.213 6.694l-26.595-13.981a6.356 6.356 0 0 0-5.91 0l-26.596 13.981c-4.658 2.45-10.103-1.508-9.212-6.694l5.078-29.616a6.35 6.35 0 0 0-1.825-5.62L135.522 75.28c-3.767-3.674-1.69-10.074 3.52-10.829l29.736-4.32a6.347 6.347 0 0 0 4.78-3.473l13.299-26.945c2.326-4.72 9.055-4.72 11.384 0z" id="d"/><filter x="-41.1%" y="-51%" width="200.9%" height="205.5%" filterUnits="objectBoundingBox" id="c">
									<feMorphology radius="3" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"/>
									<feOffset dx="11" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"/>
									<feGaussianBlur stdDeviation="17" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>
									<feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"/>
									<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" in="shadowBlurOuter1"/>
								</filter>
							</defs>
							<g fill-rule="nonzero" fill="none">
								<path d="M361.06 145.784c-29.759-5.935-60.223-6.076-78.7-5.229 2.962-10.881 3.95-23.6 3.95-37.59 0-20.209-7.617-36.32-19.746-48.473 2.116-6.924 4.936-22.328-2.82-41.971 0 0-13.823-4.381-45.274 16.675-12.27-3.109-25.387-4.663-38.504-4.663-14.386 0-28.913 1.837-42.594 5.511C104.933 7.857 90.688 12.38 90.688 12.38c-9.308 23.318-3.526 40.7-1.833 44.94-11.001 11.87-17.63 26.992-17.63 45.504 0 13.99 1.551 26.568 5.5 37.45-18.617-.707-47.953-.424-76.725 5.37l.282 1.272c28.772-5.794 58.39-5.936 76.866-5.229.847 2.261 1.834 4.522 2.821 6.642-18.335.565-49.505 2.968-79.405 11.447l.423 1.272c30.183-8.48 61.634-10.74 79.828-11.306 11.001 20.35 32.44 33.634 70.802 37.732-5.5 3.675-11.001 9.893-13.258 20.492l-1.128 23.741v30.384s-.846 10.881-10.86 14.414c0 0-5.924 4.098.423 6.36 0 0 27.503 2.26 27.503-20.35v-33.352s-1.128-13.284 5.36-17.806v54.832s-.424 13.143-7.194 18.089c0 0-4.513 8.055 5.36 5.935 0 0 18.9-2.685 19.745-24.872l.423-55.538h4.514l.423 55.538c.846 22.046 19.745 24.872 19.745 24.872 9.873 2.261 5.36-5.935 5.36-5.935-6.77-4.946-7.193-18.09-7.193-18.09V211.78c6.488 5.088 5.36 17.382 5.36 17.382v33.352c0 22.61 27.502 20.35 27.502 20.35 6.347-2.262.423-6.36.423-6.36-9.873-3.674-10.86-14.414-10.86-14.414v-43.81c0-17.099-7.193-26.143-14.245-30.807 40.901-4.098 60.506-17.24 69.532-37.873 17.912.424 50.21 2.685 80.957 11.447l.423-1.272c-30.606-8.62-62.621-10.882-80.816-11.447.847-2.12 1.552-4.24 2.257-6.5 18.9-.707 49.505-.707 79.405 5.228l.282-1.272z" fill="#010101"/>
								<path d="M246.41 101.617c8.749 8.058 13.97 17.671 13.97 27.991 0 48.63-36.125 49.903-80.718 49.903-44.592 0-80.718-6.786-80.718-49.903 0-10.32 5.08-19.933 13.83-27.85 14.535-13.288 39.089-6.22 66.888-6.22 27.8 0 52.213-7.21 66.748 6.08z" fill="#F5CCB3"/>
								<g id="arm">
									<path d="M138.36 207.965c-7.476 3.532-30.888 12.294-44.992-12.013 0 0-7.898-14.414-22.99-15.545 0 0-14.668-.282-.987 9.186 0 0 9.732 4.664 16.502 22.046 0 0 8.885 29.677 51.338 20.067l8.908-1.641-1.874-24.093-5.906 1.993z" fill="#000"/>
									<path d="M77.058 184.093c0 1.13-1.262 1.978-2.944 1.978-1.542 0-2.943-.848-2.943-1.978s1.261-1.978 2.943-1.978c1.682 0 2.944.848 2.944 1.978zm8.13 4.521c0 1.13-1.262 1.978-2.944 1.978-1.542 0-2.943-.847-2.943-1.978 0-1.13 1.261-1.978 2.943-1.978 1.682 0 2.944.848 2.944 1.978zm4.906 5.935c0 1.13-1.261 1.978-2.944 1.978-1.541 0-2.943-.848-2.943-1.978s1.261-1.979 2.943-1.979c1.683-.14 2.944.848 2.944 1.979zm4.486 6.782c0 1.13-1.262 1.978-2.944 1.978-1.542 0-2.944-.848-2.944-1.978s1.262-1.979 2.944-1.979c1.682-.14 2.944.848 2.944 1.979zm4.906 6.216c0 1.13-1.262 1.978-2.944 1.978-1.542 0-2.943-.847-2.943-1.978 0-1.13 1.261-1.978 2.943-1.978 1.682 0 2.944.848 2.944 1.978zm6.728 5.51c0 1.131-1.261 1.979-2.943 1.979-1.542 0-2.944-.848-2.944-1.978s1.262-1.978 2.944-1.978c1.682-.142 2.943.847 2.943 1.978zm9.392 3.533c0 1.13-1.262 1.978-2.944 1.978-1.542 0-2.943-.848-2.943-1.978s1.261-1.978 2.943-1.978c1.682 0 2.944.848 2.944 1.978zm9.392 0c0 1.13-1.262 1.978-2.944 1.978-1.542 0-2.944-.848-2.944-1.978s1.262-1.978 2.944-1.978 2.944.848 2.944 1.978zm9.532-1.554c0 1.13-1.262 1.978-2.944 1.978-1.542 0-2.944-.848-2.944-1.978s1.262-1.978 2.944-1.978c1.542 0 2.944.847 2.944 1.978z" fill="#C4E5D9"/>
								</g>
								<g>
									<path d="M135 128c0 25.404 20.595 46 45.999 46C206.404 174 227 153.404 227 128h-92z" fill="#333"/>
									<path d="M156 146c0 14.126 11.453 25.578 25.577 25.578 14.127 0 25.579-11.453 25.579-25.578H156z" fill="#CA2027"/>
								</g>
								<g id="eyes">
									<g transform="rotate(45 109.986 132.912)">
										<use fill="#000" filter="url(#a)" xlink:href="#b"/>
										<use stroke="#FECC27" stroke-width="6" fill="#FFF300" xlink:href="#b"/>
									</g>
									<g transform="scale(-1 1) rotate(45 -15.964 -437.918)">
										<use fill="#000" filter="url(#c)" xlink:href="#d"/>
										<use stroke="#FECC27" stroke-width="6" fill="#FFF300" xlink:href="#d"/>
									</g>
								</g>
							</g>
						</svg>
						<aside>
							<title-element class="title" level="2">Our Octocat is hungry!</title-element>
							<span>Do you find this library inspiring? Help us feed our Octocat by becoming a stargazer.</span>
						</aside>
					</div>
				</container-element>
			</a>
			
		`;
	}
}