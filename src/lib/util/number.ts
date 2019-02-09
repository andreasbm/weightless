/**
 * Creates a range array from the min to the max number (inclusive).
 * @param {number} min
 * @param {number} max
 * @returns {Array}
 */
export function createRange (min: number, max: number) {
	const range = [];
	for (let i = min; i <= max; i++) {
		range.push(i);
	}
	return range;
}

/**
 * Makes sure the value n is within the limits of min and max (not inclusive).
 * @param n
 * @param min
 * @param max
 * @returns {any}
 */
export function clamp (n: number, min: number, max: number) {
	if (n < min) return min;
	if (n > max) return max;
	return n;
}
