import { customElement, html, LitElement } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import { ENTER } from "../../../lib/util/constant/keycode";
import { cssResult } from "../../../lib/util/css";
import { setColor } from "../../../lib/util/theme";
import { sharedStyles } from "../../style/shared";
import styles from "./theme-element.scss";
import "../../../lib/icon/icon-element";
import { contrastColor, hexToRGB, shadeColor } from "./theme-helpers";

const themeClass = (themeName: string) => {
	return `theme-${themeName}`;
};

const setThemeColor = (hex: string) => {
	console.log(hex);
	const rgb = hexToRGB(hex);
	const contrastRgb = contrastColor(rgb);

	setColor("primary", 400, shadeColor(rgb, 5));
	setColor("primary", 500, rgb);
	setColor("primary", 600, shadeColor(rgb, -5));

	setColor("primary", 400, contrastRgb, {isContrast: true});
	setColor("primary", 500, contrastRgb, {isContrast: true});
	setColor("primary", 600, contrastRgb, {isContrast: true});

};

interface ITheme {
	name: string,
	baseColor: string
}

@customElement("theme-element")
export class ThemeComponent extends LitElement {

	static styles = [sharedStyles, cssResult(styles)];

	currentThemeName = "royal-blue";
	themes: ITheme[] = [
		{name: "red", baseColor: "rgb(233, 30, 99)"},
		{name: "royal-blue", baseColor: "rgb(52, 77, 144)"}
	];

	connectedCallback () {
		super.connectedCallback();
		this.setTheme(this.currentThemeName);
	}

	setTheme (themeName: string) {
		document.documentElement!.classList.remove(themeClass(this.currentThemeName));
		document.documentElement!.classList.add(themeClass(themeName));
		this.currentThemeName = themeName;
		this.requestUpdate().then();
	}

	protected dispatchUpdate () {
		this.dispatchEvent(new CustomEvent("update"));
	}

	protected render () {
		return html`
			${repeat(this.themes, theme => html`
				<div class="theme-button theme-${theme.name}"
					 tabIndex="0"
					 @keydown="${(e: KeyboardEvent) => e.code === ENTER ? this.setTheme(theme.name) : null}"
					 style="background: ${theme.baseColor}"
					 @click="${() => {this.setTheme(theme.name); this.dispatchUpdate()}}">
					${theme.name === this.currentThemeName ? html`<icon-element>check</icon-element>` : ""}	 
				</div>
			`)}
			<input id="custom-color-picker" type="color" value="#57FFAC" @change="${(e: Event) => setThemeColor((<HTMLInputElement>e.target).value)}" />
		`;
	}
}