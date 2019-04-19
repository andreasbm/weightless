import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/text/text";
import "../../../../lib/title/title";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import { sharedStyles } from "../../../style/shared";

@customElement("text-page")
export default class ButtonPage extends LitElement {

	static styles = [sharedStyles];

	protected render () {
		return html`
			<demo-element default style="text-align: left;">
				<code-example-element>
					<wl-text>Bacon ipsum dolor amet pork chop brisket ground round ham sausage pig. Shoulder drumstick jerky andouille kevin boudin doner venison salami tongue biltong prosciutto turkey tri-tip rump. Pork belly alcatra shank, ball tip jerky tail pork flank. Pork spare ribs tongue flank, shoulder sausage pig shank kevin hamburger bresaola meatloaf capicola. Beef ribs kielbasa pig strip steak ham hock. Turkey cow fatback rump meatloaf. Biltong shank boudin chicken ham shankle strip steak.</wl-text>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Large text</wl-title>
			<demo-element style="text-align: left;">
				<code-example-element>
					<wl-text size="large">Pig cow kielbasa pastrami. Drumstick pastrami prosciutto beef ribs cow shank, capicola ham turkey. Ham hock alcatra drumstick rump pork belly. Ham hock strip steak hamburger, cupim picanha frankfurter tail pork pastrami tenderloin swine. Capicola ham frankfurter, chicken beef shoulder ball tip sirloin pork belly ground round prosciutto pork loin t-bone doner. Frankfurter bacon cow jowl shank.</wl-text>
				</code-example-element>
			</demo-element>
		`;
	}
}