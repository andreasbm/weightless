import "@appnest/web-router";
import { customElement, html, LitElement, property, PropertyValues, query } from "lit-element";
import "../../lib/button";
import "../../lib/icon";
import "../../lib/card";
import "../../lib/popover-card/popover-card-element";
import { PopoverElement } from "../../lib/popover";
import "../../lib/popover";
import "../../lib/nav";
import { cssResult } from "../../lib/util/css";
import { setProperty } from "../../lib/util/dom";
import { sharedStyles } from "../style/shared";
import styles from "./navbar-element.scss";
import "./../theme/theme-element";

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

		setProperty("--foreground", foreground);
		setProperty("--background", background);
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
						<img id="text" src="assets/text.svg" />
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