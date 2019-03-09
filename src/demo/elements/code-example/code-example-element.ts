import { customElement, html, LitElement, property } from "lit-element";
import "../highlight/highlight-element";
import "../../../lib/button";
import "../../../lib/icon";
import { ifDefined } from "lit-html/directives/if-defined";
import { openCodepen } from "../../codepen";

/**
 * Highlights the initial HTML in the slot.
 */
@customElement("code-example-element")
export class CodeExampleElement extends LitElement {

	@property() lang = "html";
	@property({type: Boolean}) lineNumber = false;
	@property() headline?: string;
	@property() text?: string;

	private cachedSlotString = "";

	/**
	 * Returns the HTML passed to the component as a string.
	 * @returns {string}
	 */
	get slotString () {
		return this.shadowRoot!.host.innerHTML;
	}

	connectedCallback () {
		super.connectedCallback();
		this.cachedSlotString = this.slotString;
		this.requestUpdate().then();
	}

	openCodepen () {
		openCodepen({
			html: this.cachedSlotString
		});
	}

	/**
	 * Renders the component.
	 */
	protected render () {
		return html`
			<style>
				#highlighter {
					text-align: left;
				}
				
				:host(:hover) #open {
					opacity: 1;
				}
				
				:host {
					position: relative;
				}
				
				#open {
					opacity: 0;
					transition: 100ms ease opacity;
					position: absolute;
					top: 12px;
					right: 12px;
				}
				
			</style>
			<button-element id="open" inverted flat fab @click="${() => this.openCodepen()}">
				<icon-element>open_in_new</icon-element>
			</button-element>
			<slot></slot>
			<highlight-element id="highlighter" lang="${ifDefined(this.lang)}" ?lineNumber="${this.lineNumber}" headline="${ifDefined(this.headline)}" text="${ifDefined(this.cachedSlotString)}"></highlight-element>
		`;
	}
}