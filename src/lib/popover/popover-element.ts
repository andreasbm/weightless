import { FocusTrap } from "@appnest/focus-trap";
import { customElement, html, property, query, TemplateResult } from "lit-element";
import "../backdrop";
import { BackdropElement } from "../backdrop/backdrop-element";
import { IOverlayBehaviorBaseProperties, IOverlayBehaviorProperties, OverlayBehavior } from "../behavior/overlay/overlay-behavior";
import { AriaRole } from "../util/aria";
import { cssResult } from "../util/css";
import { queryParentRoots, renderAttributes } from "../util/dom";
import { addClickAwayListener, addListener, EventListenerSubscription, removeListeners } from "../util/event";
import { computeAnchorPosition, computeFallbackStrategy, IAnchorPosition, IPositionStrategy, OriginX, OriginY, computeTransformOrigin, areStrategiesEqual } from "../util/position";
import { getOpacity, getScale } from "../util/style";
import styles from "./popover-element.scss";

/**
 * Base properties of the popover.
 */
export interface IPopoverElementBaseProperties extends IPositionStrategy, IOverlayBehaviorBaseProperties {
	closeOnClick: boolean;
	role: AriaRole;
	noFallback: boolean;
	anchor?: Element | string;
}

/**
 * Properties of the popover.
 */
export interface IPopoverElementProperties extends IPopoverElementBaseProperties, IOverlayBehaviorProperties {
	anchorOpenEvents?: string[];
	anchorCloseEvents?: string[];
}

/**
 * Configuration for the popover.
 */
export interface IPopoverElementConfig extends Partial<IPopoverElementBaseProperties> {
}

/**
 * Default configuration for the popover.
 */
export const defaultPopoverConfig: IPopoverElementConfig = {
	transformOriginX: OriginX.LEFT,
	transformOriginY: OriginY.TOP,
	anchorOriginX: OriginX.LEFT,
	anchorOriginY: OriginY.TOP,
	backdrop: false,
	persistent: false,
	duration: 300,
	closeOnClick: false,
	fixed: true
};

/**
 * Contextual anchored elements.
 * @slot - Default content.
 * @cssprop --popover-z-index - z-index.
 */
@customElement("popover-element")
export class PopoverElement<R = unknown> extends OverlayBehavior<R, IPopoverElementConfig> implements IPopoverElementProperties {
	static styles = [...OverlayBehavior.styles, cssResult(styles)];

	/**
	 * Makes the popover close when it is clicked upon.
	 * @attr
	 */
	@property({type: Boolean}) closeOnClick: boolean = false;

	/**
	 * Whether a fallback strategy for the positioning should be used when there are no room for the popover.
	 * @attr
	 */
	@property({type: Boolean}) noFallback: boolean = false;

	/**
	 * X origin of the transform.
	 * @attr
	 */
	@property({type: String, reflect: true}) transformOriginX: OriginX = OriginX.LEFT;

	/**
	 * Y origin of the transform.
	 * @attr
	 */
	@property({type: String, reflect: true}) transformOriginY: OriginY = OriginY.TOP;

	/**
	 * X origin of the anchored point.
	 * @attr
	 */
	@property({type: String, reflect: true}) anchorOriginX: OriginX = OriginX.LEFT;

	/**
	 * Y origin of the anchored point.
	 * @attr
	 */
	@property({type: String, reflect: true}) anchorOriginY: OriginY = OriginY.TOP;

	/**
	 * Role of the popover.
	 * @attr
	 */
	@property({type: String, reflect: true}) role: AriaRole = "menu";

	/**
	 * Anchor element or query.
	 * @attr
	 */
	@property({type: String}) anchor?: Element | string;

	/**
	 * Events on the anchor that makes the popover open itself.
	 * @attr
	 */
	@property({type: Array}) anchorOpenEvents?: string[];

	/**
	 * Events on the anchor that makes the popover close itself.
	 * @attr
	 */
	@property({type: Array}) anchorCloseEvents?: string[];

	/**
	 * Content of the popover.
	 * @attr
	 */
	@query("#content") $content: FocusTrap;

	/**
	 * Container element.
	 * @attr
	 */
	@query("#container") $container: HTMLElement;

	/**
	 * Backdrop element.
	 * @attr
	 */
	@query("#backdrop") $backdrop: BackdropElement;

	/**
	 * Listeners that reacts when the user clicks outside the popover.
	 * Attached when when opened.
	 */
	private clickAwayListeners: EventListenerSubscription[] = [];

	/**
	 * Listeners that opens the popover when event happens on the anchor.
	 */
	private anchorOpenEventListeners: EventListenerSubscription[] = [];

	/**
	 * Listeners that closes the popover when event happens on the anchor.
	 */
	private anchorCloseEventListeners: EventListenerSubscription[] = [];

