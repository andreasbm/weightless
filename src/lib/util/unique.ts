/**
 * Returns a unique ID.
 * @param {number} length
 * @returns {string}
 */
export function uniqueID (length: number = 10) {
	return `_${Math.random().toString(36).substr(2, length)}`;
}
