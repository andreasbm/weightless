import { path, GLOBAL_ROUTER_EVENTS_TARGET, GlobalRouterEventKind } from "@appnest/web-router";
import "@appnest/web-router";
import { customElement, html, property, PropertyValues, query } from "lit-element";
import "../../../lib/button";
import "../../../lib/card";
import "../../../lib/icon";
import "../../../lib/nav";
import { Nav } from "../../../lib/nav/nav";
import { Popover } from "../../../lib/popover";
import "../../../lib/popover";
import "../../../lib/popover-card/popover-card";
import { cssResult } from "../../../lib/util/css";
import { setProperty } from "../../../lib/util/dom";
import { Palette, setPalette } from "../../../lib/util/theme";
import { GITHUB_URL } from "../../constants";
import { sharedStyles } from "../../style/shared";
import "../octo/octo-element";
import "../theme/theme-element";
import styles from "./navbar-element.scss";

const greyPalette: Palette = {
	100: [200, 4, 95],
	200: [200, 4, 85],
	300: [200, 4, 75],
	400: [200, 4, 65],
	500: [200, 4, 55],
	600: [200, 4, 35],
	700: [200, 4, 25],
	800: [200, 4, 15],
	900: [200, 4, 5],
	"contrast": {
		100: [0, 0, 0],
		200: [0, 0, 0],
		300: [0, 0, 0],
		400: [360, 100, 100],
		500: [360, 100, 100],
		600: [360, 100, 100],
		700: [360, 100, 100],
		800: [360, 100, 100],
		900: [360, 100, 100]
	}
};

const greyReversedPalette: Palette = {
	900: [200, 4, 95],
	800: [200, 4, 85],
	700: [200, 4, 75],
	600: [200, 4, 65],
	500: [200, 4, 55],
	400: [200, 4, 35],
	300: [200, 4, 25],
	200: [200, 4, 15],
	100: [200, 4, 5],
	"contrast": {
		900: [0, 0, 0],
		800: [0, 0, 0],
		700: [0, 0, 0],
		600: [0, 0, 0],
		500: [360, 100, 100],
		400: [360, 100, 100],
		300: [360, 100, 100],
		200: [360, 100, 100],
		100: [360, 100, 100]
	}
};

@customElement("navbar-element")
export class ThemeComponent extends Nav {

	static styles = [...Nav.styles, sharedStyles, cssResult(styles)];

	@property({type: Boolean, reflect: true}) darkMode = false;
	@query("#theme-popover") protected $themePopover!: Popover;
	@query("#logo") protected $logo: HTMLImageElement;

	firstUpdated (props: PropertyValues) {
		super.firstUpdated(props);

		GLOBAL_ROUTER_EVENTS_TARGET.addEventListener(GlobalRouterEventKind.ChangeState, () => {
			this.requestUpdate().then();
		});
	}

	private toggleMenu () {
		window.dispatchEvent(new CustomEvent("toggleMenu"));
	}

	private openThemeSelector () {
		this.$themePopover.show();
	}

	private toggleDarkMode () {
		this.darkMode = !this.darkMode;

		const light = `hsl(0, 0%, 95%)`;
		const dark = `hsl(200, 0%, 5%)`;
		const foreground = this.darkMode ? light : dark;
		const background = this.darkMode ? dark : light;
		const shade = this.darkMode ? greyReversedPalette : greyPalette;
		const shadow = this.darkMode ? `hsla(360, 5%, 50%, 0.1)` : `hsla(0, 0%, 0%, 0.2)`;

		setProperty("--foreground", foreground);
		setProperty("--background", background);
		setProperty("--shadow", shadow);
		setPalette("shade", shade);

		// Add darkmode to class to respond to the change other where
		const classList = document.documentElement.classList;
		if (this.darkMode) {
			classList.add("darkmode");
		} else {
			classList.remove("darkmode");
		}
	}

	private rotateLogo () {
		this.$logo.animate(<PropertyIndexedKeyframes>{
			transform: [`rotate(0deg)`, `rotate(${360 * 5}deg)`]
		}, {easing: "ease-out", duration: 1500});
	}

	protected render () {
		return html`
			<aside id="left-container">
				${path().startsWith("/elements") ? html`<wl-button aria-label="Toggle menu" id="menu-button" fab inverted flat @click="${() => this.toggleMenu()}">
					<wl-icon alt="menu">menu</wl-icon>
				</wl-button>` : ""}
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
				<wl-button aria-label="Toggle darkmode" id="dark-mode" @click="${() => this.toggleDarkMode()}" fab inverted flat outlined>
					${this.darkMode ? html`<wl-icon>flash_off</wl-icon>` : html`<wl-icon>flash_on</wl-icon>`}
				</wl-button>
				<wl-button aria-label="Open theme" fab id="theme-selector" @click="${() => this.openThemeSelector()}"></wl-button>
				<wl-popover id="theme-popover" anchor="#theme-selector" backdrop fixed transformOriginX="right" anchorOriginY="center" anchorOriginX="center">
					<wl-popover-card>
						<theme-element @update="${() => this.$themePopover.hide()}"></theme-element>
					</wl-popover-card>
				</wl-popover>
				<a id="octo" href="${GITHUB_URL}" target="_blank" rel="noopener" aria-label="Open Github"><octo-element></octo-element></a>
			</aside>
		`;
	}
}