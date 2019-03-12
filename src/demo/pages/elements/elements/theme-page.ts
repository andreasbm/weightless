import { customElement, html, LitElement } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import "../../../../lib/label/wl-label";
import "../../../../lib/title/wl-title";
import "../../../../lib/select/wl-select";
import { cssResult } from "../../../../lib/util/css";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import "../../../elements/theme/theme-element";
import { setProperty } from "../../../../lib/util/dom";
import { sharedStyles } from "../../../style/shared";

import styles from "./theme-page.scss";

const requiredColors = ["primary", "secondary", "error", "shade"];
const requiredDefaultHues = [400, 500, 600];
const requiredShadeHues = [200, 300, 400, 500, 600, 700];

@customElement("theme-page")
export default class ThemePage extends LitElement {

	static styles = [sharedStyles, cssResult(styles)];

	protected render () {
		return html`
			<br/>
			<wl-title level="3">Colors</wl-title>
			<p>It is super simple to customize the elements with a few lines of code. You can change almost everything by defining css variables. Let's say you want to change the primary color, then you could define <code>--primary-400: 243, 94, 132; --primary-500: 233, 30, 99; --primary-600: 204, 0, 89;</code>. Below are some colors you can play around with.</p>
			<theme-element id="theme-selector"></theme-element>
			<div id="colors">
				${repeat(requiredColors, color => html`
					<div id="palette">
						${repeat(color == "shade" ? requiredShadeHues : requiredDefaultHues, hue => html`
							<div class="color ${color}-${hue}" title="${color}-${hue}">
								<wl-label nowrap class="text">${color}-${hue}</wl-label>
							</div>
						`)}
					</div>
				`)}
			</div>
			
			<br/>
			<wl-title level="3">CSS variables</wl-title>
			<p>There are lots of different css variables you can change. Here are some examples.</p>
			<demo-element>
				<wl-select placeholder="Serif Font" filled @change="${(e: Event) => setProperty("--font-family-serif", (<HTMLSelectElement>e.target).value)}">
					<option disabled value="" selected>Select a font</option>
					<option value="courier new">Courier New</option>
					<option value="times">Times</option>
					<option value="cursive">Cursive</option>
					<option value="serif">Serif</option>
					<option value="georgia">Georgia</option>
					<option value="palatino">Palatino</option>
				</wl-select>
				<br/>
				<wl-select placeholder="Sans Serif Font" filled @change="${(e: Event) => setProperty("--font-family-sans-serif", (<HTMLSelectElement>e.target).value)}">
					<option disabled value="" selected>Select a font</option>
					<option value="helvetica">Helvetica</option>
					<option value="verdana">Verdana</option>
					<option value="sans-serif">Sans-serif</option>
					<option value="tahoma">Tahoma</option>
					<option value="impact">Impact</option>
					<option value="Comic Sans MS">Comic Sans MS</option>
				</wl-select>
				<br/>
				<wl-select placeholder="Size" filled @change="${(e: Event) => setProperty("--size-multiplier", (<HTMLSelectElement>e.target).value)}">
					<option value="0.8px">0.8x</option>
					<option value="1px" selected>1x</option>
					<option value="1.2px">1.2x</option>
				</wl-select>
			</demo-element>
		`;
	}
}