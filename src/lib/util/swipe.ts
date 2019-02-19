/**
 * Determines whether an event is a touch event.
 * @param event
 */
export function isTouchEvent (event: MouseEvent | TouchEvent): event is TouchEvent {
	return (<TouchEvent>event).changedTouches != null;
}

/**
 * Normalizes a pointer event.
 * @param e
 */
export function normalizePointerEvent (e: MouseEvent | TouchEvent): {clientX: number, clientY: number, pageX: number, pageY: number, isTouch: boolean} {
	let isTouch = false;
	let pointerEvent: Touch | MouseEvent;

	if (isTouchEvent(e)) {
		pointerEvent = e.changedTouches[0];
		isTouch = true;

	} else {
		pointerEvent = e;
	}

	let {clientX, clientY, pageX, pageY} = pointerEvent;
	return {clientX, clientY, pageX, pageY, isTouch};
}
