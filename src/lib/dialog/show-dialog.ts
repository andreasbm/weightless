import { IOpenOverlayConfig, showOverlay } from "../behavior/overlay/show-overlay";
import { WlDialog, IDialogBaseProperties } from "./wl-dialog";

export function showDialog<R> (config: IOpenOverlayConfig & Partial<IDialogBaseProperties>) {
	return showOverlay(config, () => new WlDialog<R>());
}