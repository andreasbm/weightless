/**
 * Direction on the X axis.
 */
export enum DirectionX {
	RIGHT = "right",
	LEFT = "left"
}

/**
 * Direction on the Y axis.
 */
export enum DirectionY {
	UP = "up",
	DOWN = "down"
}

/**
 * Origin on the X axis.
 */
export enum OriginX {
	START = "start",
	CENTER = "center",
	END = "end"
}

/**
 * Origin on the Y axis.
 */
export enum OriginY {
	TOP = "top",
	CENTER = "center",
	BOTTOM = "bottom"
}

/**
 * A strategy for how to position an element.
 * I combines a direction and an origin for the X and Y axis.
 */
export interface IPositionStrategy {
	directionX: DirectionX;
	directionY: DirectionY;
	originX: OriginX,
	originY: OriginY
}

/**
 * The possible flex values of the bounding box.
 */
export declare type BoundingBoxFlex = "start" | "center" | "end";

/**
 * The transform origin of the bounding box.
 */
export interface IBoundingBoxTransformOrigin {
	x: string;
	y: string;
}

/**
 * The position of an origin.
 */
export interface IBoundingBoxOrigin {
	top: number;
	left: number;
	right: number;
	bottom: number;
	width: number;
	height: number;
}

/**
 * A bounding box.
 */
export interface IBoundingBox {
	left?: number;
	right?: number;
	top?: number;
	bottom?: number;
	width: number | string;
	height: number | string;
	alignItems: BoundingBoxFlex;
	justifyContent: BoundingBoxFlex;
	transformOrigin: IBoundingBoxTransformOrigin;
}

/**
 * Computes the transform origin based on the strategy.
 * @param {IPositionStrategy} strategy
 * @returns {IBoundingBoxTransformOrigin}
 */
export function computeTransformOrigin (strategy: IPositionStrategy): IBoundingBoxTransformOrigin {
	return {
		x: `${strategy.directionX === DirectionX.RIGHT ? "left" : (strategy.directionX === DirectionX.LEFT ? "right" : "center")}`,
		y: `${strategy.directionY === DirectionY.DOWN ? "top" : (strategy.directionY === DirectionY.UP ? "bottom" : "center")}`
	};
}

/**
 * Computes a bounding box based on an origin element and a position strategy.
 * @param {Element} elem
 * @param {IPositionStrategy} strategy
 * @returns {IBoundingBox}
 */
export function computeBoundingBoxFromElement (elem: Element, strategy: IPositionStrategy): IBoundingBox {
	return computeBoundingBox(getBoundingBoxOrigin(elem), strategy);
}

/**
 * Returns the bounding box origin of an element.
 * @param {Element} elem
 * @returns {IBoundingBoxOrigin}
 */
export function getBoundingBoxOrigin (elem: Element): IBoundingBoxOrigin {
	const {top, left, right, bottom, width, height} = elem.getBoundingClientRect();
	return {top, left, right, bottom, width, height};
}

/**
 * Computes a bounding box based on a poisition.
 * @param {IBoundingBoxOrigin} origin
 * @param {IPositionStrategy} strategy
 * @returns {IBoundingBox}
 */
export function computeBoundingBox (origin: IBoundingBoxOrigin, strategy: IPositionStrategy): IBoundingBox {
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;
	let left, right, top, bottom: number | undefined = undefined;
	let width = 0;
	let height = 0;
	let alignItems: BoundingBoxFlex = "start";
	let justifyContent: BoundingBoxFlex = "start";

	switch (strategy.directionY) {
		case DirectionY.DOWN:
			top = strategy.originY === OriginY.CENTER ? origin.top + origin.height / 2
				: (strategy.originY === OriginY.TOP ? origin.top : origin.top + origin.height);
			height = windowHeight - top;
			break;
		case DirectionY.UP:
			bottom = windowHeight - (strategy.originY === OriginY.CENTER ? origin.bottom - origin.height / 2
				: (strategy.originY === OriginY.TOP ? origin.bottom - origin.height : origin.bottom));
			height = strategy.originY === OriginY.TOP ? origin.top : origin.bottom;
			alignItems = "end";
			break;
	}

	switch (strategy.directionX) {
		case DirectionX.RIGHT:
			left = strategy.originX === OriginX.CENTER ? origin.left + origin.width / 2
				: (strategy.originX === OriginX.START ? origin.left : origin.left + origin.width);
			width = windowWidth - left;
			break;
		case DirectionX.LEFT:
			right = windowWidth - (strategy.originX === OriginX.CENTER ? origin.right - origin.width / 2
				: (strategy.originX === OriginX.START ? (origin.right - origin.width) : origin.right));
			width = strategy.originX === OriginX.START ? origin.left : origin.right;
			justifyContent = "end";
			break;
	}

	const transformOrigin = computeTransformOrigin(strategy);

	return {left, right, top, bottom, width, height, alignItems, justifyContent, transformOrigin};
}

/**
 * Returns whether or not the bounding box is allowed.
 * @param {IBoundingBox} boundingBox
 * @param {number} minWidth
 * @param {number} minHeight
 * @returns {{isWidthAllowed: boolean; isHeightAllowed: boolean; isAllowed: boolean}}
 */
