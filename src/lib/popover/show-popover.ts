import { IOpenOverlayConfig, showOverlay } from "../behavior/overlay/show-overlay";
import { IPopoverBaseProperties, WlPopover } from "./wl-popover";

export function showPopover<R> (config: IOpenOverlayConfig & Partial<IPopoverBaseProperties>) {
	return showOverlay(config, () => new WlPopover<R>());
}