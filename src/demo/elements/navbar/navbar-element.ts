import "@appnest/web-router";
import { customElement, html, LitElement, property, PropertyValues, query } from "lit-element";
import "../../../lib/button";
import "../../../lib/card";
import "../../../lib/icon";
import "../../../lib/nav";
import { PopoverElement } from "../../../lib/popover";
import "../../../lib/popover";
import "../../../lib/popover-card/popover-card-element";
import { cssResult } from "../../../lib/util/css";
import { setProperty } from "../../../lib/util/dom";
import { Palette, setPalette } from "../../../lib/util/theme";
import { sharedStyles } from "../../style/shared";
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
export class ThemeComponent extends LitElement {

	static styles = [sharedStyles, cssResult(styles)];

	@property({type: Boolean, reflect: true}) darkMode = false;
	@query("#theme-popover") $themePopover!: PopoverElement;

	firstUpdated (props: PropertyValues) {
		super.firstUpdated(props);
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

	protected render () {
		return html`
			<nav-element id="navbar" shadow>
				<div slot="left">
					<button-element id="popover-button" fab inverted flat @click="${() => this.togglePopover()}">
						<icon-element>menu</icon-element>
					</button-element>
					<router-link id="logo-wrapper" path="/">
						<img id="logo" src="assets/logo.svg" />
						<img id="text" src="${this.darkMode ? `assets/text-light.svg` : `assets/text-dark.svg`}" />
					</router-link>
				</div>
				<div slot="right">
					<button-element id="dark-mode" @click="${() => this.toggleDarkMode()}" fab inverted flat outlined>
						${this.darkMode ? html`<icon-element>flash_off</icon-element>` : html`<icon-element>flash_on</icon-element>`}
					</button-element>
					<button-element fab id="theme-selector" @click="${() => this.openThemeSelector()}"></button-element>
					<popover-element id="theme-popover" anchor="#theme-selector" backdrop fixed transformOriginX="right" anchorOriginY="center" anchorOriginX="center">
						<popover-card-element>
							<theme-element @update="${() => this.$themePopover.hide()}"></theme-element>
						</popover-card-element>
					</popover-element>
				</div>
			</nav-element>
		`;
	}
}