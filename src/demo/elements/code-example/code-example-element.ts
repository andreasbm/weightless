import { customElement, html, LitElement, property } from "lit-element";
import "../highlight/highlight-element";
import { ifDefined } from "lit-html/directives/if-defined";

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

	/**
	 * Renders the component.
	 */
	protected render () {
		return html`
			<style>
				#highlighter {
					text-align: left;
				}
			</style>
			<slot></slot>
			<highlight-element id="highlighter" lang="${ifDefined(this.lang)}" ?lineNumber="${this.lineNumber}" headline="${ifDefined(this.headline)}" text="${ifDefined(this.cachedSlotString)}"></highlight-element>
		`;
	}
}