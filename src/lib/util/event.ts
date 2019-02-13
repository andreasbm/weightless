import { debounce } from "@appnest/focus-trap/debounce";

export type EventListenerSubscription = (() => void);

/**
 * Adds an event listener (or more) to an element and returns a function to unsubscribe.
 * @param $elem
 * @param type
 * @param listener
 * @param options
 * @param debounceMs
 */
export function addListener ($elem: EventTarget,
                             type: string[] | string,
                             listener: ((e?: Event) => void),
                             options?: boolean | AddEventListenerOptions,
                             debounceMs?: number): EventListenerSubscription {
	const types = Array.isArray(type) ? type : [type];

	// Create a callback that can debounce the listener
	const debounceId = Math.random().toString();
	const cb = (e: Event) => debounceMs == null ? listener(e) : debounce(() => listener(e), debounceMs, debounceId);

	// Hook up the listeners
	types.forEach(t => $elem.addEventListener(t, cb, options));

	// Returns an unsubscribe function
	return () => types.forEach(t => $elem.removeEventListener(t, cb, options));
}


/**
 * Removes the event listeners in the array.
 * @param listeners
 */
export function removeListeners (listeners: EventListenerSubscription[]) {
	listeners.forEach(unsub => unsub());
}

/**
 * Stops an event from default behavior and propagating.
 * @param {Event} e
 */
export function stopEvent (e: Event) {
	e.preventDefault();
	e.stopPropagation();
}