	/**
	 * Position of the anchor.
	 */
	private anchorPosition?: IAnchorPosition;

	/**
	 * Focus trap.
	 */
	get $focusTrap () {
		return this.$content;
	}

	/**
	 * Hooks up the element.
	 */
	connectedCallback () {
		super.connectedCallback();
		this.updatePosition = this.updatePosition.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.show = this.show.bind(this);
		this.onContainerClick = this.onContainerClick.bind(this);
	}

	/**
	 * Tears down the component.
	 */
	disconnectedCallback () {
		super.disconnectedCallback();
		this.detachClickAwayListeners();
		removeListeners(this.anchorOpenEventListeners);
		removeListeners(this.anchorCloseEventListeners);
	}

	/**
	 * Reacts on the properties changed.
	 * @param props
	 */
	protected updated (props: Map<keyof IPopoverElementProperties, unknown>) {
		super.updated(<Map<keyof IOverlayBehaviorProperties, unknown>>props);

		// Attach auto open events to anchor
		if (props.has("anchorOpenEvents") && this.anchorOpenEvents != null) {
			this.attachEventListenersToAnchor(this.anchorOpenEventListeners, this.anchorOpenEvents, () => !this.open && this.show());
		}

		// Attach auto close events to anchor
		if (props.has("anchorCloseEvents") && this.anchorCloseEvents != null) {
			this.attachEventListenersToAnchor(this.anchorCloseEventListeners, this.anchorCloseEvents, () => this.open && this.hide());
		}
	}

	/**
	 * Shows the popover at a specified screen position.
	 * @param position
	 * @param config
	 */
	showAtPosition (position: IAnchorPosition, config?: IPopoverElementConfig): Promise<R | null> {
		this.anchorPosition = position;
		return this.show(config);
	}

	/**
	 * The current position strategy of the popover.
	 * @returns {IPositionStrategy}
	 */
	protected getPositionStrategy (): IPositionStrategy {
		return {
			transformOriginX: this.transformOriginX,
			transformOriginY: this.transformOriginY,
			anchorOriginX: this.anchorOriginX,
			anchorOriginY: this.anchorOriginY
		};
	}

	/**
	 * Adds event listeners and focuses the first element after the popover has been shown.
	 */
	protected didShow () {
		super.didShow();

		// Focus the first element
		this.$focusTrap.focusFirstElement();

		// Attach click away listeners
		this.attachClickAwayListeners();
	}

	/**
	 * Resets the component after the popover has been hidden.
	 */
	protected didHide (result?: R) {
		super.didHide(result);
		this.anchorPosition = undefined;
	}

	/**
	 * Attaches events listeners to the anchor.
	 * @param listeners
	 * @param events
	 * @param cb
	 */
	protected attachEventListenersToAnchor (listeners: EventListenerSubscription[],
	                                        events: string[],
	                                        cb: ((e: Event) => void)) {

		// Detach the previous event listeners and attach the new ones.
		removeListeners(listeners);

		// Ensure that an anchor exists
		const $anchor = this.getAnchor();
		if ($anchor == null) {
			return this.throwNoAnchorError();
		}

		// Add the listeners to the anchor
		listeners.push(
			addListener($anchor, events, cb)
		);
	}

	/**
	 * Throws an error that no anchor exists.
	 */
	protected throwNoAnchorError () {
		throw new Error(`No anchor could be found for the popover. "${this.anchor}" provided as anchor.`);
	}

	/**
	 * Attaches the click away listeners.
	 */
	protected attachClickAwayListeners () {
		this.clickAwayListeners.push(
			addClickAwayListener(this.$container, this.clickAway),
			addListener(this.$container, "click", this.onContainerClick)
		);
	}

	/**
	 * Detaches the click away listeners.
	 */
	protected detachClickAwayListeners () {
		removeListeners(this.clickAwayListeners);
	}

	/**
	 * Animates the popover in.
	 */
	protected animateIn () {

		// Callback for cleaning up the component and the animation
		let ready = false;
		const setup = () => {
			if (ready) return;
			ready = true;

			this.didShow();
		};

		// Animate the backdrop in
		const backdropAnimation = this.$backdrop.animate(<PropertyIndexedKeyframes>{
			opacity: [getOpacity(window.getComputedStyle(this.$backdrop)).toString(), `1`]
		}, this.animationConfig);

		// Animate the popover in and take the intermediate stake into account
		const contentComputedStyle = window.getComputedStyle(this.$content);
		const contentScale = getScale(contentComputedStyle, this.$content.getBoundingClientRect());
		const contentOpacity = getOpacity(contentComputedStyle);

		const contentAnimation = this.$content.animate(<PropertyIndexedKeyframes>{
			transform: [`scale(${contentScale.x}, ${contentScale.y})`, `scale(1)`],
			opacity: [`${contentOpacity > 0.5 ? contentOpacity : 0}`, 1]
		}, this.animationConfig);

		contentAnimation.onfinish = setup;
		backdropAnimation.onfinish = setup;

		this.activeInAnimations.push(contentAnimation, backdropAnimation);
		this.updatePosition();
	}

