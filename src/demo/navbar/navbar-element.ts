import "@appnest/web-router";
import { customElement, html, LitElement, PropertyValues, query } from "lit-element";
import "../../lib/button";
import "../../lib/icon";
import "../../lib/card/card-element";
import "../../lib/icon/icon-element";
import "../../lib/popover-card/popover-card-element";
import { PopoverElement } from "../../lib/popover";
import "../../lib/popover";
import "../../lib/nav";
import { cssResult } from "../../lib/util/css";
import { sharedStyles } from "../style/shared";
import styles from "./navbar-element.scss";
import "./../theme/theme-element";

@customElement("navbar-element")
export class ThemeComponent extends LitElement {

	static styles = [sharedStyles, cssResult(styles)];

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
					<div id="theme-selector" @click="${() => this.openThemeSelector()}"></div>
					<popover-element id="theme-popover" anchor="#theme-selector" backdrop fixed closeOnClick transformOriginX="right" anchorOriginY="center" anchorOriginX="center">
						<popover-card-element>
							<theme-element></theme-element>
						</popover-card-element>
					</popover-element>
				</div>
			</nav-element>
		`;
	}
}