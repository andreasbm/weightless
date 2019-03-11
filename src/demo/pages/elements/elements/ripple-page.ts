import { customElement, html, LitElement, PropertyValues, query } from "lit-element";
import "../../../../lib/label/wl-label";
import "../../../../lib/title/wl-title";
import { cssResult } from "../../../../lib/util/css";
import "../../../elements/code-example/code-example-element";
import { DemoElement } from "../../../elements/demo/demo-element";
import { sharedStyles } from "../../../style/shared";

@customElement("ripple-page")
export default class RipplePage extends LitElement {

	static styles = [sharedStyles, cssResult(`
		wl-ripple {
			width: 200px;
			height: 200px;
			background: white;
			display: inline-block;
			border: 1px solid lightgrey;
		}
		
		wl-ripple:focus {
			border-color: blue;
		}
	`)];

	@query("#demo-element") $demoElement!: DemoElement;

	firstUpdated (props: PropertyValues) {
		super.firstUpdated(props);
		this.requestUpdate().then();
	}

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-ripple></wl-ripple>
					<wl-ripple centered></wl-ripple>
					<wl-ripple unbounded></wl-ripple>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Change animation duration</wl-title>
			<demo-element>
				<code-example-element>
					<wl-ripple initialDuration="200" releaseDuration="1000"></wl-ripple>
					<wl-ripple releaseDuration="1000"></wl-ripple>
					<wl-ripple autorelease></wl-ripple>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Disabled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-ripple disabled></wl-ripple>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Focusable</wl-title>
			<wl-label>You can't click on the ripple below. Try to hit the tab key and see what happens.</wl-label>
			<demo-element>
				<code-example-element>
					<wl-ripple tabindex="0" focusable style="pointer-events: none;"></wl-ripple>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Change target</wl-title>
			<wl-label>To change the target for the touch events you need to set the .target property on the ripple. Try to click outside the ripple and see what happens.</wl-label>
			<demo-element id="demo-element">
				<wl-ripple .target="${this.$demoElement}"></wl-ripple>
			</demo-element>
		`;
	}
}