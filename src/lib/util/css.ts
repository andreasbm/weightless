import { CSSResult, unsafeCSS } from "lit-element";

/**
 * Returns a string into a CSS result.
 * @param cssText
 */
export function cssResult (cssText: string): CSSResult {
	return unsafeCSS(cssText);
}