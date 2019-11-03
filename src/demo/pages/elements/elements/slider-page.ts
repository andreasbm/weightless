import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/slider/slider";
import "../../../../lib/icon/icon";
import "../../../../lib/title/title";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import { cssResult } from "../../../../lib/util/css";
import { sharedStyles } from "../../../style/shared";

@customElement("slider-page")
export default class SliderPage extends LitElement {
	static styles = [
		sharedStyles,
		cssResult(`
		wl-slider:not(:last-child) {
			margin: 0 0 12px;
		}
	`)
	];

	protected render() {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-slider></wl-slider>
					<wl-slider value="20" bufferValue="80" step="10" thumbLabel></wl-slider>
				</code-example-element>
			</demo-element>

			<wl-title level="3">Before & after slots</wl-title>
			<demo-element>
				<code-example-element>
					<wl-slider thumblabel>
						<wl-icon slot="before">volume_down</wl-icon>
						<wl-icon slot="after">volume_up</wl-icon>
					</wl-slider>
				</code-example-element>
			</demo-element>

			<wl-title level="3">Outlined</wl-title>
			<demo-element>
				<code-example-element>
					<wl-slider outlined thumblabel></wl-slider>
					<wl-slider outlined label="Label"></wl-slider>
				</code-example-element>
			</demo-element>

			<wl-title level="3">Filled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-slider filled></wl-slider>
					<wl-slider filled label="Label"></wl-slider>
				</code-example-element>
			</demo-element>

			<wl-title level="3">Disabled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-slider disabled value="60"></wl-slider>
					<wl-slider disabled outlined value="20" bufferValue="40"></wl-slider>
					<wl-slider disabled filled></wl-slider>
					<wl-slider disabled label="Label"></wl-slider>
					<wl-slider disabled outlined label="Label"></wl-slider>
					<wl-slider disabled filled label="Label"></wl-slider>
				</code-example-element>
			</demo-element>
		`;
	}
}
