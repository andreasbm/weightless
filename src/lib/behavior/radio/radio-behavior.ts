import { property } from "lit-element";
import { AriaRole, updateTabindex } from "../../util/aria";
import { cssResult } from "../../util/css";
import { queryParentRoots } from "../../util/dom";
import { IRowing, row } from "../../util/rowing";
import { ISwitchBehaviorProperties, SwitchBehavior } from "../switch/switch-behavior";

import styles from "./radio-behavior.scss";

export interface IRadioBehaviorProperties extends ISwitchBehaviorProperties {
}

/**
 * Radio behavior.
 */
export abstract class RadioBehavior extends SwitchBehavior implements IRadioBehaviorProperties, IRowing<RadioBehavior> {
	static styles = [...SwitchBehavior.styles, cssResult(styles)];

	/**
	 * Role of the radio behavior.
	 * @attr
	 */
	@property({type: String, reflect: true}) role: AriaRole = "radio";

	/**
	 * Form element type.
	 */
	protected formElementType = "radio";

	/**
	 * Query the group.
	 */
	queryGroup (): RadioBehavior[] {
		if (this.name != null) {
			return queryParentRoots<RadioBehavior>(this, `${this.nodeName.toLowerCase()}[name=${this.name}]:not([disabled])`);
		}

		return [];
	}

	/**
	 * Checks and focuses a grouped element.
	 * @param elem
	 */
	rowToElement (elem: RadioBehavior) {
		elem.click();
		elem.focus();
	}

	/**
	 * Checks and unchecks the component.
	 */
	protected toggle () {
		this.checked = true;
		this.dispatchChangeEvent();
	}

	/**
	 * Updates the tabindex.
	 */
	protected updateTabindex (props: Map<keyof ISwitchBehaviorProperties, unknown>) {

		// Remove from tab order if disabled or if not checked and the group is checked.
		if (props.has("disabled") || props.has("checked")) {
			updateTabindex(this, this.disabled || (!this.checked && this.isGroupedChecked()));
		}

		// Uncheck the rest of the group if this one is checked.
		if (props.has("checked") && this.checked) {
			this.uncheckGroup();
		}
	}


	/**
	 * Returns whether at least one radio from the group is checked.
	 */
	protected isGroupedChecked () {
		return this.queryGroup().find(radio => radio.checked) != null;
	}

	/**
	 * Unchecks the rest of the group.
	 * Also removes the other radios from the tab order to support rowing tabindex.
	 */
	protected uncheckGroup () {
		const group = this.queryGroup();
		for (const radio of group) {
			if (radio === this) continue;
			radio.checked = false;
			radio.tabIndex = -1;
		}
	}

	/**
	 * Handles the key up event.
	 * Adds support for rowing tabindex.
	 * @param e
	 */
	protected onKeyDown (e: KeyboardEvent) {
		super.onKeyDown(e);
		row(this, e);
	}
}

