
/**
 * Returns the matrix of an element.
 * - Good description of WebkitCSSMatrix: https://stackoverflow.com/questions/5968227/get-the-value-of-webkit-transform-of-an-element-with-jquery/5968313#5968313
 * @param {HTMLElement} elem
 * @returns {WebKitCSSMatrix}
 */
export function getWebkitMatrix (elem: HTMLElement) {
	const style = window.getComputedStyle(elem);
	return new WebKitCSSMatrix(<string | number[]>style.webkitTransform);
}

/**
 * Returns the translate X value in PX of the element.
 * WARNING: Computes the styles.
 * @param {HTMLElement} elem
 * @returns {number}
 */
export function getTranslateX (elem: HTMLElement) {
	return getWebkitMatrix(elem).m41;
}

/**
 * Returns the translate Y value in PX of the element.
 * WARNING: Computes the styles.
 * @param {HTMLElement} elem
 * @returns {number}
 */
export function getTranslateY (elem: HTMLElement) {
	return getWebkitMatrix(elem).m42;
}

/**
 * Returns the scale of the element.
 * - If the element does not have a height or width, the scale is interpreted as 0.
 * @param {HTMLElement} elem
 * @returns {{x: number; y: number}}
 */
export function getScale (elem: HTMLElement): {x: number, y: number} {
	const elemRect = elem.getBoundingClientRect();
	const matrix = getWebkitMatrix(elem);
	return {
		x: elemRect.width === 0 ? 0 : matrix.a,
		y: elemRect.height === 0 ? 0 : matrix.d
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
 * @param {HTMLElement} elem
 * @returns {number}
 */
export function getOpacity (elem: HTMLElement): number {
	if (elem.offsetWidth === 0 && elem.offsetHeight === 0) {
		return 0;
	}

	const style = window.getComputedStyle(elem);
	const opacityString = style.getPropertyValue("opacity");
	return isNaN(+opacityString) ? 0 : Number(opacityString);
}

