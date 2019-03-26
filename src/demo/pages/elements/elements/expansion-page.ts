import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/expansion/expansion";
import "../../../../lib/title/title";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import { sharedStyles } from "../../../style/shared";

@customElement("expansion-page")
export default class ExpansionPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-expansion>
						<span slot="title">Title</span>
						<span slot="description">Description</span>
						<p>Here's some content</p>
					</wl-expansion>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Groups</wl-title>
			<demo-element>
				<code-example-element>
				
					<wl-expansion name="group">
						<span slot="title">Expansion 1</span>
						<span slot="description">Description</span>
						<p>Here's some content</p>
					</wl-expansion>
					
					<wl-expansion name="group">
						<span slot="title">Expansion 2</span>
						<span slot="description">Description</span>
						<p>Here's some content</p>
					</wl-expansion>
					
					<wl-expansion name="group">
						<span slot="title">Expansion 3</span>
						<span slot="description">Description</span>
						<p>Here's some content</p>
					</wl-expansion>
					
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Disabled</wl-title>
			<demo-element>
				<code-example-element>
				
					<wl-expansion name="group" disabled>
						<span slot="title">Disabled Expansion</span>
						<span slot="description">Description</span>
						<p>Here's some content</p>
					</wl-expansion>
					
				</code-example-element>
			</demo-element>
		`;
	}
}