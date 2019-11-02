/**
 * Cancels an animation without invoking the onfinish method.
 * @param {Animation} animation
 */
export function cancelAnimation(animation: Animation) {
	animation.onfinish = null;
	animation.cancel();
}

/**
 * Pauses an animation without invoking the onfinish method.
 * @param {Animation | null} animation
 */
export function pauseAnimation(animation: Animation) {
	animation.onfinish = null;
	animation.pause();
}

/**
 * Cancels an array of animations without invoking the onfinish method.
 * @param {Animation[]} animations
 */
export function cancelAnimations(animations: Animation[]) {
	for (const animation of animations) {
		cancelAnimation(animation);
	}

	animations.length = 0;
}

/**
 * Pauses an array of animations without invoking the onfinish method.
 * @param {Animation[]} animations
 */
export function pauseAnimations(animations: Animation[]) {
	for (const animation of animations) {
		pauseAnimation(animation);
	}

	animations.length = 0;
}

/**
 * Since the values set with the fill property is more important than !important we do this hack to get around it.
 * It is not pretty, but it was the best solution I could find.
 * - https://paulbakaus.com/2017/07/27/more-important-than-important/
 * @param {HTMLElement} elem
 * @param properties
 */
export function overwriteFill(elem: HTMLElement, properties: any) {
	elem.animate([properties, properties], {
		duration: 0,
		fill: "both"
	});
}
