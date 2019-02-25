import { customElement, LitElement, property, html } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { addListener, EventListenerSubscription, removeListeners, stopEvent } from "../util/event";
import { getSlottedElements, queryParentRoots } from "../util/dom";

import styles from "./label-element.scss";

export interface ILabelElementProperties {
	required: boolean;
	nowrap: boolean;
	for?: string;
}

@customElement("label-element")
export class LabelElement extends LitElement implements ILabelElementProperties {
	static styles = [sharedStyles, cssResult(styles)];

	@property({type: Boolean}) required: boolean = false;
	@property({type: Boolean}) nowrap: boolean = false;
	@property({type: String}) for?: string;

	protected listeners: EventListenerSubscription[] = [];

	connectedCallback () {
		super.connectedCallback();
		this.refireClick = this.refireClick.bind(this);

		this.listeners.push(
			addListener(this, "click", this.refireClick)
		);
	}

	disconnectedCallback () {
		super.disconnectedCallback();
		removeListeners(this.listeners);
	}

	/**
	 * Refires the click event on the target.
	 */
	protected refireClick (e: MouseEvent) {
		const $target = this.getTargetElement();

		// Only refire the click if the target was not the target element to begin with
		if ($target != null && e.target !== $target) {
			$target.dispatchEvent(new MouseEvent("click", {relatedTarget: this}));
			if ($target instanceof HTMLElement) {
				$target.focus();
			}
			e.preventDefault();
		}
	}

	/**
	 * Returns the target element.
	 */
	protected getTargetElement (): Element | null {

		// Only continue of a target was specified
		if (this.for == null || this.for.length === 0) {
			const $elements = getSlottedElements(this.shadowRoot!);
			return $elements.length > 0 ? $elements[0] : null;
		}

		// Make sure for is an id
		const forId = this.for[0] === "#" ? this.for : `#${this.for}`;
		const matches = queryParentRoots<Element>(this, forId);
		return matches.length > 0 ? matches[0] : null;
	}

	/**
	 * Returns the template for the component.
	 */
	protected render (): TemplateResult {
		return html`
			<slot></slot>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"label-element": LabelElement;
	}
}
