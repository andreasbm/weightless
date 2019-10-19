import { customElement, html, LitElement, property, PropertyValues, query } from "lit-element";
import { sanitize } from "../../../lib/util/dom";

import codeStyles from "../../../../node_modules/code-prettify/loader/prettify.css";
import styles from "./highlight-element.scss";
import "../../../../node_modules/code-prettify/loader/run_prettify.js";

declare const PR: {
	prettyPrint (): void,
	prettyPrintOne (source: string, lang: string, lineNumber: boolean): string;
};

/**
 * Highlights code.
 */
@customElement("highlight-element")
export class HighlightElement extends LitElement {

	@property() lang = "";
	@property({type: Boolean}) lineNumber = false;
	@property() headline?: string;
	@property() text = "";

	@query("pre") private $pre!: HTMLElement;

	get cleanedText () {

		// Remove empty attributes (eg. disabled="") (warning: this will also remove const myVar="";)
		let text = this.text!.replace(/=""/gm, "");

		text = text.trim();

		// Find the least executive tabs. Those are the leading tabs.
		const matches = text.match(/^([\t]+)/gm) || [];
		let leastTabs = Infinity;

		for (const match of matches) {
			if (match.length < leastTabs) {
				leastTabs = match.length;
			}
		}

		// Remove the leading tabs
		if (leastTabs !== Infinity) {
			text = text.replace(new RegExp(`^[\t]{${leastTabs}}`, "gm"), "");
		}


		// Replace tabs with spaces
		return text.replace(/\t/g, "   ");
	}

	get sanitizedText () {
		return sanitize(this.cleanedText);
	}

	/**
	 * Returns a prettified HTML string of the text.
	 * @returns {string}
	 */
	get prettifiedContent () {
		return PR.prettyPrintOne(this.sanitizedText, this.lang, this.lineNumber);
	}

	/**
	 * Prettyprints to the text
	 */
	private prettyPrint () {
		if (this.$pre == null) return;
		this.$pre.innerHTML = this.prettifiedContent;
	}

	/**
	 * Updates the prettyprinted text each time the properties changes.
	 * @private
	 * @param changedProperties
	 */
	protected updated (changedProperties: PropertyValues) {
		super.updated(changedProperties);
		this.prettyPrint();
	}

	/**
	 * Returns the template for the component.
	 */
	protected render () {
		return html`
			<style>
				${codeStyles}
				${styles}
			</style>
			${this.headline != null ? html`
				<header>
					<span>${this.headline}</span>
				</header>
			` : ""}
			<pre class="${`lang-${this.lang}`}"></pre>
		`;
	}
}
