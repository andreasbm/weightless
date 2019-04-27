import { customElement, html, LitElement } from "lit-element";
import { nothing } from "lit-html";
import { repeat } from "lit-html/directives/repeat";
import "../../../lib/icon/icon";
import { ENTER } from "../../../lib/util/constant/keycode";
import { cssResult } from "../../../lib/util/css";
import { colorKey, colorValue, removeColor, setColor } from "../../../lib/util/theme";
import { sharedStyles } from "../../style/shared";
import styles from "./theme-element.scss";
import { contrastColor, hexToRGB, rgbToHSL, shadeColor } from "./theme-helpers";

const themeClass = (themeName: string) => {
	return `theme-${themeName}`;
};

const setThemeColor = (hex: string) => {
	const rgb = hexToRGB(hex);
	const contrastRgb = contrastColor(rgb);

	setColor("primary", "400", rgbToHSL(shadeColor(rgb, -10)));
	setColor("primary", "500", rgbToHSL(rgb));
	setColor("primary", "600", rgbToHSL(shadeColor(rgb, 10)));
	setColor("primary", "400", rgbToHSL(contrastRgb), {isContrast: true});
	setColor("primary", "500", rgbToHSL(contrastRgb), {isContrast: true});
	setColor("primary", "600", rgbToHSL(contrastRgb), {isContrast: true});
};

const removeCustomTheme = () => {
	removeColor("primary", "hue");
	removeColor("primary", "400");
	removeColor("primary", "500");
	removeColor("primary", "600");
	removeColor("primary", "400", {isContrast: true});
	removeColor("primary", "500", {isContrast: true});
	removeColor("primary", "600", {isContrast: true});
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
		removeCustomTheme();
		document.documentElement!.classList.remove(themeClass(this.currentThemeName));
		document.documentElement!.classList.add(themeClass(themeName));
		this.currentThemeName = themeName;
		this.requestUpdate().then();
	}

	protected dispatchUpdate () {
		this.dispatchEvent(new CustomEvent("update", {composed: true, bubbles: true}));
	}

	protected render () {
		return html`
			${repeat(this.themes, theme => html`
				<div class="theme-button theme-${theme.name}"
					 tabIndex="0"
					 @keydown="${(e: KeyboardEvent) => e.code === ENTER ? this.setTheme(theme.name) : null}"
					 style="background: ${theme.baseColor}"
					 @click="${() => {
			this.setTheme(theme.name);
			this.dispatchUpdate();
		}}">
					${theme.name === this.currentThemeName ? html`<wl-icon>check</wl-icon>` : nothing}	 
				</div>
			`)}
			<input id="custom-color-picker" type="color" value="#57FFAC" @change="${(e: Event) => {
			this.currentThemeName = "";
			setThemeColor((<HTMLInputElement>e.target).value);
			this.requestUpdate().then();
		}}" />
		`;
	}
}