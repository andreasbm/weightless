import { IOpenOverlayConfig, openOverlay } from "../behavior/overlay/open-overlay";
import { WlDialog, IDialogBaseProperties } from "./wl-dialog";

export function openDialog<R> (config: IOpenOverlayConfig & Partial<IDialogBaseProperties>) {
	return openOverlay(config, () => new WlDialog<R>());
}