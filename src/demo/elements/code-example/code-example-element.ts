import { customElement, html, LitElement, property, query } from "lit-element";
import { copyToClipboard } from "../../copy-to-clipboard";
import { HighlightElement } from "../highlight/highlight-element";
import "../highlight/highlight-element";
import "../../../lib/button";
import "../../../lib/icon";
import { ifDefined } from "lit-html/directives/if-defined";
import { cssResult } from "../../../lib/util/css";
import { openCodepen } from "../../codepen";
import styles from "code-example-element.scss";

/**
 * Highlights the initial HTML in the slot.
 */
@customElement("code-example-element")
export class CodeExampleElement extends LitElement {
	static styles = [cssResult(styles)];

	@property() lang = "html";
	@property({type: Boolean}) lineNumber = false;
	@property() headline?: string;
	@property() text?: string;
	@query("#highlighter") $highlighter: HighlightElement;

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
			html: this.$highlighter.cleanedText
		});
	}

	copyToClipboard () {
		copyToClipboard(this.$highlighter.cleanedText);
	}

	/**
	 * Renders the component.
	 */
	protected render () {
		return html`
			<div id="tools" tabindex="-1">
				<button-element inverted flat fab @click="${() => this.copyToClipboard()}">
					<icon-element>file_copy</icon-element>
				</button-element>
				<button-element inverted flat fab @click="${() => this.openCodepen()}">
					<icon-element>open_in_new</icon-element>
				</button-element>
			</div>
			<slot></slot>
			<highlight-element id="highlighter" lang="${ifDefined(this.lang)}" ?lineNumber="${this.lineNumber}" headline="${ifDefined(this.headline)}" text="${ifDefined(this.cachedSlotString)}"></highlight-element>
		`;
	}
}