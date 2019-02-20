import { customElement, html } from "lit-element";
import { TemplateResult } from "lit-html";
import { IInputBehaviorProperties, InputBehavior } from "../behavior/input-behavior/input-behavior";
import { cssResult } from "../util/css";
import { removeChildren } from "../util/dom";
import { addListener } from "../util/event";
import styles from "./select-element.scss";

export interface ISelectElementProperties extends IInputBehaviorProperties {
}

@customElement("select-element")
export class SelectElement extends InputBehavior implements ISelectElementProperties {
	static styles = [...InputBehavior.styles, cssResult(styles)];

	/**
	 * Hook up the slot change event listener after first update.
	 * @param props
	 */
	firstUpdated (props: Map<keyof ISelectElementProperties, unknown>) {
		super.firstUpdated(<Map<keyof IInputBehaviorProperties, unknown>>props);
		this.updateOptions = this.updateOptions.bind(this);
		this.listeners.push(
			addListener(this.$slot, "slotchange", this.updateOptions, {passive: true})
		);

		this.updateOptions();
	}

	/**
	 * Updates the options of the select element and syncs the value.
	 * Note that it was not possible to use the slot directly in the select (eg. <select><slot></slot></select>)
	 * and that the options from the slot had to be cloned in order to not be removed from the slot.
	 */
	private updateOptions () {
		if (this.$formItem == null) return;
		const $select = <HTMLSelectElement>this.$formItem;
		const nodes = <Element[]>this.$slot.assignedNodes().filter(node => node.nodeName !== `#text`);

		// Grab the options from the slot and clone them. This prevents the nodes being removed
		// from the slot when adding it to the set of options in the select.
		const slotOptions = <HTMLOptionElement[]>nodes
			.filter(node => (node.tagName || "").toLowerCase() === "option")
			.map(node => node.cloneNode(true));
		if (slotOptions.length === 0) return;

		const valueBeforeUpdate = $select.value;

		// Remove existing options
		removeChildren($select);

		// Add the new options and find the one which is selected
		for (const node of slotOptions) {
			$select.options.add(node);
		}

		// Find the new value. If the value before was not selected, use either the
		// value set on the component or the selected value from the set of options.
		const newValue = (valueBeforeUpdate === "") ? this.value : valueBeforeUpdate;

		// Keep the select in sync
		if ($select.value !== newValue) {
			$select.value = newValue;
		}

		// Keep the value in sync and notify the listeners
		if (this.value !== newValue) {
			this.value = newValue;
		}
	}

	/**
	 * Returns the form item
	 */
	protected renderFormItem (): TemplateResult {
		return html`
			<select id="form-item"></select>
			<svg id="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 25" preserveAspectRatio="none">
				<polygon points="0,0 50,0 25,25"/>
			</svg>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"select-element": SelectElement;
	}
}
