import { path, GLOBAL_ROUTER_EVENTS_TARGET, GlobalRouterEventKind } from "@appnest/web-router";
import "@appnest/web-router";
import { customElement, html, property, PropertyValues, query } from "lit-element";
import "../../../lib/button";
import "../../../lib/card";
import "../../../lib/icon";
import "../../../lib/nav";
import { NavElement } from "../../../lib/nav/nav-element";
import { PopoverElement } from "../../../lib/popover";
import "../../../lib/popover";
import "../../../lib/popover-card/popover-card-element";
import { cssResult } from "../../../lib/util/css";
import { setProperty } from "../../../lib/util/dom";
import { Palette, setPalette } from "../../../lib/util/theme";
import { GITHUB_URL } from "../../constants";
import { sharedStyles } from "../../style/shared";
import "../octo/octo-element";
import "../theme/theme-element";
import styles from "./navbar-element.scss";

const greyPalette: Palette = {
	200: "230, 230, 230",
	300: "191, 191, 191",
	400: "153, 153, 153",
	500: "155, 155, 155",
	600: "77, 77, 77",
	700: "38, 38, 38",
	"contrast": {
		200: "0, 0, 0",
		300: "0, 0, 0",
		400: "255, 255, 255",
		500: "255, 255, 255",
		600: "255, 255, 255",
		700: "255, 255, 255"
	}
};

const greyReversedPalette: Palette = {
	700: "230, 230, 230",
	600: "191, 191, 191",
	500: "153, 153, 153",
	400: "155, 155, 155",
	300: "77, 77, 77",
	200: "38, 38, 38",
	"contrast": {
		700: "0, 0, 0",
		600: "0, 0, 0",
		500: "255, 255, 255",
		400: "255, 255, 255",
		300: "255, 255, 255",
		200: "255, 255, 255"
	}
};

@customElement("navbar-element")
export class ThemeComponent extends NavElement {

	static styles = [...NavElement.styles, sharedStyles, cssResult(styles)];

	@property({type: Boolean, reflect: true}) darkMode = false;
	@query("#theme-popover") $themePopover!: PopoverElement;
	@query("#logo") $logo: HTMLImageElement;

	firstUpdated (props: PropertyValues) {
		super.firstUpdated(props);

		GLOBAL_ROUTER_EVENTS_TARGET.addEventListener(GlobalRouterEventKind.ChangeState, () => {
			this.requestUpdate().then();
		});
	}

	private togglePopover () {
		window.dispatchEvent(new CustomEvent("togglePopover"));
	}

	private openThemeSelector () {
		this.$themePopover.show();
	}

	private toggleDarkMode () {
		this.darkMode = !this.darkMode;
		const foreground = this.darkMode ? `white` : `black`;
		const background = this.darkMode ? `black` : `white`;
		const shade = this.darkMode ? greyReversedPalette : greyPalette;

		setProperty("--foreground", foreground);
		setProperty("--background", background);
		setPalette("shade", shade);
	}

	private rotateLogo () {
		this.$logo.animate(<PropertyIndexedKeyframes>{
			transform: [`rotate(0deg)`, `rotate(${360 * 5}deg)`]
		}, {easing: "ease-out", duration: 1500});
	}

	protected render () {
		return html`
			<aside id="left-container">
				${path() !== "/" ? html`<button-element id="popover-button" fab inverted flat @click="${() => this.togglePopover()}">
					<icon-element alt="menu">menu</icon-element>
				</button-element>` : ""}
				<router-link id="logo-wrapper" path="/" @click="${() => this.rotateLogo()}">
					<svg id="logo" width="100%" height="100%" viewBox="0 0 264 264" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
						<g fill-rule="nonzero">
							<path d="M217.5 132h-20v-22.5c0-49.43-40.07-89.5-89.5-89.5-5.523 0-10-4.477-10-10s4.477-10 10-10c60.475 0 109.5 49.025 109.5 109.5V132z"/>
							<path d="M132 46.5v20h-22.5C60.07 66.5 20 106.57 20 156c0 5.523-4.477 10-10 10s-10-4.477-10-10C0 95.525 49.025 46.5 109.5 46.5H132z"/>
							<path d="M46.5 132h20v22.5c0 49.43 40.07 89.5 89.5 89.5 5.523 0 10 4.477 10 10s-4.477 10-10 10c-60.475 0-109.5-49.025-109.5-109.5V132z"/>
							<path d="M132 217.5v-20h22.5c49.43 0 89.5-40.07 89.5-89.5 0-5.523 4.477-10 10-10s10 4.477 10 10c0 60.475-49.025 109.5-109.5 109.5H132z"/>
						</g>
					</svg>
					<img id="text" src="${this.darkMode ? `assets/brand/text-light.svg` : `assets/brand/text-dark.svg`}" alt="Logo"/>
				</router-link>
			</aside>
			<aside id="right-container">
				<div id="navigation">
					<router-link class="link" path="/get-started">Get Started</router-link>
					<router-link class="link" path="/elements">Elements</router-link>
				</div>
				<button-element id="dark-mode" @click="${() => this.toggleDarkMode()}" fab inverted flat outlined>
					${this.darkMode ? html`<icon-element alt="Darkmode off">flash_off</icon-element>` : html`<icon-element alt="Darkmode on">flash_on</icon-element>`}
				</button-element>
				<button-element fab id="theme-selector" @click="${() => this.openThemeSelector()}"></button-element>
				<popover-element id="theme-popover" anchor="#theme-selector" backdrop fixed transformOriginX="right" anchorOriginY="center" anchorOriginX="center">
					<popover-card-element>
						<theme-element @update="${() => this.$themePopover.hide()}"></theme-element>
					</popover-card-element>
				</popover-element>
				<a id="octo" href="${GITHUB_URL}" target="_blank" rel="noopener"><octo-element></octo-element></a>
			</aside>
		`;
	}
}