import { IOverlayBehaviorBaseProperties, OverlayBehavior } from "./overlay-behavior";
import { IOpenOverlayConfig, IShowOverlayResult } from "./show-overlay";

export interface IQueuedOverlay<R, C extends IOpenOverlayConfig & Partial<IOverlayBehaviorBaseProperties>, O extends OverlayBehavior<R, C>> {
	show: () => Promise<IShowOverlayResult<R, C, O>>;
	resolve: (result: IShowOverlayResult<R, C, O>) => void;
}

export interface IQueueConfig {
	priority: boolean;
}

/**
 * Drains the queue one by one until it is empty.
 * @param queue
 */
export async function drainQueue<R, C extends IOpenOverlayConfig & Partial<IOverlayBehaviorBaseProperties>, O extends OverlayBehavior<R, C>>(
	queue: IQueuedOverlay<R, C, O>[]
) {
	if (queue.length === 0) return;

	// Show the next overlay from the queue.
	const { show, resolve } = queue[0];
	const ref = show();
	ref.then(async ({ result }) => {
		// Wait for the overlay to resolve completely
		await result;

		// The overlay we just showed has now completed it's purpose here on earth.
		// Say thanks to it and remove it from the queue.
		queue.shift();

		// Continue draining the queue until it is empty.
		drainQueue(queue).then();
	});

	// Resolve that the overlay is now visible
	resolve(await ref);
}

/**
 * Queues an overlay.
 */
export async function queueOverlay<R, C extends IOpenOverlayConfig & Partial<IOverlayBehaviorBaseProperties>, O extends OverlayBehavior<R, C>>(
	queue: IQueuedOverlay<R, C, O>[],
	show: () => Promise<IShowOverlayResult<R, C, O>>,
	{ priority = false }: Partial<IQueueConfig> = {}
): Promise<IShowOverlayResult<R, C, O>> {
	// Defer the resolving of the overlay
	return new Promise<IShowOverlayResult<R, C, O>>(resolve => {
		const item = { show, resolve };

		// Add the overlay to the bottom of the queue if prioritized.
		priority ? queue.unshift(item) : queue.push(item);

		// Drain the queue if there are now only one item in it.
		if (queue.length === 1) {
			drainQueue(queue).then();
		}
	});
}
