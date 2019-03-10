import { IOpenOverlayConfig, openOverlay } from "../behavior/overlay/open-overlay";
import { IPopoverBaseProperties, WlPopover } from "./wl-popover";

export function openPopover<R> (config: IOpenOverlayConfig & Partial<IPopoverBaseProperties>) {
	return openOverlay(config, () => new WlPopover<R>());
}