/**
 * Creates a range array from the min to the max number (inclusive).
 * @param min
 * @param max
 */
export function createRange(min: number, max: number): number[] {
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
 */
export function clamp(n: number, min: number, max: number): number {
	if (n < min) return min;
	if (n > max) return max;
	return n;
}

/**
 * Uses pythagoras to compute the radius of a circle.
 * @param a
 * @param b
 */
export function computeRadius(a: number, b: number) {
	return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)) / 2;
}
