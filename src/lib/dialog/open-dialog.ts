import { IOpenOverlayConfig, openOverlay } from "../overlay/open-overlay";
import { IDialogBaseProperties } from "./dialog-behavior";
import { DialogElement } from "./dialog-element";

export function openDialog<R> (config: IOpenOverlayConfig & Partial<IDialogBaseProperties>) {
	return openOverlay(config, () => new DialogElement<R>());
}