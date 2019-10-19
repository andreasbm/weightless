import { TemplateResult } from "lit-element";
import { render } from "lit-html";
import { addListener } from "../../util/event";
import { IOverlayBehaviorBaseProperties, OverlayBehavior, OverlayBehaviorEvent } from "./overlay-behavior";

export interface IOpenOverlayConfig {
	container: Element | ShadowRoot;
	template: DocumentFragment | HTMLTemplateElement | TemplateResult;
}

export interface IShowOverlayResult<R, C extends IOpenOverlayConfig & Partial<IOverlayBehaviorBaseProperties>, O extends OverlayBehavior<R, C>> {
	overlay: O;
	result: Promise<R | null>;
}

/**
 * Attaches the layout.
 * @param config
 * @param create
 */
export async function attachOverlay<R extends any, C extends IOpenOverlayConfig & Partial<IOverlayBehaviorBaseProperties>, O extends OverlayBehavior<R, C>> (
	config: C, create: (() => O)): Promise<O> {
	const {template, container} = config;

	// Create the overlay and attach the template to it
	const overlay = create();
	attachTemplate(template, overlay);

	// Append the overlay to the container and wait for the first render
	container.appendChild(overlay);
	await overlay.updateComplete;

	// When the overlay is closed we need to remove it
	const didHideListener = addListener(overlay, OverlayBehaviorEvent.DID_HIDE, () => {
		container.removeChild(overlay);
		didHideListener();
	});

	return overlay;
}

/**
 * Opens an overlay with a template, attaching the overlay to a container.
 * @param config
 * @param create
 */
export async function showOverlay<R extends any, C extends IOpenOverlayConfig & Partial<IOverlayBehaviorBaseProperties>, O extends OverlayBehavior<R, C>> (
	config: C, create: (() => O)): Promise<IShowOverlayResult<R, C, O>> {
	const overlay = await attachOverlay(config, create);
	const result = overlay.show(config);
	return {overlay, result};
}


/**
 * Attaches a template to a container.
 * @param template
 * @param $container
 */
function attachTemplate (template: DocumentFragment | HTMLTemplateElement | TemplateResult, $container: HTMLElement) {
	if (template != null) {
		if (template instanceof HTMLTemplateElement) {
			$container.appendChild(document.importNode(template.content, true));

		} else if (template instanceof DocumentFragment) {
			$container.appendChild(template);

		} else {
			const fragment = document.createDocumentFragment();
			render(template, fragment);
			$container.appendChild(fragment);
		}
	}
}