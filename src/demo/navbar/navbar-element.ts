import "@appnest/web-router";
import { customElement, html, LitElement, PropertyValues, query } from "lit-element";
import "../../lib/button";
import "../../lib/icon";
import "../../lib/icon/icon-element";
import { MenuElement } from "../../lib/menu";
import "../../lib/menu";
import "../../lib/nav";
import { cssResult } from "../../lib/util/css";
import { sharedStyles } from "../style/shared";
import styles from "./navbar-element.scss";
import "./../theme/theme-element";

@customElement("navbar-element")
export class ThemeComponent extends LitElement {

	static styles = [sharedStyles, cssResult(styles)];

	@query("#theme-menu") $themeMenu!: MenuElement;

	firstUpdated (props: PropertyValues) {
		super.firstUpdated(props);
	}

	private toggleMenu () {
		window.dispatchEvent(new CustomEvent("toggleMenu"));
	}

	private openThemeSelector () {
		this.$themeMenu.show();
	}

	protected render () {
		return html`
			<nav-element id="navbar" shadow>
				<div slot="left">
					<button-element id="menu-button" fab inverted flat @click="${() => this.toggleMenu()}">
						<icon-element>menu</icon-element>
					</button-element>
					<router-link id="logo-wrapper" path="/">
						<img id="logo" src="assets/logo.svg" />
						<img id="text" src="assets/text.svg" />
					</router-link>
				</div>
				<div slot="right">
					<div id="theme-selector" @click="${() => this.openThemeSelector()}"></div>
					<menu-element id="theme-menu" target="#theme-selector" fixed backdrop closeOnClick originX="right" directionX="left">
						<theme-element></theme-element>
					</menu-element>
				</div>
			</nav-element>
		`;
	}
}