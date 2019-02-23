import { customElement, html, LitElement, PropertyValues, query } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { DemoElement } from "../../demo/demo-element";
import { sharedStyles } from "../../style/shared";
import "../../code-example/code-example-element";
import "./../../../lib/title/title-element";
import "./../../../lib/label/label-element";

@customElement("ripple-page")
export default class RipplePage extends LitElement {

	static styles = [sharedStyles, cssResult(`
		ripple-element {
			width: 200px;
			height: 200px;
			background: white;
			display: inline-block;
			border: 1px solid lightgrey;
		}
		
		ripple-element:focus {
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
					<ripple-element></ripple-element>
					<ripple-element centered></ripple-element>
					<ripple-element unbounded></ripple-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Change animation duration</title-element>
			<demo-element>
				<code-example-element>
					<ripple-element initialDuration="300" releaseDuration="1000"></ripple-element>
					<ripple-element releaseDuration="1000"></ripple-element>
					<ripple-element autorelease></ripple-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Disabled</title-element>
			<demo-element>
				<code-example-element>
					<ripple-element disabled></ripple-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Focusable</title-element>
			<label-element>You can't click on the ripple below. Try to hit the tab key and see what happens.</label-element>
			<demo-element>
				<code-example-element>
					<ripple-element tabindex="0" focusable style="pointer-events: none;"></ripple-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Change target</title-element>
			<label-element>To change the target for the touch events you need to set the .target property on the ripple. Try to click outside the ripple and see what happens.</label-element>
			<demo-element id="demo-element">
				<ripple-element .target="${this.$demoElement}"></ripple-element>
			</demo-element>
		`;
	}
}