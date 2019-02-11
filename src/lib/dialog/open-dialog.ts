import { IOpenOverlayConfig, openOverlay } from "../overlay/open-overlay";
import { IDialogBehaviorBaseProperties } from "./dialog-behavior";
import { DialogElement } from "./dialog-element";

export function openDialog<R> (config: IOpenOverlayConfig & Partial<IDialogBehaviorBaseProperties>) {
	return openOverlay(config, () => new DialogElement<R>());
}