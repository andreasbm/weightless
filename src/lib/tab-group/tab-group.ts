import { customElement, html, LitElement, property, TemplateResult } from "lit-element";
import "../divider";
import { sharedStyles } from "../style/shared";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";
import { addListener, EventListenerSubscription, removeListeners } from "../util/event";

import styles from "./tab-group.scss";

/**
 * Properties of the tab.
 */
export interface ITabGroupProperties {
	align: TabGroupAlignment;
	filled: boolean;
	vertical: boolean;
	role: AriaRole;
}

export type TabGroupAlignment = "start" | "center" | "end" | "stretch";

/**
 * Organize navigation between groups of content.
 * @slot - Default content. Add wl-tab elements here.
 * @cssprop --tab-group-color -
 * @cssprop --tab-group-bg - 
 * @cssprop --tab-group-filled-color -
 * @cssprop --tab-group-filled-bg - 
 * @cssprop --tab-group-indicator-size -
 * @cssprop --tab-group-indicator-scale - 
 * @cssprop --tab-group-indicator-bg - 
 * @cssprop --tab-group-indicator-transition - 
 */
@customElement("wl-tab-group")
export class TabGroup extends LitElement implements ITabGroupProperties {
	static styles = [cssResult(styles), sharedStyles];

	/**
	 * Alignment of the tabs.
	 * @attr
	 */
	@property({type: String, reflect: true}) align: TabGroupAlignment = "start";

	/**
	 * Adds a filled color style to the tab.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) filled: boolean = false;

	/**
	 * Makes the tabs vertical.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) vertical: boolean = false;

	/**
	 * Role of the tab.
	 * @attr
	 */
	@property({type: String, reflect: true}) role: AriaRole = "tablist";

	/**
	 * Returns the main slot element.
	 */
	get $slot (): HTMLSlotElement {
		return this.shadowRoot!.querySelector<HTMLSlotElement>("slot")!;
	}

	/**
	 * Current event listeners.
	 */
	protected listeners: EventListenerSubscription[] = [];

	/**
	 * Hooks up the element.
	 */
	connectedCallback () {
		super.connectedCallback();
		this.listeners.push(addListener(this, "change", this.updateIndicator.bind(this)));
	}

	/**
	 * Removes listeners.
	 */
	disconnectedCallback () {
		super.disconnectedCallback();
		removeListeners(this.listeners);
	}

	/**
	 * Updates the position and size of the indicator.
	 */
	protected updateIndicator () {

		// Grab the nodes from the slot
		const nodes = Array.from(this.$slot.assignedNodes()
		                             .filter(node => node.nodeType === 1)) as any as HTMLElement[];

		// Find the current checked node
		let checkedNode: HTMLElement | null = null;
		for (const node of nodes) {
			if (node.hasAttribute("checked")) {
				checkedNode = node;
				break;
			}
		}

		// Compute the size and offset of the indicator
		const checkedIndex = checkedNode == null ? -1 : nodes.indexOf(checkedNode);
		const checkedNodeSize = checkedNode == null ? 0 : this.getNodeSize(checkedNode);
		const indicatorOffset = nodes
			.filter(node => nodes.indexOf(node) < checkedIndex)
			.map(this.getNodeSize.bind(this))
			.reduce((acc: number, width: number) => acc + width, 0);

		// Set the CSS variables that moves the indicator
		this.style.setProperty("--_indicator-offset", `${indicatorOffset}px`);
		this.style.setProperty("--_indicator-size", `${checkedNodeSize}px`);
	}

	/**
	 * Returns the size of the node depending on whether the tab group is vertical or horizontal.
	 * @param $node
	 */
	private getNodeSize ($node: HTMLElement) {
		return this.vertical ? $node.offsetHeight : $node.offsetWidth;
	}

	/**
	 * Returns the template of the element.
	 */
	protected render (): TemplateResult {
		return html`
			<div id="tabs-container">
				<div id="tabs">
					<slot @slotchange="${this.updateIndicator}"></slot>
					<div id="indicator"></div>
				</div>
			</div>
			<wl-divider id="divider" ?vertical="${this.vertical}"></wl-divider>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-tab-group": TabGroup;
	}
}
