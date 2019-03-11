import { customElement, html, LitElement } from "lit-element";
import { sharedStyles } from "../../../style/shared";
import "../../../../lib/title/wl-title";
import "../../../../lib/icon/wl-icon";
import "../../../../lib/list-item/wl-list-item";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";

@customElement("list-item-page")
export default class ListItemPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-list-item>Inbox</wl-list-item>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Clickable</wl-title>
			<demo-element>
				<code-example-element>
					<wl-list-item clickable>Inbox</wl-list-item>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Active</wl-title>
			<demo-element>
				<code-example-element>
					<wl-list-item active>Inbox</wl-list-item>
					<wl-list-item active clickable>Inbox</wl-list-item>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Disabled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-list-item disabled>Inbox</wl-list-item>
					<wl-list-item disabled active>Inbox</wl-list-item>
					<wl-list-item disabled clickable>Inbox</wl-list-item>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Left & Right </wl-title>
			<demo-element>
				<code-example-element>
					<wl-list-item active>
						<wl-icon slot="before">account_circle</wl-icon>
						<span slot="after">5 days</span>
						<wl-title level="4" style="margin: 0">Brunch this wekend?</wl-title>
						<span>Ali Connors - <span>I'll be in your neighborhood this week</span></span>
					</wl-list-item>
				</code-example-element>
			</demo-element>
			
		`;
	}
}