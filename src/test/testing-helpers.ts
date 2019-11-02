/**
 * Waits for an element to be defined.
 * @param elementName
 * @returns {PromiseLike<void>}
 */
export function waitForElement(elementName: string): PromiseLike<void> {
	return window.customElements.whenDefined(elementName);
}

/**
 * Waits for multiple elements to be defined.
 * @param elementNames
 */
export function waitForElements(elementNames: string[]) {
	const promises = elementNames.map(waitForElement);
	return Promise.all(promises);
}

/**
 * Creates a container.
 * @param tag
 * @param parent
 */
export function createContainer<T extends HTMLElement>(tag: string = "div", parent: HTMLElement = document.body): T {
	const $container = document.createElement(tag);
	parent.appendChild($container);
	return $container as T;
}

/**
 * Removes a container.
 * @param $container
 */
export function removeContainer($container: HTMLElement) {
	$container.remove();
}

/**
 * Averages an array of numbers.
 * @param arr
 * @returns {number}
 */
export function average(arr: number[]): number {
	return arr.reduce((p, c) => p + c, 0) / arr.length;
}

/**
 * Returns a map with slot names mapped to assigned nodes.
 * @param shadowRoot
 */
export function assignedNodesMap(shadowRoot: ShadowRoot): { [name: string]: Node[] } {
	return Array.from(shadowRoot.querySelectorAll("slot")).reduce((acc: { [name: string]: Node[] }, $slot: HTMLSlotElement) => {
		acc[<string>$slot.name] = <Node[]>$slot.assignedNodes();
		return acc;
	}, {});
}
