import { customElement, html, LitElement } from "lit-element";
import { sharedStyles } from "../../style/shared";
import "./../../../lib/button/button-element";
import "./../../../lib/textfield/textfield-element";
import "./../../../lib/icon/icon-element";
import "./../../../lib/title/title-element";
import "../../code-example/code-example-element";
import "../../demo/demo-element";

@customElement("button-page")
export default class ButtonPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<button-element>Button</button-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Inverted, outlined and flat</title-element>
			<demo-element>
				<code-example-element>
					<button-element inverted>Button</button-element>
					<button-element outlined>Button</button-element>
					<button-element flat inverted>Button</button-element>
					<button-element flat inverted outlined>Button</button-element>
				</code-example-element>
			</demo-element>

			<title-element level="3">Disabled</title-element>
			<demo-element>
				<code-example-element>
					<button-element disabled>Button</button-element>
					<button-element inverted disabled>Button</button-element>
					<button-element outlined disabled>Button</button-element>
					<button-element flat inverted disabled>Button</button-element>
					<button-element flat inverted outlined disabled>Button</button-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Interacts with forms</title-element>
			<demo-element>
				<code-example-element>
					<form style="display: inline-flex; align-items: center; margin: auto;">
						<textfield-element placeholder="Required" required minlength="10" autocomplete="off"></textfield-element>
						<button-element>Button</button-element>
					</form>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Fab</title-element>
			<demo-element>
				<code-example-element>
					<button-element fab>
						<icon-element>warning</icon-element>
					</button-element>
					<button-element fab inverted>
						<icon-element>delete</icon-element>
					</button-element>
					<button-element fab outlined>
						<icon-element>done</icon-element>
					</button-element>
					<button-element fab flat inverted>
						<icon-element>info</icon-element>
					</button-element>
					<button-element fab flat inverted outlined>
						<icon-element>print</icon-element>
					</button-element>
				</code-example-element>
			</demo-element>
		`;
	}
}