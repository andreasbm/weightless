import { attachOverlay, IOpenOverlayConfig, IShowOverlayResult, showOverlay } from "../behavior/overlay/show-overlay";
import { IAnchorPosition } from "../util/position";
import { IPopoverBaseProperties, Popover } from "./popover";

export function showPopover<R>(config: IOpenOverlayConfig & Partial<IPopoverBaseProperties>) {
	return showOverlay(config, () => new Popover<R>());
}

export async function showPopoverAtPosition<R>(
	config: IOpenOverlayConfig & Partial<IPopoverBaseProperties> & { position: IAnchorPosition }
): Promise<IShowOverlayResult<R, IOpenOverlayConfig & Partial<IPopoverBaseProperties>, Popover<R>>> {
	const { position } = config;
	const overlay = await attachOverlay(config, () => new Popover<R>());
	const result = overlay.showAtPosition(position, config);
	return { overlay, result };
}
