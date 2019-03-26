import { IOpenOverlayConfig, showOverlay } from "../behavior/overlay/show-overlay";
import { ISnackbarBaseProperties, WlSnackbar } from "./wl-snackbar";

/**
 * Shows a snackbar.
 * @param config
 */
export function showSnackbar<R> (config: IOpenOverlayConfig & Partial<ISnackbarBaseProperties>) {
	return showOverlay(config, () => new WlSnackbar<R>());
}