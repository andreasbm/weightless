import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/title/title-element";
import "../../../../lib/tooltip/tooltip-element";
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
					<tooltip-element open>This is a tooltip</tooltip-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Auto open popovers anchored to an element</title-element>
			<demo-element>
				<code-example-element headline='<tooltip-element anchor="#auto-open-button" .anchorOpenEvents="\${["mouseover"]}" .anchorCloseEvents="\${["mouseout"]}" fixed>...</tooltip-element>'>
					<button-element id="tooltip-button">Hover me!</button-element>
					<tooltip-element anchor="#tooltip-button" .anchorOpenEvents="${["mouseover"]}" .anchorCloseEvents="${["mouseout"]}" .scrollContainer="${getMainScrollContainer()}" fixed anchorOriginX="center" anchorOriginY="bottom" transformOriginX="center">
						This is a tooltip
					</tooltip-element>
				</code-example-element>
			</demo-element>
		`;
	}
}