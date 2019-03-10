import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/title/wl-title";
import "../../../../lib/tooltip/wl-tooltip";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import { getMainScrollContainer } from "../../../main-scroll-target";
import { sharedStyles } from "../../../style/shared";

@customElement("tooltip-page")
export default class TooltipPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-tooltip open>This is a tooltip</wl-tooltip>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Auto open popovers anchored to an element</wl-title>
			<demo-element>
				<code-example-element headline='<wl-tooltip anchor="#auto-open-button" .anchorOpenEvents="\${["mouseover"]}" .anchorCloseEvents="\${["mouseout"]}" fixed>...</wl-tooltip>'>
					<wl-button id="tooltip-button">Hover me!</wl-button>
					<wl-tooltip anchor="#tooltip-button" .anchorOpenEvents="${["mouseover"]}" .anchorCloseEvents="${["mouseout"]}" .scrollContainer="${getMainScrollContainer()}" fixed anchorOriginX="center" anchorOriginY="bottom" transformOriginX="center">
						This is a tooltip
					</wl-tooltip>
				</code-example-element>
			</demo-element>
		`;
	}
}