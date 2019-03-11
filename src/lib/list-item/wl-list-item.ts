import { customElement, html, property, PropertyValues, query, TemplateResult } from "lit-element";
import { ButtonBehavior } from "../behavior/button/button-behavior";
import "../ripple";
import { WlRipple } from "../ripple/wl-ripple";
import { AriaRole, updateTabindex } from "../util/aria";
import { cssResult } from "../util/css";
import { renderAttributes } from "../util/dom";

import styles from "./wl-list-item.scss";

/**
 * Properties of the list item.
 */
export interface IListItemProperties {
	role: AriaRole;
	noRipple: boolean;
	clickable: boolean;
}

/**
 * Display an item in a list.
 * @slot before - Left content.
 * @slot - Default content.
 * @slot after - Right content.
 */
@customElement("wl-list-item")
export class WlListItem extends ButtonBehavior implements IListItemProperties {
	static styles = [...ButtonBehavior.styles, cssResult(styles)];

	/**
	 * Disables the element.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) disabled: boolean = false;

	/**
	 * Makes the element clickable.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) clickable: boolean = false;

	/**
	 * Deactivates the ripple.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) noRipple: boolean = false;

	/**
	 * Role of the list item.
	 * @attr
	 */
	@property({type: String, reflect: true}) role: AriaRole = "listitem";

	/**
	 * Ripple element.
	 */
	@query("#ripple") protected $ripple!: WlRipple;

	/**
	 * Returns the template of the element.
	 */
	protected render (): TemplateResult {
		return html`
			<slot name="before"></slot>
			<div id="content">
				<slot></slot>
			</div>
			<slot name="after"></slot>
			<wl-ripple id="ripple" overlay .target="${this}" ?disabled="${this.disabled || !this.clickable || this.noRipple}"></wl-ripple>
			${this.renderFormElement()}
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-list-item": WlListItem;
	}
}
