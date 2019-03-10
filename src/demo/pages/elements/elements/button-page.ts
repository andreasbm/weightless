import { customElement, html, LitElement } from "lit-element";
import { sharedStyles } from "../../../style/shared";
import "../../../../lib/button/wl-button";
import "../../../../lib/textfield/wl-textfield";
import "../../../../lib/icon/wl-icon";
import "../../../../lib/title/wl-title";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";

@customElement("button-page")
export default class ButtonPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-button>Button</wl-button>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Inverted, outlined and flat</wl-title>
			<demo-element>
				<code-example-element>
					<wl-button inverted>Button</wl-button>
					<wl-button outlined>Button</wl-button>
					<wl-button flat inverted>Button</wl-button>
					<wl-button flat inverted outlined>Button</wl-button>
				</code-example-element>
			</demo-element>

			<wl-title level="3">Disabled</wl-title>
			<demo-element>
				<code-example-element>
					<wl-button disabled>Button</wl-button>
					<wl-button inverted disabled>Button</wl-button>
					<wl-button outlined disabled>Button</wl-button>
					<wl-button flat inverted disabled>Button</wl-button>
					<wl-button flat inverted outlined disabled>Button</wl-button>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Interacts with forms</wl-title>
			<demo-element>
				<code-example-element>
					<form style="display: inline-flex; align-items: center; margin: auto;">
						<wl-textfield placeholder="Required" required minlength="10" autocomplete="off"></wl-textfield>
						<wl-button>Button</wl-button>
					</form>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Fab</wl-title>
			<demo-element>
				<code-example-element>
					<wl-button fab>
						<wl-icon>warning</wl-icon>
					</wl-button>
					<wl-button fab inverted>
						<wl-icon>delete</wl-icon>
					</wl-button>
					<wl-button fab outlined>
						<wl-icon>done</wl-icon>
					</wl-button>
					<wl-button fab flat inverted>
						<wl-icon>info</wl-icon>
					</wl-button>
					<wl-button fab flat inverted outlined>
						<wl-icon>print</wl-icon>
					</wl-button>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">No ripple</wl-title>
			<demo-element>
				<code-example-element>
					<wl-button noripple>Button</wl-button>
				</code-example-element>
			</demo-element>
		`;
	}
}