	/**
	 * Animates the popover out.
	 * @param result
	 */
	protected animateOut (result: R) {
		// Callback for cleaning up the component and the animation
		let cleaned = false;
		const cleanup = () => {
			if (cleaned) return;
			cleaned = true;

			this.resolve(result);
			this.didHide(result);
		};

		// Animate the backdrop out
		const backdropAnimation = this.$backdrop.animate(<PropertyIndexedKeyframes>{
			opacity: [getOpacity(window.getComputedStyle(this.$backdrop)).toString(), `0`]
		}, this.animationConfig);

		// Animate the content out
		const contentComputedStyle = window.getComputedStyle(this.$content);
		const contentScale = getScale(contentComputedStyle, this.$content.getBoundingClientRect());
		const contentOpacity = getOpacity(contentComputedStyle);
		const contentAnimation = this.$content.animate(<PropertyIndexedKeyframes>{
			opacity: [contentOpacity.toString(), 0],
			transform: [`scale(${contentScale.x}, ${contentScale.y})`, `scale(0)`]
		}, this.animationConfig);

		backdropAnimation.onfinish = cleanup;
		contentAnimation.onfinish = cleanup;
		this.detachClickAwayListeners();

		this.activeOutAnimations.push(backdropAnimation, contentAnimation);
	}

	/**
	 * Updates the position of the popover.
	 */
	protected updatePosition () {
		super.updatePosition();
		requestAnimationFrame(() => {

			// Compute the transform origin
			let strategy = this.getPositionStrategy();
			let isUsingFallbackStrategy = false;

			// Compute the anchor position
			const anchor = this.getAnchor();
			let position!: IAnchorPosition;

			// Always prioritize the anchor position set explicitly
			if (this.anchorPosition != null) {
				position = this.anchorPosition;

			} else if (anchor != null) {
				const anchorRect = anchor!.getBoundingClientRect();
				position = computeAnchorPosition(strategy, anchorRect);

				// Compute a fallback strategy. Will not change if there are no need for a fallback.
				if (!this.noFallback) {
					const containerRect = this.$container.getBoundingClientRect();
					const fallbackStrategy = computeFallbackStrategy(strategy, position, containerRect);

					// Check whether the fallback strategy should be used
					isUsingFallbackStrategy = areStrategiesEqual(strategy, fallbackStrategy);
					if (isUsingFallbackStrategy) {
						strategy = fallbackStrategy;
						position = computeAnchorPosition(fallbackStrategy, anchorRect);
					}
				}
			} else {
				return this.throwNoAnchorError();
			}

			const transform = computeTransformOrigin(strategy);
			this.$content.style.transformOrigin = `${strategy.transformOriginX} ${strategy.transformOriginY}`;
			Object.assign(this.$container.style, {
				"top": `${position.top}px`,
				"left": `${position.left}px`,
				"transform": `translate(${transform.x}, ${transform.y})`,
			});

			// Render the actual strategy. This is used for the arrow in the popover-card-element.
			renderAttributes(this.$container, {
				"data-fallback-strategy": isUsingFallbackStrategy,
				"anchorOriginX": strategy.anchorOriginX,
				"anchorOriginY": strategy.anchorOriginY,
				"transformOriginX": strategy.transformOriginX,
				"transformOriginY": strategy.transformOriginY,
			});
		});
	}

	/**
	 * Returns the origin of the bounding box.
	 */
	private getAnchor (): Element | undefined {
		let anchor = this.anchor;

		// Check if the anchor is an ID.
		if (typeof anchor === "string" || anchor instanceof String) {
			const matches = queryParentRoots<Element>(this, <string>anchor);
			anchor = matches.length > 0 ? matches[0] : undefined;
		}

		return anchor;
	}

	/**
	 * Handles the click event on the popover.
	 */
	private onContainerClick () {
		if (this.open && this.closeOnClick) {
			this.hide();
		}
	}

	/**
	 * Renders the content.
	 */
	protected renderContent (): TemplateResult {
		return html`<slot></slot>`;
	}

	/**
	 * Returns the template for the element.
	 */
	protected render (): TemplateResult {
		return html`
			<backdrop-element id="backdrop" @click="${this.clickAway}"></backdrop-element>
			<div id="container" aria-expanded="${this.open}">
				<focus-trap id="content" ?inactive="${!this.open || this.disableFocusTrap}">
					${this.renderContent()}
				</focus-trap>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"popover-element": PopoverElement;
	}
}
