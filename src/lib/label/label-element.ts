import { html } from "@polymer/lit-element";
import { customElement, LitElement, property } from "lit-element";
import { TemplateResult } from "lit-html";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { addListener, EventListenerSubscription, removeListeners } from "../util/event";
import { queryParentElement } from "../util/html";

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
	protected refireClick () {
		const $target = this.getTargetElement();
		if ($target != null) {
			$target.dispatchEvent(new MouseEvent("click", {relatedTarget: this}));
		}
	}

	/**
	 * Returns the target element.
	 */
	protected getTargetElement (): Element | null {

		// Only continue of a target was specified
		if (this.for == null || this.for.length === 0) {
			const $slotElements = this.getSlotElements();
			return $slotElements.length > 0 ? $slotElements[0] : null;
		}

		// Make sure for is an id
		const forId = this.for[0] === "#" ? this.for : `#${this.for}`;
		return queryParentElement(this, forId);

	}

	/**
	 * Creates a root that delegates the focus.
	 */
	protected createRenderRoot () {
		return this.attachShadow({mode: "open", delegatesFocus: true});
	}

	/**
	 * Returns an array of the slot elements.
	 */
	protected getSlotElements (): Element[] {
		return <Element[]>Array.from(this.shadowRoot!.querySelector("slot")!.assignedNodes())
		                       .filter(node => node.nodeName !== `#text`);
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
