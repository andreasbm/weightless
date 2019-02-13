import { FocusTrap } from "@appnest/focus-trap";
import { customElement, html, property, query, TemplateResult } from "lit-element";
import "../backdrop";
import { BackdropElement } from "../backdrop/backdrop-element";
import { IOverlayBehaviorBaseProperties, IOverlayBehaviorProperties, OverlayBehavior } from "../overlay/overlay-behavior";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { queryParentRoots } from "../util/html";
import { computeBoundingBox, DirectionX, DirectionY, getBoundingBoxOrigin, getPointBoundingBox, IBoundingBox, IBoundingBoxOrigin, IPositionStrategy, isBoundingBoxAllowed, OriginX, OriginY, positionStrategyFallback } from "../util/position";
import { getOpacity, getScale } from "../util/style";
import styles from "./menu-element.scss";

/**
 * Base properties of the menu.
 */
export interface IMenuElementBaseProperties extends IPositionStrategy, IOverlayBehaviorBaseProperties {
	closeOnClick: boolean;
	role: string;
	target: Element | string | null;
}

/**
 * Properties of the menu.
 */
export interface IMenuElementProperties extends IMenuElementBaseProperties, IOverlayBehaviorProperties {
}

/**
 * Configuration for the menu.
 */
export interface IMenuBehaviorConfig extends Partial<IMenuElementBaseProperties> {
}

/**
 * Default configuration for the menu.
 */
export const defaultMenuConfig: IMenuBehaviorConfig = {
	directionX: DirectionX.RIGHT,
	directionY: DirectionY.DOWN,
	originX: OriginX.START,
	originY: OriginY.TOP,
	backdrop: true,
	persistent: false,
	duration: 300,
	closeOnClick: false,
	fixed: true
};

const MIN_MENU_HEIGHT = 200;
const MIN_MENU_WIDTH = 280;

@customElement("menu-element")
export class MenuElement<R> extends OverlayBehavior<R, IMenuBehaviorConfig> implements IMenuElementProperties {
	static styles = [sharedStyles, cssResult(styles)];

	@property({type: Boolean}) closeOnClick = false;
	@property({type: String}) directionX = DirectionX.RIGHT;
	@property({type: String}) directionY = DirectionY.DOWN;
	@property({type: String}) originX = OriginX.START;
	@property({type: String}) originY = OriginY.TOP;
	@property({type: String, reflect: true}) role = "menu";
	@property({type: String}) target: Element | string | null = null;

	private targetOrigin: IBoundingBoxOrigin | null = null;

	@query("#container") $focusTrap: FocusTrap;
	@query("#container") $container: HTMLElement;
	@query("#bounding-box") $boundingBox: HTMLElement;
	@query("#content") $content: HTMLElement;
	@query("#backdrop") $backdrop: BackdropElement;

	/**
	 * The current position strategy of the menu.
	 * @returns {IPositionStrategy}
	 */
	get positionStrategy (): IPositionStrategy {
		return {
			directionX: this.directionX,
			directionY: this.directionY,
			originX: this.originX,
			originY: this.originY
		};
	}

