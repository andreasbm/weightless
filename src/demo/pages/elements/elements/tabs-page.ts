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
					<wl-tab-group align="start">
						<wl-tab>Dogs</wl-tab>
						<wl-tab>Cats</wl-tab>
					</wl-tab-group>
					<wl-tab-group align="center">
						<wl-tab>Dogs</wl-tab>
						<wl-tab>Cats</wl-tab>
					</wl-tab-group>
					<wl-tab-group align="end">
						<wl-tab>Dogs</wl-tab>
						<wl-tab>Cats</wl-tab>
					</wl-tab-group>
				</code-example-element>
			</demo-element>
			
			<wl-title>Vertical</wl-title>
			<demo-element>
				<code-example-element>
					<wl-tab-group vertical align="start">
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
						<wl-tab>Trees</wl-tab>
						<wl-tab>Tigers</wl-tab>
						<wl-tab>Lions</wl-tab>
						<wl-tab>Elephants</wl-tab>
						<wl-tab>Beetles</wl-tab>
						<wl-tab>Spiders</wl-tab>
						<wl-tab>Butterfly</wl-tab>
						<wl-tab>Pigs</wl-tab>
						<wl-tab>Swans</wl-tab>
						<wl-tab>Rhinos</wl-tab>
						<wl-tab>Monkeys</wl-tab>
						<wl-tab>Alligators</wl-tab>
						<wl-tab>Hams</wl-tab>
					</wl-tab-group>
				</code-example-element>
			</demo-element>
			
			<wl-title>Filled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-tab-group filled>
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
					<wl-tab-group filled>
						<wl-tab>Dogs</wl-tab>
						<wl-tab disabled>Cats</wl-tab>
					</wl-tab-group>
				</code-example-element>
			</demo-element>
		`;
	}
}