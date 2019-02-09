/**
 * Renders attributes to the given element based on the `attrInfo` object where
 * boolean values are added/removed as attributes.
 * @param {*} element Element on which to set attributes.
 * @param {*} attrMap Object describing attributes.
 */
export function renderAttributes (element: HTMLElement, attrMap: {[key: string]: string | boolean | number}) {
	for (const a in attrMap) {
		const v = attrMap[a] === true ? "" : attrMap[a];
		if (v || v === "" || v === 0) {
			if (element.getAttribute(a) !== v) {
				element.setAttribute(a, v.toString());
			}
		} else if (element.hasAttribute(a)) {
			element.removeAttribute(a);
		}
	}
}