import { customElement, LitElement, property, html, PropertyValues } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { addListener, EventListenerSubscription, removeListeners } from "../util/event";
import { getSlottedElements, queryParentRoots } from "../util/dom";
import { uniqueID } from "../util/unique";

import styles from "./label-element.scss";

/**
 * Properties of the label.
 */
export interface ILabelElementProperties {
	required: boolean;
	nowrap: boolean;
	for?: string;
}

/**
 * Make form elements more accessible.
 */
@customElement("label-element")
export class LabelElement extends LitElement implements ILabelElementProperties {
	static styles = [sharedStyles, cssResult(styles)];

	/**
	 * Styles the label as required.
	 */
	@property({type: Boolean}) required: boolean = false;

	/**
	 * Caps the label element with ellipsis if overflowing.
	 */
	@property({type: Boolean}) nowrap: boolean = false;

	/**
	 * Query of the form element click events are re-fired upon.
	 */
	@property({type: String}) for?: string;

	/**
	 * Event listener subscriptions.
	 */
	protected listeners: EventListenerSubscription[] = [];

	/**
	 * Hooks up the element.
	 * @param props
	 */
	firstUpdated (props: PropertyValues) {
		super.firstUpdated(props);
		this.refireClick = this.refireClick.bind(this);

		this.listeners.push(
			addListener(this, "click", this.refireClick)
		);

		this.updateAria();
	}

	/**
	 * Tears down the element.
	 */
	disconnectedCallback () {
		super.disconnectedCallback();
		removeListeners(this.listeners);
	}

	/**
	 * Returns the target element.
	 */
	getTargetElement (): Element | null {

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
	 * Updates the aria attributes.
	 */
	protected updateAria () {
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
	protected refireClick (e: MouseEvent) {
		const $target = this.getTargetElement();

		// Only refire the click if the target was not the target element to begin with
		if ($target != null && e.target !== $target) {
			$target.dispatchEvent(new MouseEvent("click", {relatedTarget: this}));
			if ($target instanceof HTMLElement) {
				$target.focus();
			}
		}
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
