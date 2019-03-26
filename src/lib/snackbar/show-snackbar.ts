import { IOpenOverlayConfig, showOverlay } from "../behavior/overlay/show-overlay";
import { ISnackbarBaseProperties, Snackbar } from "./snackbar";

/**
 * Shows a snackbar.
 * @param config
 */
export function showSnackbar<R> (config: IOpenOverlayConfig & Partial<ISnackbarBaseProperties>) {
	return showOverlay(config, () => new Snackbar<R>());
}