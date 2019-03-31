import { customElement, html, LitElement, property, TemplateResult } from "lit-element";
import { sharedStyles } from "../style/shared";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";

import styles from "./tab-group.scss";

/**
 * Properties of the tab.
 */
export interface ITabGroupProperties {
	align: TabGroupAlignment;
	inverted: boolean;
	role: AriaRole;
}

export type TabGroupAlignment = "left" | "center" | "right" | "stretch";

/**
 * Organize navigation between groups of content.
 */
@customElement("wl-tab-group")
export class TabGroup extends LitElement implements ITabGroupProperties {
	static styles = [cssResult(styles), sharedStyles];

	/**
	 * Alignment of the tabs.
	 * @attr
	 */
	@property({type: String, reflect: true}) align: TabGroupAlignment = "left";

	/**
	 * Inverts the colors of the tabs.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) inverted: boolean = false;

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

	connectedCallback () {
		super.connectedCallback();
		this.addEventListener("change", e => {
			this.updateIndicator();
		});
	}

	protected updateIndicator () {
		const nodes = Array.from(this.$slot.assignedNodes()
		                             .filter(node => node.nodeType === 1)) as any as HTMLElement[];

		let selectedNode: HTMLElement | null = null;
		for (const node of nodes) {
			if (node.hasAttribute("checked")) {
				selectedNode = node;
				break;
			}
		}

		const selectedIndex = selectedNode == null ? -1 : nodes.indexOf(selectedNode);
		const selectedNodeWidth = selectedNode == null ? 0 : selectedNode.offsetWidth;
		const indicatorOffset = nodes
			.filter(node => nodes.indexOf(node) < selectedIndex)
			.map(node => node.offsetWidth)
			.reduce((acc: number, width: number) => acc + width, 0);

		this.style.setProperty("--_indicator-offset", `${indicatorOffset}px`);
		this.style.setProperty("--_indicator-width", `${selectedNodeWidth}px`);
	}

	/**
	 * Returns the template of the element.
	 */
	protected render (): TemplateResult {
		return html`
			<div id="tabs">
				<slot @slotchange="${this.updateIndicator}"></slot>
				<div id="indicator"></div>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-tab-group": TabGroup;
	}
}
