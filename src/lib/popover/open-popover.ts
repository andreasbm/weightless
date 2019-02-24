import { IOpenOverlayConfig, openOverlay } from "../behavior/overlay-behavior/open-overlay";
import { IPopoverElementBaseProperties, PopoverElement } from "./popover-element";

export function openPopover<R> (config: IOpenOverlayConfig & Partial<IPopoverElementBaseProperties>) {
	return openOverlay(config, () => new PopoverElement<R>());
}