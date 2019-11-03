/**
 * Returns the matrix of an element.
 * - Good description of WebkitCSSMatrix: https://stackoverflow.com/questions/5968227/get-the-value-of-webkit-transform-of-an-element-with-jquery/5968313#5968313
 * @returns {WebKitCSSMatrix}
 * @param computedStyle
 */
import { StyleInfo } from "lit-html/directives/style-map";

export function getWebkitMatrix(computedStyle: CSSStyleDeclaration) {
	return new WebKitCSSMatrix(<string | number[]>computedStyle.webkitTransform);
}

/**
 * Returns the translate X value in PX of the element.
 * WARNING: Computes the styles.
 * @returns {number}
 * @param computedStyle
 */
export function getTranslateX(computedStyle: CSSStyleDeclaration) {
	return getWebkitMatrix(computedStyle).m41;
}

/**
 * Returns the translate Y value in PX of the element.
 * WARNING: Computes the styles.
 * @returns {number}
 * @param computedStyle
 */
export function getTranslateY(computedStyle: CSSStyleDeclaration) {
	return getWebkitMatrix(computedStyle).m42;
}

/**
 * Returns the scale of the element.
 * - If the element does not have a height or width, the scale is interpreted as 0.
 * - Give the rect of the element for measuring based on how precise it should be.
 * @param computedStyle
 * @param rect
 */
export function getScale(computedStyle: CSSStyleDeclaration, rect?: ClientRect | DOMRect): { x: number; y: number } {
	const matrix = getWebkitMatrix(computedStyle);
	return {
		x: (rect == null ? computedStyle.getPropertyValue("width") : rect.width) === 0 ? 0 : matrix.a,
		y: (rect == null ? computedStyle.getPropertyValue("height") : rect.height) === 0 ? 0 : matrix.d
	};

	// SOLUTION WITHOUT WEBKIT
	// const elemRect = elem.getBoundingClientRect();
	//
	// const scaleX = elemRect.width === 0 ? 0 : elemRect.width / elem.offsetWidth;
	// const scaleY = elemRect.height === 0 ? 0 : elemRect.height / elem.offsetHeight;
	//
	// return {x: scaleX, y: scaleY};
}

/**
 * Returns the opacity of an element. If the element is hidden, 0 is returned.
 * @param computedStyle
 */
export function getOpacity(computedStyle: CSSStyleDeclaration): number {
	if (computedStyle.getPropertyValue("width") === "0px" || computedStyle.getPropertyValue("height") === "0px") {
		return 0;
	}

	const opacityString = computedStyle.getPropertyValue("opacity");
	return isNaN(+opacityString) ? 0 : Number(opacityString);
}

/**
 * Styles that can be used to hide the form element.
 */
export const HIDDEN_STYLE_MAP: StyleInfo = {
	position: "absolute",
	top: "0",
	left: "0",
	opacity: "0",
	margin: "0",
	padding: "0",
	width: "100%",
	height: "100%",
	cursor: "inherit"
};