	/**
	 * Hooks up the component.
	 */
	connectedCallback () {
		super.connectedCallback();
		this.updatePosition = this.updatePosition.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	/**
	 * Shows the menu at a specified screen position.
	 * @param x
	 * @param y
	 * @param config
	 */
	showAtPosition (x: number, y: number, config?: IMenuBehaviorConfig): Promise<R | null> {
		this.targetOrigin = getPointBoundingBox({x, y});
		return this.show(config);
	}

	/**
	 * Prepares the show animation by computing a bounding box origin.
	 * @param {IMenuBehaviorConfig} config
	 */
	protected prepareShowAnimation (config?: IMenuBehaviorConfig) {
		super.prepareShowAnimation(config);

		// Compute bounding box origin if necessary
		if (this.target != null) {
			this.targetOrigin = this.getBoundingBoxOrigin();
		}

		this.$content.style.opacity = `0`;
	}

	/**
	 * Prepares the hide animation by removing event listeners.
	 */
	protected prepareHideAnimation () {
		super.prepareHideAnimation();
		this.$container.removeEventListener("click", this.onClick);
	}

	/**
	 * Adds event listeners after the menu has been shown.
	 */
	protected didShow () {
		super.didShow();

		// Add the end styles
		this.$content.style.opacity = null;

		// Add event listeners
		this.$container.addEventListener("click", this.onClick);

		// Focus the first element
		this.$focusTrap.focusFirstElement();
	}

	/**
	 * Resets the component after the menu has been hidden.
	 */
	protected didHide (result?: R) {
		super.didHide(result);
		this.targetOrigin = null;
	}

	/**
	 * Animates the menu in.
	 */
	protected animateIn () {
		const menuContentDelay = this.duration / 2;
		const animationConfig: KeyframeAnimationOptions = {
			...this.animationConfig,
			fill: "both"
		};

		// Callback for cleaning up the component and the animation
		let ready = false;
		const setup = () => {
			if (ready) return;
			ready = true;

			this.didShow();
		};

		// Animate the menu in and take the intermediate stake into account
		const menuScale = getScale(this.$container);
		const menuOpacity = getOpacity(this.$container);
		this.$container.animate(<Keyframe[]>[
			{
				transform: `scale(${menuScale.x}, ${menuScale.y})`,
				opacity: `${menuOpacity > 0.5 ? menuOpacity : 0}`,
				offset: 0
			},
			{
				transform: `scale(1, ${menuScale.y > 0.5 ? menuScale.y : 0.5})`,
				opacity: `${menuOpacity > 0.5 ? menuOpacity : 0.5}`,
				offset: 0.5
			},
			{transform: `scale(1, 1)`, opacity: 1, offset: 1}
		], animationConfig);

		// Animate the menu content in with a delay
		const menuAnimation = this.$content.animate(<Keyframe[]>[
			{opacity: getOpacity(this.$content).toString()},
			{opacity: 1}
		], {
			...animationConfig,
			delay: menuContentDelay
		});

		// Animate the backdrop in
		const backdropAnimation = this.$backdrop.animate(<Keyframe[]>[
			{opacity: getOpacity(this.$backdrop).toString()},
			{opacity: 1}
		], animationConfig);

		menuAnimation.onfinish = setup;

		this.currentInAnimations.push(menuAnimation, backdropAnimation);
		this.updatePosition();
	}

	/**
	 * Animates the menu out.
	 * @param {R} result
	 */
	protected animateOut (result: R) {
		const animationConfig: KeyframeAnimationOptions = {
			...this.animationConfig,
			fill: "both"
		};

		// Callback for cleaning up the component and the animation
		let cleaned = false;
		const cleanup = () => {
			if (cleaned) return;
			cleaned = true;

			this.resolve(result);
			this.didHide(result);
		};

		// Animate the backdrop out
		const backdropAnimation = this.$backdrop.animate(<Keyframe[]>[
			{opacity: getOpacity(this.$backdrop).toString()},
			{opacity: 0}
		], animationConfig);

		// Animate the menu content out
		const menuContentAnimation = this.$content.animate(<Keyframe[]>[
			{opacity: getOpacity(this.$content).toString()},
			{opacity: 0}
		], animationConfig);

		// Animate the menu out
		const menuAnimation = this.$container.animate(<Keyframe[]>[
			{opacity: getOpacity(this.$container).toString()},
			{opacity: 0}
		], animationConfig);

		backdropAnimation.onfinish = cleanup;
		menuAnimation.onfinish = cleanup;
		menuContentAnimation.onfinish = cleanup;

		this.currentOutAnimations.push(backdropAnimation, menuAnimation, menuContentAnimation);
	}

	/**
	 * Updates the position of the menu.
	 */
	protected updatePosition () {
		super.updatePosition();
		requestAnimationFrame(() => {

			// Recompute the target origin if a target was specified
			if (this.target != null) {
				this.targetOrigin = this.getBoundingBoxOrigin();
			}

			// If there are no bounding box origin, the position cannot be updated.
			if (this.targetOrigin == null) {
				return;
			}

			// Compute the bounding box
			let boundingBox = computeBoundingBox(this.targetOrigin, this.positionStrategy);

			// If the bounding box is not allowed we compute a new bounding box based on the fallback strategy
			if (!isBoundingBoxAllowed(boundingBox, MIN_MENU_WIDTH, MIN_MENU_HEIGHT).isAllowed) {
				const fallbackStrategy = positionStrategyFallback(this.positionStrategy, boundingBox, false, true);
				boundingBox = computeBoundingBox(this.targetOrigin, fallbackStrategy);
			}

			this.setBoundingBox(boundingBox);
		});
	}

	/**
	 * Returns the origin of the bounding box.
	 */
	private getBoundingBoxOrigin (): IBoundingBoxOrigin {
		let target = this.target;

		// Ensure that a target exists.
		if (target == null) {
			throw new Error(`A target needs to be defined for the menu.`);
		}

		// Check if the target is an ID.
		if (typeof target === "string" || target instanceof String) {
			target = queryParentRoots(this, <string>target);
		}

		return getBoundingBoxOrigin(<Element>target);
	}

	/**
	 * Sets the bounding box values.
	 * @param {IBoundingBox} boundingBox
	 */
	private setBoundingBox (boundingBox: IBoundingBox) {
		let {left, right, top, bottom, width, height, alignItems, justifyContent, transformOrigin} = boundingBox;

		Object.assign(this.$boundingBox.style, {
			left: left != null ? `${left}px` : null,
			right: right != null ? `${right}px` : null,
			top: top != null ? `${top}px` : null,
			bottom: bottom != null ? `${bottom}px` : null,
			width: `${width.toString()}px`,
			height: `${height.toString()}px`,
			alignItems: `flex-${alignItems}`,
			justifyContent: `flex-${justifyContent}`
		});

		this.$container.style.transformOrigin = `${transformOrigin.x} ${transformOrigin.y} 0px`;
	}

	/**
	 * Handles the click event on the menu.
	 */
	private onClick () {
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
			<div id="bounding-box">
				<focus-trap id="container" ?aria-expanded="${this.open}">
					<div id="content" inactive="${!this.open}">
						${this.renderContent()}
					</div>
				</focus-trap>
			</div>
			<backdrop-element id="backdrop" @click="${() => this.backdropClick()}"></backdrop-element>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"menu-element": MenuElement<any>;
	}
}
