import { ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP } from "./constant/keycode";
import { stopEvent } from "./event";

export interface IRowing<T = unknown> {
	queryGroup(): T[];
	rowToElement: (elem: T) => void;
}

/**
 * Rows to an element.
 * @param element
 * @param e
 */
export function row<T>(element: T & IRowing<T>, e: KeyboardEvent) {
	const group = element.queryGroup();
	const currentIndex = group.indexOf(element);
	const newIndex = nextIndex(group, currentIndex, e.code);

	// Focus on the new radio if necessary
	if (newIndex != null) {
		const newCheckedRadio = group[newIndex];
		element.rowToElement(newCheckedRadio);
		stopEvent(e);
	}
}

/**
 * Returns the next index based on the key code.
 * @param group
 * @param currentIndex
 * @param keyCode
 */
export function nextIndex<T>(group: T[], currentIndex: number, keyCode: string): number | null {
	// If there are no elements in the group we abort.
	if (group.length == 0) {
		return null;
	}

	switch (keyCode) {
		// Next
		case ARROW_RIGHT:
		case ARROW_DOWN:
			return currentIndex + 1 > group.length - 1 ? 0 : currentIndex + 1;

		// Previous
		case ARROW_LEFT:
		case ARROW_UP:
			return currentIndex - 1 < 0 ? group.length - 1 : currentIndex - 1;
	}

	return null;
}
