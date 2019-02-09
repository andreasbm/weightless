
export type EventListenerSubscription = (() => void);

/**
 * Adds an event listener (or more) to an element and returns a function to unsubscribe.
 * @param $elem
 * @param type
 * @param listener
 * @param options
 */
export function addListener ($elem: EventTarget, type: string[] | string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): (() => void) {
	const types = Array.isArray(type) ? type : [type];
	types.forEach(t => $elem.addEventListener(t, listener, options));
	return () => types.forEach(t => $elem.addEventListener(t, listener, options));
}


/**
 * Removes the event listeners in the array.
 * @param listeners
 */
export function removeListeners (listeners: EventListenerSubscription[]) {
	listeners.forEach(unsub => unsub());
}