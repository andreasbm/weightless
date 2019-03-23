import { debounce } from "@a11y/focus-trap/debounce";

export type IResizeSubscriber = (() => void);

export declare type ResizeCallback = (rect: DOMRect) => void | Promise<void>;

declare type ResizeObserverEntry = {
	target: Element;
	contentRect: DOMRectReadOnly;
};
declare type ResizeObserverCallback = (entries: ResizeObserverEntry[]) => void;

declare interface ResizeObserver {
	observe (target: Element): void;
	unobserve (target: Element): void;
	disconnect (): void;
}

declare type ResizeObserverConstructor = new (callback: ResizeObserverCallback) => ResizeObserver;

declare const ResizeObserver: ResizeObserverConstructor;

export interface IOnSizeChangedOptions {
	debounceMs: number;
}

/**
 * Invokes the given callback for all ResizeEntries that are triggered when the size of the target element changes.
 * @param $elem
 * @param cb
 * @param options
 */
export function onSizeChanged ($elem: Element,
                               cb: ResizeCallback,
                               {debounceMs}: Partial<IOnSizeChangedOptions> = {}): IResizeSubscriber {

	// Attach the resize observer
	const ro = new ResizeObserver(changes => {
		changes.forEach(({contentRect}) =>
			debounceMs == null ? cb(contentRect) : debounce(() => cb(contentRect), debounceMs, Math.random().toString())
		);
	});

	// Observer the element
	ro.observe($elem);

	// Return a function that can unsubscribe from the resize observer.
	return () => ro.disconnect();
}