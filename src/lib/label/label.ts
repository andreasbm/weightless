import { customElement, LitElement, property, html, PropertyValues, TemplateResult } from "lit-element";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { addListener, EventListenerSubscription, removeListeners } from "../util/event";
import { getSlottedElements, queryParentRoots } from "../util/dom";
import { uniqueID } from "../util/unique";

import styles from "./label.scss";

/**
 * Properties of the label.
 */
export interface ILabelProperties {
	required: boolean;
	nowrap: boolean;
	for?: string;
}

/**
 * Make form elements more accessible.
 * @slot - Default content. If the first element is a form element, clicks on the entire label will be re-fired upon that element.
 * @cssprop --label-font-size - Font size
 * @cssprop --label-font-family - Font family
 * @cssprop --label-line-height - Line height
 * @cssprop --label-color - Color.
 * @cssprop --label-required-color - Color of the required astrix
 */
@customElement("wl-label")
export class Label extends LitElement implements ILabelProperties {
	static styles = [sharedStyles, cssResult(styles)];

	/**
	 * Styles the label as required.
	 * @attr
	 */
	@property({ type: Boolean }) required: boolean = false;

	/**
	 * Caps the label element with ellipsis if overflowing.
	 * @attr
	 */
	@property({ type: Boolean }) nowrap: boolean = false;

	/**
	 * Query of the form element click events are re-fired upon.
	 * @attr
	 */
	@property({ type: String }) for?: string;

	/**
	 * Event listener subscriptions.
	 */
	protected listeners: EventListenerSubscription[] = [];

	/**
	 * Hooks up the element.
	 * @param props
	 */
	firstUpdated(props: PropertyValues) {
		super.firstUpdated(props);

		this.listeners.push(addListener(this, "click", this.refireClick.bind(this)));

		this.updateAria();
	}

	/**
	 * Tears down the element.
	 */
	disconnectedCallback() {
		super.disconnectedCallback();
		removeListeners(this.listeners);
	}

	/**
	 * Returns the target element.
	 */
	getTargetElement(): Element | null {
		// Only continue of a target was specified
		if (this.for == null) {
			const $elements = getSlottedElements(this.shadowRoot!);
			return $elements.length > 0 ? $elements[0] : null;
		}

		// Make sure for is an id
		const forId = this.for[0] === "#" ? this.for : `#${this.for}`;
		const matches = queryParentRoots<Element>(this, forId);
		return matches.length > 0 ? matches[0] : null;
	}

	/**
	 * Updates the aria attributes.
	 */
	protected updateAria() {
		const $target = this.getTargetElement();
		if ($target != null) {
			// If the ID is not defined we give the label a random ID.
			if (this.id == "") {
				this.id = uniqueID();
			}

			// Tell the rest of the world that the target is labelled by this label.
			$target.setAttribute("aria-labelledby", this.id);
		}
	}

	/**
	 * Refires the click event on the target.
	 */
	protected refireClick(e: MouseEvent) {
		const $target = this.getTargetElement();

		// Only refire the click if the target was not the target element to begin with
		if ($target != null && e.target !== $target) {
			$target.dispatchEvent(new MouseEvent("click", { relatedTarget: this }));
			if ($target instanceof HTMLElement) {
				$target.focus();
			}
		}
	}

	/**
	 * Returns the template for the element.
	 */
	protected render(): TemplateResult {
		return html`
			<slot></slot>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-label": Label;
	}
}
