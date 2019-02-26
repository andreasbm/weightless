import { FocusTrap } from "@appnest/focus-trap";
import { customElement, html, property, query, TemplateResult } from "lit-element";
import "../backdrop";
import { BackdropElement } from "../backdrop/backdrop-element";
import { IOverlayBehaviorBaseProperties, IOverlayBehaviorProperties, OverlayBehavior } from "../behavior/overlay-behavior/overlay-behavior";
import { sharedStyles } from "../style/shared";
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
	role: string;
	noFallback: boolean;
	anchor: Element | string | null;
}

/**
 * Properties of the popover.
 */
export interface IPopoverElementProperties extends IPopoverElementBaseProperties, IOverlayBehaviorProperties {
	autoOpenEvents?: string[];
	autoCloseEvents?: string[];
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

@customElement("popover-element")
export class PopoverElement<R = unknown> extends OverlayBehavior<R, IPopoverElementConfig> implements IPopoverElementProperties {
	static styles = [sharedStyles, cssResult(styles)];

	@property({type: Boolean}) closeOnClick = false;
	@property({type: Boolean}) noFallback = false;
	@property({type: String}) transformOriginX = OriginX.LEFT;
	@property({type: String}) transformOriginY = OriginY.TOP;
	@property({type: String}) anchorOriginX = OriginX.LEFT;
	@property({type: String}) anchorOriginY = OriginY.TOP;
	@property({type: String, reflect: true}) role = "menu";
	@property({type: String}) anchor: Element | string | null = null;
	@property({type: Array}) autoOpenEvents?: string[];
	@property({type: Array}) autoCloseEvents?: string[];

	@query("#content") $content: FocusTrap;
	@query("#container") $container: HTMLElement;
	@query("#backdrop") $backdrop: BackdropElement;

	private clickAwayListeners: EventListenerSubscription[] = [];
	private autoOpenEventListeners: EventListenerSubscription[] = [];
	private autoCloseEventListeners: EventListenerSubscription[] = [];
	private anchorPosition?: IAnchorPosition;

	get $focusTrap () {
		return this.$content;
	}

	/**
	 * Hooks up the component.
	 */
	connectedCallback () {
		super.connectedCallback();
		this.updatePosition = this.updatePosition.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.show = this.show.bind(this);
		this.onContainerClick = this.onContainerClick.bind(this);
	}

	/**
	 * Reacts on the properties changed.
	 * @param props
	 */
	protected updated (props: Map<keyof IPopoverElementProperties, unknown>) {
		super.updated(<Map<keyof IOverlayBehaviorProperties, unknown>>props);

		// Attach auto open events to anchor
		if (props.has("autoOpenEvents") && this.autoOpenEvents != null) {
			this.attachEventListenersToAnchor(this.autoOpenEventListeners, this.autoOpenEvents, () => !this.open && this.show());
		}

		// Attach auto close events to anchor
		if (props.has("autoCloseEvents") && this.autoCloseEvents != null) {
			this.attachEventListenersToAnchor(this.autoCloseEventListeners, this.autoCloseEvents, () => this.open && this.hide());
		}
	}

	/**
	 * Tears down the component.
	 */
	disconnectedCallback () {
		super.disconnectedCallback();
		this.detachClickAwayListeners();
		removeListeners(this.autoOpenEventListeners);
		removeListeners(this.autoCloseEventListeners);
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
	 * Adds event listeners after the popover has been shown.
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
	 * Attaches events to the anchor.
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
		throw new Error(`No anchor could be found for the popover.`);
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

		this.currentInAnimations.push(contentAnimation, backdropAnimation);
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

		this.currentOutAnimations.push(backdropAnimation, contentAnimation);
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
	private getAnchor (): Element | null {
		let anchor = this.anchor;

		// Check if the anchor is an ID.
		if (typeof anchor === "string" || anchor instanceof String) {
			const matches = queryParentRoots<Element>(this, <string>anchor);
			anchor = matches.length > 0 ? matches[0] : null;
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
	 * Returns the template for the component.
	 */
	protected render (): TemplateResult {
		return html`
			<backdrop-element id="backdrop" @click="${this.clickAway}"></backdrop-element>
			<div id="container" ?aria-expanded="${this.open}" @clickAway="${this.clickAway}">
				<focus-trap id="content" inactive="${!this.open}">
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
