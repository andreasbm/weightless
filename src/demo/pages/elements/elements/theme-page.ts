import { customElement, html, LitElement } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import "../../../../lib/label/label";
import "../../../../lib/select/select";
import "../../../../lib/slider/slider";
import "../../../../lib/title/title";
import { cssResult } from "../../../../lib/util/css";
import { setProperty } from "../../../../lib/util/dom";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import "../../../elements/theme/theme-element";
import { sharedStyles } from "../../../style/shared";

import styles from "./theme-page.scss";

const requiredColors = ["primary", "error", "shade"];
const requiredDefaultHues = [400, 500, 600];
const requiredShadeHues = [100, 200, 300, 400, 500, 600, 700, 800];
const elevationIndicies = [1,2,3,4,5];

@customElement("theme-page")
export default class ThemePage extends LitElement {

	static styles = [sharedStyles, cssResult(styles)];

	private updateHue (name: string, e: CustomEvent) {
		const hue = (e.target as HTMLInputElement).value;
		requestAnimationFrame(() => {
			setProperty(`--${name}-hue`, hue);
		});
	}

	protected render () {
		return html`
			<br/>
			<wl-title level="3">Colors</wl-title>
			<p>It is super simple to customize the elements with a few lines of code. You can change almost everything by defining CSS variables. Let's say you want to change the primary color, then you could define <code>--primary-hue: 224;</code> in a one-liner or be more specific with <code>--primary-400: 224, 42%, 52%; --primary-500: 224, 47%, 38%; --primary-600: 224, 49%, 30%;</code>. All colors are specified in HSL (hue, saturation, lightness). You can read more about it <a href="https://chromatichq.com/blog/understanding-and-using-hsl-your-css" target="_blank">here</a>. Play with the slider below to change the hue. Hue is a degree on the color wheel from 0 to 360. 0 is red, 120 is green, 240 is blue.</p>
			<wl-slider min="0" max="360" value="224" thumbLabel @input="${(e: CustomEvent) => this.updateHue("primary", e)}"></wl-slider>
			
			<div id="colors">
				${repeat(requiredColors, color => html`
					<div id="palette">
						${repeat(color == "shade" ? requiredShadeHues : requiredDefaultHues, hue => html`
							<div class="color ${color}-${hue}" title="${color}-${hue}">
								<span nowrap class="text">${color}-${hue}</span>
							</div>
						`)}
					</div>
				`)}
			</div>
			
			<br/>
			
			<br/>
			<wl-title level="3">CSS variables</wl-title>
			<p>There are lots of different css variables you can change. Here are some examples.</p>
			<demo-element>
				<wl-select label="Serif Font" filled @change="${(e: Event) => setProperty("--font-family-serif", (<HTMLSelectElement>e.target).value)}">
					<option value="Roboto Slab" selected>Roboto Slab</option>
					<option value="courier new">Courier New</option>
					<option value="times">Times</option>
					<option value="cursive">Cursive</option>
					<option value="serif">Serif</option>
					<option value="georgia">Georgia</option>
					<option value="palatino">Palatino</option>
				</wl-select>
				<br/>
				<wl-select label="Sans Serif Font" filled @change="${(e: Event) => setProperty("--font-family-sans-serif", (<HTMLSelectElement>e.target).value)}">
					<option value="Roboto Condensed" selected>Roboto Condensed</option>
					<option value="helvetica">Helvetica</option>
					<option value="verdana">Verdana</option>
					<option value="sans-serif">Sans-serif</option>
					<option value="tahoma">Tahoma</option>
					<option value="impact">Impact</option>
					<option value="Comic Sans MS">Comic Sans MS</option>
				</wl-select>
				<br/>
				<wl-select label="Size" filled @change="${(e: Event) => document.documentElement.style.fontSize = `${16 * parseFloat((<HTMLSelectElement>e.target).value)}px`}">
					<option value="0.8">0.8x</option>
					<option value="1" selected>1x</option>
					<option value="1.2">1.2x</option>
				</wl-select>
			</demo-element>
			
			<wl-title level="3">SCSS functions</wl-title>
			<p>Weightless comes with a lot of convenient SCSS functions. If you use SCSS in your build pipeline you are recommended to use them.</p>
			<wl-title level="4">Shadows</wl-title>
			<div id="elevations">
				${repeat(elevationIndicies, i => html`
					<div class="elevation"></div>
				`)}
			</div>
		`;
	}
}