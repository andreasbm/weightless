import { IQueueConfig, IQueuedOverlay, queueOverlay } from "../behavior/overlay/queue-overlay";
import { IOpenOverlayConfig } from "../behavior/overlay/show-overlay";
import { showSnackbar } from "./show-snackbar";
import { ISnackbarBaseProperties, WlSnackbar } from "./wl-snackbar";

/**
 * Snackbar queue.
 */
const queue: IQueuedOverlay<any, IOpenOverlayConfig & Partial<ISnackbarBaseProperties>, WlSnackbar>[] = [];

/**
 * Queues a snackbar.
 * @param config
 * @param queueConfig
 */
export async function queueSnackbar<R> (config: IOpenOverlayConfig & Partial<ISnackbarBaseProperties>, queueConfig: Partial<IQueueConfig> = {}) {
	return queueOverlay(queue, () => showSnackbar(config), queueConfig);
}