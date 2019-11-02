import styles from "code-example-element.scss";
import { customElement, html, LitElement, property, query } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import "../../../lib/button";
import "../../../lib/icon";
import { queueSnackbar } from "../../../lib/snackbar/queue-snackbar";
import { cssResult } from "../../../lib/util/css";
import { openCodepen } from "../../codepen";
import { GOOGLE_FONT_URL, MATERIAL_ICONS_URL, UNPGK_URL } from "../../constants";
import { copyToClipboard } from "../../copy-to-clipboard";
import { HighlightElement } from "../highlight/highlight-element";
import "../highlight/highlight-element";
import "../../../lib/snackbar";

/**
 * Highlights the initial HTML in the slot.
 */
@customElement("code-example-element")
export class CodeExampleElement extends LitElement {
	static styles = [cssResult(styles)];

	@property() lang = "html";
	@property({ type: Boolean }) lineNumber = false;
	@property() headline?: string;
	@property() text?: string;
	@query("#highlighter") protected $highlighter!: HighlightElement;

	private cachedSlotString = "";

	/**
	 * Returns the HTML passed to the component as a string.
	 * @returns {string}
	 */
	get slotString() {
		return this.shadowRoot!.host.innerHTML;
	}

	connectedCallback() {
		super.connectedCallback();
		this.cachedSlotString = this.slotString;
		this.requestUpdate().then();
	}

	openCodepen() {
		openCodepen({
			html: this.$highlighter.cleanedText,
			js_external: `${UNPGK_URL}`,
			css_external: `${MATERIAL_ICONS_URL};${GOOGLE_FONT_URL}`
		});
	}

	copyToClipboard() {
		copyToClipboard(this.$highlighter.cleanedText);
		queueSnackbar({
			fixed: true,
			container: document.body,
			template: html`
				<span>The code was copied to your clipboard</span>
			`,
			hideDelay: 2000,
			backdrop: true
		}).then();
	}

	/**
	 * Renders the component.
	 */
	protected render() {
		return html`
			<div id="tools">
				<wl-button inverted flat fab @click="${() => this.copyToClipboard()}">
					<wl-icon>file_copy</wl-icon>
				</wl-button>
				<wl-button inverted flat fab @click="${() => this.openCodepen()}">
					<wl-icon>open_in_new</wl-icon>
				</wl-button>
			</div>
			<slot></slot>
			<highlight-element
				id="highlighter"
				lang="${ifDefined(this.lang)}"
				?lineNumber="${this.lineNumber}"
				headline="${ifDefined(this.headline)}"
				text="${ifDefined(this.cachedSlotString)}"
			></highlight-element>
		`;
	}
}
