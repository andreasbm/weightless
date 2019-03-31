import { customElement, html, LitElement } from "lit-element";
import { sharedStyles } from "../../../style/shared";
import "../../../../lib/title/title";
import "../../../../lib/tab/tab";
import "../../../../lib/tab-group/tab-group";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";

class Test {

}

@customElement("tabs-page")
export default class TabsPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-tab-group>
						<wl-tab>Dogs</wl-tab>
						<wl-tab>Cats</wl-tab>
					</wl-tab-group>
				</code-example-element>
			</demo-element>
			
			<wl-title>Align</wl-title>
			<demo-element>
				<code-example-element>
					<wl-tab-group align="center">
						<wl-tab>Dogs</wl-tab>
						<wl-tab>Cats</wl-tab>
					</wl-tab-group>
					<wl-tab-group align="right">
						<wl-tab>Dogs</wl-tab>
						<wl-tab>Cats</wl-tab>
					</wl-tab-group>
					<wl-tab-group align="stretch">
						<wl-tab>Dogs</wl-tab>
						<wl-tab>Cats</wl-tab>
					</wl-tab-group>
				</code-example-element>
			</demo-element>
			
			<wl-title>Scrolling</wl-title>
			<demo-element>
				<code-example-element>
					<wl-tab-group>
						<wl-tab>Dogs</wl-tab>
						<wl-tab>Cats</wl-tab>
						<wl-tab>Birds</wl-tab>
						<wl-tab>Bees</wl-tab>
						<wl-tab>Tree</wl-tab>
						<wl-tab>Tiger</wl-tab>
						<wl-tab>Lion</wl-tab>
						<wl-tab>Elephant</wl-tab>
						<wl-tab>Beetle</wl-tab>
						<wl-tab>Spider</wl-tab>
					</wl-tab-group>
				</code-example-element>
			</demo-element>
			
			<wl-title>Inverted</wl-title>
			<demo-element>
				<code-example-element>
					<wl-tab-group inverted>
						<wl-tab>Dogs</wl-tab>
						<wl-tab>Cats</wl-tab>
					</wl-tab-group>
				</code-example-element>
			</demo-element>
			
			<wl-title>Disabled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-tab-group>
						<wl-tab>Dogs</wl-tab>
						<wl-tab disabled>Cats</wl-tab>
					</wl-tab-group>
					<wl-tab-group inverted>
						<wl-tab>Dogs</wl-tab>
						<wl-tab disabled>Cats</wl-tab>
					</wl-tab-group>
				</code-example-element>
			</demo-element>
		`;
	}
}