import { debounce } from "@a11y/focus-trap/debounce";

export type EventListenerSubscription = (() => void);

/**
 * Adds an event listener (or more) to an element and returns a function to unsubscribe.
 * @param $target
 * @param type
 * @param listener
 * @param options
 * @param debounceMs
 */
export function addListener ($target: EventTarget,
                             type: string[] | string,
                             listener: ((e?: Event) => void),
                             options?: boolean | AddEventListenerOptions,
                             debounceMs?: number): EventListenerSubscription {
	const types = Array.isArray(type) ? type : [type];

	// Create a callback that can debounce the listener
	const debounceId = Math.random().toString();
	const cb = (e: Event) => debounceMs == null ? listener(e) : debounce(() => listener(e), debounceMs, debounceId);

	// Hook up the listeners
	types.forEach(t => $target.addEventListener(t, cb, options));

	// Returns an unsubscribe function
	return () => types.forEach(t => $target.removeEventListener(t, cb, options));
}


/**
 * Removes the event listeners in the array.
 * @param listeners
 */
export function removeListeners (listeners: EventListenerSubscription[]) {
	listeners.forEach(unsub => unsub());
	listeners.length = 0;
}

/**
 * Stops an event from default behavior and propagating.
 * @param {Event} e
 */
export function stopEvent (e: Event) {
	e.preventDefault();
	e.stopPropagation();
}


/**
 * Invokes the callback when the user clicks outside the target.
 * @param $areas
 * @param listener
 */
export function addClickAwayListener ($areas: EventTarget[], listener: ((e?: Event) => void)): EventListenerSubscription {
	return addListener(window, ["mousedown", "pointerdown"], (e: Event) => {
		if (!("composedPath" in e)) return;

		// Check if the container is in the event path
		const paths: EventTarget[] = (<any>e).composedPath();
		if ($areas.find($area => paths.includes($area)) == null) {
			listener();
		}
	}, {passive: true});
}
