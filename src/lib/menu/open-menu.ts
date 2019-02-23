import { IOpenOverlayConfig, openOverlay } from "../behavior/overlay-behavior/open-overlay";
import { IMenuElementBaseProperties, MenuElement } from "./menu-element";

export function openMenu<R> (config: IOpenOverlayConfig & Partial<IMenuElementBaseProperties>) {
	return openOverlay(config, () => new MenuElement<R>());
}