export function isBoundingBoxAllowed (boundingBox: IBoundingBox,
                                      minWidth: number,
                                      minHeight: number): {isWidthAllowed: boolean, isHeightAllowed: boolean, isAllowed: boolean} {
	const isWidthAllowed = boundingBox.width >= minWidth;
	const isHeightAllowed = boundingBox.height >= minHeight;
	return {isWidthAllowed, isHeightAllowed, isAllowed: isWidthAllowed && isHeightAllowed};
}

/**
 * Returns the opposite origin on the Y axis.
 * @param {OriginY} origin
 * @returns {OriginY}
 */
export function oppositeOriginY (origin: OriginY): OriginY {
	return origin === OriginY.CENTER ? OriginY.CENTER : (origin === OriginY.TOP ? OriginY.BOTTOM : OriginY.TOP);
}

/**
 * Returns the opposite origin on the X axis.
 * @param {OriginX} origin
 * @returns {OriginX}
 */
export function oppositeOriginX (origin: OriginX): OriginX {
	return origin === OriginX.CENTER ? OriginX.CENTER : (origin === OriginX.END ? OriginX.START : OriginX.END);
}

/**
 * Returns the opposite direction on the X axis.
 * @param {DirectionX} direction
 * @returns {DirectionX}
 */
export function oppositeDirectionX (direction: DirectionX): DirectionX {
	return direction === DirectionX.RIGHT ? DirectionX.LEFT : DirectionX.RIGHT;
}

/**
 * Returns the opposite direction on the Y axis.
 * @param {DirectionY} direction
 * @returns {DirectionY}
 */
export function oppositeDirectionY (direction: DirectionY): DirectionY {
	return direction === DirectionY.DOWN ? DirectionY.UP : DirectionY.DOWN;
}

/**
 * Computes a position strategy fallback based on the previous strategy and boundingbox.
 * @param {IPositionStrategy} strategy
 * @param {IBoundingBox} boundingBox
 * @param {boolean} swapOriginX
 * @param {boolean} swapOriginY
 * @returns {IPositionStrategy}
 */
export function positionStrategyFallback (strategy: IPositionStrategy,
                                          boundingBox: IBoundingBox,
                                          swapOriginX: boolean = false,
                                          swapOriginY: boolean = false): IPositionStrategy {

	// Compute the available space to the different edges of the screen
	const {above, below} = strategy.directionY === DirectionY.DOWN
		? {above: boundingBox.top, below: boundingBox.height}
		: {above: boundingBox.height, below: boundingBox.bottom};

	const {before, after} = strategy.directionX === DirectionX.RIGHT
		? {before: boundingBox.left, after: boundingBox.width}
		: {before: boundingBox.width, after: boundingBox.right};

	const directionX = after! > before! ? DirectionX.RIGHT : DirectionX.LEFT;
	const directionY = above! > below! ? DirectionY.UP : DirectionY.DOWN;

	const originY = swapOriginY && strategy.directionY !== directionY ? oppositeOriginY(strategy.originY) : strategy.originY;
	const originX = swapOriginX && strategy.directionX !== directionX ? oppositeOriginX(strategy.originX) : strategy.originX;

	return {directionX, directionY, originX, originY};
}

/**
 * Defines a position at one of the edges.
 */
export enum EdgePosition {
	BEFORE = "before",
	AFTER = "after",
	ABOVE = "above",
	BELOW = "below"
}

/**
 * Converts an edge position into a position strategy.
 * @param {EdgePosition} position
 * @returns {IPositionStrategy}
 */
export function edgePositionToPositionStrategy (position: EdgePosition): IPositionStrategy {
	return {
		originX: (position === EdgePosition.ABOVE || position === EdgePosition.BELOW) ? OriginX.CENTER
			: position === EdgePosition.BEFORE ? OriginX.START : OriginX.END,
		originY: (position === EdgePosition.BEFORE || position === EdgePosition.AFTER) ? OriginY.CENTER
			: position === EdgePosition.ABOVE ? OriginY.TOP : OriginY.BOTTOM,
		directionX: position === EdgePosition.BEFORE ? DirectionX.LEFT : DirectionX.RIGHT,
		directionY: position === EdgePosition.ABOVE ? DirectionY.UP : DirectionY.DOWN
	};
}

/**
 * Converts a position strategy to an edge position.
 * @param {IPositionStrategy} strategy
 * @returns {any}
 */
export function positionStrategyToEdgePosition (strategy: IPositionStrategy) {
	switch (strategy.originX) {
		case OriginX.START:
			return EdgePosition.BEFORE;
		case OriginX.END:
			return EdgePosition.AFTER;
	}

	switch (strategy.originY) {
		case OriginY.TOP:
			return EdgePosition.ABOVE;
		case OriginY.BOTTOM:
			return EdgePosition.BELOW;
	}

	// If we end here, both origins are center. Therefore we defaults to looking at the directionX instead.
	switch (strategy.directionX) {
		case DirectionX.RIGHT:
			return EdgePosition.AFTER;
		case DirectionX.LEFT:
			return EdgePosition.BEFORE;
	}
}
