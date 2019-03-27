import { property } from "lit-element";
import { AriaRole, updateTabindex } from "../../util/aria";
import { ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP } from "../../util/constant/keycode";

import { cssResult } from "../../util/css";
import { queryParentRoots } from "../../util/dom";
import { stopEvent } from "../../util/event";
import { SwitchBehavior, ISwitchBehaviorProperties } from "../switch/switch-behavior";

import styles from "./radio-behavior.scss";

export interface IRadioBehaviorProperties extends ISwitchBehaviorProperties {
}

/**
 * Radio behavior.
 */
export abstract class RadioBehavior extends SwitchBehavior implements IRadioBehaviorProperties {
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
	 * Checks and unchecks the component.
	 */
	protected toggle () {
		this.checked = true;
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
	 * Query the group.
	 */
	protected queryGroup (): RadioBehavior[] {
		if (this.name != null) {
			return queryParentRoots<RadioBehavior>(this, `${this.nodeName.toLowerCase()}[name=${this.name}]:not([disabled])`);
		}

		return [];
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
		const group = this.queryGroup();
		const currentIndex = group.indexOf(this);
		let newIndex: number | null = null;

		switch (e.code) {
			// Next
			case ARROW_RIGHT:
			case ARROW_DOWN:
				newIndex = currentIndex + 1 > group.length - 1 ? 0 : currentIndex + 1;
				break;

			// Previous
			case ARROW_LEFT:
			case ARROW_UP:
				newIndex = currentIndex - 1 < 0 ? group.length - 1 : currentIndex - 1;
				break;
		}

		// Focus on the new radio if necessary
		if (newIndex != null && group.length > 0) {
			const newCheckedRadio = group[newIndex];
			newCheckedRadio.checked = true;
			newCheckedRadio.focus();
			stopEvent(e);
		}
	}
}

