import { customElement, html, property, query, TemplateResult } from "lit-element";
import { nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";
import { IRadioBehaviorProperties, RadioBehavior } from "../behavior/radio/radio-behavior";
import { ISwitchBehaviorProperties } from "../behavior/switch/switch-behavior";
import "../icon";
import "../ripple";
import { Ripple } from "../ripple/ripple";
import { CUBIC_BEZIER } from "../util/constant/animation";
import { cssResult } from "../util/css";
import { addListener } from "../util/event";

import styles from "./expansion.scss";

/**
 * Properties of the expansion.
 */
export interface IExpansionProperties extends IRadioBehaviorProperties {
	duration: number;
	noRipple: boolean;
	icon?: string;
}

/**
 * Duration of the expansion in and out animation.
 */
const EXPANSION_ANIMATION_DURATION = 250;

/**
 * Provide an expandable details-summary view.
 * @slot title - Title to the left on the header.
 * @slot description - Description to the left on the header.
 * @slot indicator - Content to the right on the header.
 * @slot - Default content.
 * @cssprop --expansion-transition - Transition
 * @cssprop --expansion-elevation - Box shadow
 * @cssprop --expansion-elevation-open - Box shadow when open
 * @cssprop --expansion-margin-open - Margin when open
 * @cssprop --expansion-bg - Default background
 * @cssprop --expansion-color - Default color
 * @cssprop --expansion-header-bg-hover - Background of the header when :hover
 * @cssprop --expansion-header-description-color - Color of the description slot in the header
 * @cssprop --expansion-header-padding - Padding of the header
 * @cssprop --expansion-header-title-margin - Margin of the title slot in the header
 * @cssprop --expansion-header-height - Height of the header
 * @cssprop --expansion-header-height-open - Height of the header when open
 * @cssprop --expansion-header-transition - Transition of the header
 * @cssprop --expansion-content-padding - Padding of the content
 * @cssprop --expansion-icon-transition - Transition of the icon
 */
@customElement("wl-expansion")
export class Expansion extends RadioBehavior implements IExpansionProperties {
	static styles = [...RadioBehavior.styles, cssResult(styles)];

	/**
	 * Opens the expansion.
	 * @attr - open
	 */
	@property({type: Boolean, reflect: true, attribute: "open"}) checked: boolean = false;

	/**
	 * Deactivates the ripple.
	 * @attr
	 */
	@property({type: Boolean, reflect: true}) noRipple: boolean = false;

	/**
	 * The duration of the animations.
	 * @attr
	 */
	@property({type: Number}) duration: number = EXPANSION_ANIMATION_DURATION;

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
	@query("#header") protected $header!: HTMLElement;

	/**
	 * Reference to the content element.
	 */
	@query("#content") protected $content!: HTMLElement;

	/**
	 * Reference to the content container element.
	 */
	@query("#content-container") protected $contentContainer!: HTMLElement;

	/**
	 * Reference to the ripple element.
	 */
	@query("#content-container") protected $ripple!: Ripple;

	/**
	 * Hooks up the element.
	 * @param props
	 */
	protected firstUpdated (props: Map<keyof IExpansionProperties, unknown>) {
		super.firstUpdated(<Map<keyof ISwitchBehaviorProperties, unknown>>props);

		// Make sure only the ripple animation happens on the header.
		this.$ripple.target = this;

		// Stop the click event from propagating when clicking on the content container.
		this.listeners.push(
			addListener(this.$contentContainer, "click", this.onContentContainerClick.bind(this))
		);
		// Animating here causes content to jump closed on first render, so skip it.
		this.$contentContainer.style.height = this.checked ? `auto` : `0px`;
	}

	/**
	 * Responds to properties that changes and animates the element.
	 * @param props
	 */
	protected updated (props: Map<keyof IExpansionProperties, any>) {
		super.updated(props as Map<keyof ISwitchBehaviorProperties, unknown>);

		// Either animate the content in or out when the checked property changes
		if (props.get("checked") != null) {
			this.animateContent(this.duration).then();
		}
	}

	/**
	 * Handles the click on the content container by stopping the event from propagating.
	 * This ensures that clicks on the body doesn't close the expansion.
	 * It is required because we can't delegate focus to the header which would be the optimal soluation.
	 * @param e
	 */
	protected onContentContainerClick (e: MouseEvent) {
		e.stopPropagation();
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
			<header id="header" aria-labelledby="title">
				<div id="title">
					<slot name="title"></slot>
					<slot name="description"></slot>
				</div>
				<div id="indicator">
					<slot name="indicator"></slot>
					${this.icon != null ? html`<wl-icon id="icon">${this.icon}</wl-icon>` : nothing}
				</div>
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
		"wl-expansion": Expansion;
	}
}
