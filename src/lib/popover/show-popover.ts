import { IOpenOverlayConfig, showOverlay } from "../behavior/overlay/show-overlay";
import { IPopoverBaseProperties, Popover } from "./popover";

export function showPopover<R> (config: IOpenOverlayConfig & Partial<IPopoverBaseProperties>) {
	return showOverlay(config, () => new Popover<R>());
}