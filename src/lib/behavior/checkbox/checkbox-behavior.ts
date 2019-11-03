import { property, PropertyValues } from "lit-element";
import { cssResult } from "../../util/css";
import { ISwitchBehaviorProperties, SwitchBehavior } from "../switch/switch-behavior";

import styles from "./checkbox-behavior.scss";

/**
 * Properties of the checkbox behavior.
 */
export interface ICheckboxBehaviorProperties extends ISwitchBehaviorProperties {}

/**
 * Provides checkbox behavior.
 */
export abstract class CheckboxBehavior extends SwitchBehavior implements ICheckboxBehaviorProperties {
	static styles = [...SwitchBehavior.styles, cssResult(styles)];

	/**
	 * Indeterminate checkbox state.
	 * @attr
	 */
	@property({ type: Boolean, reflect: true }) indeterminate: boolean = false;

	/**
	 * Checks and unchecks the checkbox.
	 */
	protected toggle() {
		// If the checkbox is indeterminate we always remove that state first.
		if (this.indeterminate) {
			this.indeterminate = false;
		}

		this.checked = !this.checked;
		this.dispatchChangeEvent();
	}

	/**
	 * Updates the aria attributes.
	 * @param props
	 */
	protected updateAria(props: PropertyValues) {
		if (props.has("checked") || props.has("indeterminate")) {
			this.ariaChecked = this.indeterminate ? `mixed` : this.checked.toString();
		}
	}
}
