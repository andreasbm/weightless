import { customElement, html, property, query, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { ICheckboxBehaviorProperties } from "../behavior/checkbox/checkbox-behavior";
import { IRadioBehaviorProperties, RadioBehavior } from "../behavior/radio/radio-behavior";
import { WlRipple } from "../ripple/wl-ripple";
import { CUBIC_BEZIER } from "../util/constant/animation";
import { cssResult } from "../util/css";
import "../icon";
import "../ripple";

import styles from "./wl-expansion.scss";

/**
 * Properties of the expansion.
 */
export interface IExpansionProperties extends IRadioBehaviorProperties {
	duration: number;
	space: boolean;
	noRipple: boolean;
	icon?: string;
}

/**
 * Provide an expandable details-summary view.
 * @slot title - Title to the left on the header.
 * @slot description - Description to the left on the header.
 * @slot indicator - Content to the right on the header.
 * @slot - Default content.
 * @cssprop --expansion-bg - Background.
 * @cssprop --expansion-color - Color.
 * @cssprop --expansion-transition - Transition.
 * @cssprop --expansion-elevation - Box shadow.
 * @cssprop --expansion-elevation-open - Box shadow when open.
 * @cssprop --expansion-margin-open - Margin when open.
 * @cssprop --expansion-header-bg-hover - Background of the header on hover.
 * @cssprop --expansion-header-description-color - Color of the description slot.
 * @cssprop --expansion-header-padding - Padding of the header.
 * @cssprop --expansion-header-title-margin - Margin of the title slot.
 * @cssprop --expansion-header-height - Default height of the header.
 * @cssprop --expansion-header-height-open - Height of the header when opened.
 * @cssprop --expansion-header-transition - Transition of the header.
 * @cssprop --expansion-content-padding - Padding of the default slot.
 * @cssprop --expansion-icon-transition - Transition of the icon.
 */
@customElement("wl-expansion")
export class WlExpansion extends RadioBehavior implements IExpansionProperties {
	static styles = [...RadioBehavior.styles, cssResult(styles)];

	/**
	 * Opens the expansion.
	 * @attr - open
	 */
	@property({type: Boolean, reflect: true, attribute: "open"}) checked: boolean = false;

	/**
	 * Adds space beneath the expansion.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) space: boolean = false;

	/**
	 * Deactivates the ripple.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) noRipple: boolean = false;

	/**
	 * The duration of the animations.
	 * @attr
	 */
	@property({type: Number}) duration: number = 180;

	/**
	 * Aria expanded attribute.
	 * @attr - aria-expanded
	 */
	@property({type: String, reflect: true, attribute: "aria-expanded"}) ariaChecked: string = this.checked.toString();

	/**
	 * Icon name.
	 * @attr
	 */
	@property({type: String}) icon? = "expand_more";

	/**
	 * Reference to the header element.
	 */
	@query("#header") $header!: HTMLElement;

	/**
	 * Reference to the content element.
	 */
	@query("#content") $content!: HTMLElement;

	/**
	 * Reference to the content container element.
	 */
	@query("#content-container") $contentContainer!: HTMLElement;

	/**
	 * Reference to the ripple element.
	 */
	@query("#content-container") $ripple!: WlRipple;

	/**
	 * Change the event target to the header.
	 */
	protected get eventTarget (): HTMLElement {
		return this.$header;
	}

	/**
	 * Hooks up the element.
	 * @param props
	 */
	protected firstUpdated (props: Map<keyof IExpansionProperties, unknown>) {
		super.firstUpdated(<Map<keyof ICheckboxBehaviorProperties, unknown>>props);
		this.$ripple.target = this.eventTarget;
	}

	/**
	 * Responds to properties that changes and animates the element.
	 * @param props
	 */
	protected updated (props: Map<keyof IExpansionProperties, any>) {
		super.updated(props as Map<keyof ICheckboxBehaviorProperties, unknown>);

		// The initial in or out animation will be instant
		const duration = props.get("checked") == null ? 0 : this.duration;
		this.animateContent(duration).then();
	}

	/**
	 * Creates a root that delegates the focus.
	 */
	protected createRenderRoot () {
		return this.attachShadow({mode: "open", delegatesFocus: true});
	}

	/**
	 * Toggles the checked property.
	 */
	protected toggle () {
		this.checked = !this.checked;
	}

	/**
	 * Animates the content in or out.
	 * @param duration
	 */
	private async animateContent (duration: number = this.duration): Promise<void> {
		requestAnimationFrame(() => {

			// Compute the measurements for the animation
			const toHeight = this.checked ? this.$content.offsetHeight : 0;
			const bodyContainerHeight = this.$contentContainer.offsetHeight;

			// Animate the content container in or out
			this.$contentContainer.animate(<PropertyIndexedKeyframes>{
				height: [
					`${bodyContainerHeight}px`,
					`${toHeight}px`
				]
			}, {
				easing: CUBIC_BEZIER,
				fill: "both",
				duration
			}).onfinish = () => {
				this.$contentContainer.style.height = this.checked ? `auto` : `0px`;
			};
		});
	}

	/**
	 * Returns the template of the element.
	 */
	protected render (): TemplateResult {
		return html`
			<header id="header" tabindex="0"  aria-labelledby="title">
				<aside id="title">
					<slot name="title"></slot>
					<slot name="description"></slot>
				</aside>
				<aside id="indicator">
					<slot name="indicator"></slot>
					${this.icon != null ? html`<wl-icon id="icon">${this.icon}</wl-icon>` : ""}
				</aside>
				<wl-ripple id="ripple" overlay ?disabled="${this.disabled || this.noRipple}"></wl-ripple>
			</header>
			<div id="content-container" aria-hidden="${this.checked}">
				<div id="content" tabindex="${ifDefined(this.checked ? undefined : -1)}">
					<slot></slot>
				</div>
			</div>
			${this.renderFormElement()}
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"wl-expansion": WlExpansion;
	}
}
