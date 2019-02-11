import { FocusTrap } from "@appnest/focus-trap";
import { property } from "lit-element";
import "../backdrop";
import { BackdropElement } from "../backdrop/backdrop-element";
import { IOverlayBehaviorBaseProperties, IOverlayBehaviorProperties, OverlayBehavior } from "../overlay/overlay-behavior";
import { computeBoundingBox, DirectionX, DirectionY, getBoundingBoxOrigin, IBoundingBox, IBoundingBoxOrigin, IPositionStrategy, isBoundingBoxAllowed, OriginX, OriginY, positionStrategyFallback } from "../util/position";
import { getOpacity, getScale } from "../util/style";

/**
 * Base properties of the snap.
 */
export interface IMenuBehaviorBaseProperties extends IPositionStrategy, IOverlayBehaviorBaseProperties {
	closeOnClick: boolean;
}

/**
 * Properties of the snap.
 */
export interface IMenuBehaviorProperties extends IMenuBehaviorBaseProperties, IOverlayBehaviorProperties {
}

/**
 * Configuration for the menu.
 */
export interface IMenuBehaviorConfig extends Partial<IMenuBehaviorBaseProperties> {
	trigger?: Element;
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

export abstract class MenuBehavior<R> extends OverlayBehavior<R, IMenuBehaviorConfig> implements IMenuBehaviorProperties {
	@property({type: Boolean}) closeOnClick = false;
	@property({type: String}) directionX = DirectionX.RIGHT;
	@property({type: String}) directionY = DirectionY.DOWN;
	@property({type: String}) originX = OriginX.START;
	@property({type: String}) originY = OriginY.TOP;

	private trigger: Element | null = null;
	private triggerOrigin: IBoundingBoxOrigin | null = null;

	protected abstract $focusTrap: FocusTrap;
	protected abstract $container: HTMLElement;
	protected abstract $boundingBox: HTMLElement;
	protected abstract $content: HTMLElement;
	protected abstract $backdrop: BackdropElement;

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
	 * @param {number} x
	 * @param {number} y
	 * @param {IMenuBehaviorConfig} config
	 * @returns {Promise<R | null>}
	 */
	showAtPosition (x: number, y: number, config?: IMenuBehaviorConfig): Promise<R | null> {
		this.triggerOrigin = {
			left: x,
			top: y,
			right: x,
			bottom: y,
			width: 0,
			height: 0
		};

		return this.show(config);
	}

	/**
	 * Prepares the show animation by computing a bounding box origin.
	 * @param {IMenuBehaviorConfig} config
	 */
	protected prepareShowAnimation (config?: IMenuBehaviorConfig) {
		super.prepareShowAnimation(config);

		// Compute bounding box origin if necessary
		if (this.trigger != null) {
			this.triggerOrigin = getBoundingBoxOrigin(this.trigger);
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
		this.trigger = null;
		this.triggerOrigin = null;
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

			// If there are no bounding box origin, the position cannot be updated.
			if (this.triggerOrigin == null) {
				return;
			}

			// Recompute the trigger origin if a trigger was specified
			if (this.trigger != null) {
				this.triggerOrigin = getBoundingBoxOrigin(this.trigger);
			}

			// Compute the bounding box
			let boundingBox = computeBoundingBox(this.triggerOrigin, this.positionStrategy);

			// If the bounding box is not allowed we compute a new bounding box based on the fallback strategy
			if (!isBoundingBoxAllowed(boundingBox, MIN_MENU_WIDTH, MIN_MENU_HEIGHT).isAllowed) {
				const fallbackStrategy = positionStrategyFallback(this.positionStrategy, boundingBox, false, true);
				boundingBox = computeBoundingBox(this.triggerOrigin, fallbackStrategy);
			}

			this.setBoundingBox(boundingBox);
		});
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


}
