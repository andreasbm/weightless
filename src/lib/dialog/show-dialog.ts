import { IOpenOverlayConfig, showOverlay } from "../behavior/overlay/show-overlay";
import { Dialog, IDialogBaseProperties } from "./dialog";

export function showDialog<R>(config: IOpenOverlayConfig & Partial<IDialogBaseProperties>) {
	return showOverlay(config, () => new Dialog<R>());
}
