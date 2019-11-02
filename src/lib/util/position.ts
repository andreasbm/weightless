/**
 * Origin on the X axis.
 */
export enum OriginX {
	LEFT = "left",
	CENTER = "center",
	RIGHT = "right"
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
	transformOriginX: OriginX;
	transformOriginY: OriginY;
	anchorOriginX: OriginX;
	anchorOriginY: OriginY;
}

/**
 * The position for an anchor.
 */
export interface IAnchorPosition {
	left: number;
	top: number;
}

/**
 * Transform origin.
 */
export interface ITransformOrigin {
	x: string | number;
	y: string | number;
}

/**
 * Computes the popover position.
 * @param anchorOriginX
 * @param anchorOriginY
 * @param left
 * @param top
 * @param width
 * @param height
 * @param anchorRect
 */
export function computeAnchorPosition(
	{ anchorOriginX, anchorOriginY }: IPositionStrategy,
	{ left, top, width = 0, height = 0 }: { left: number; top: number; height?: number; width?: number }
): IAnchorPosition {
	switch (anchorOriginX) {
		case OriginX.CENTER:
			left = left + width / 2;
			break;
		case OriginX.RIGHT:
			left = left + width;
			break;
	}

	switch (anchorOriginY) {
		case OriginY.CENTER:
			top = top + height / 2;
			break;
		case OriginY.BOTTOM:
			top = top + height;
			break;
	}

	return { left, top };
}

/**
 * Computes the transform origin.
 * @param transformOriginX
 * @param transformOriginY
 */
export function computeTransformOrigin({ transformOriginX, transformOriginY }: IPositionStrategy): ITransformOrigin {
	let x: string | number = 0;
	let y: string | number = 0;

	switch (transformOriginX) {
		case OriginX.CENTER:
			x = `-50%`;
			break;
		case OriginX.RIGHT:
			x = `-100%`;
			break;
	}

	switch (transformOriginY) {
		case OriginY.CENTER:
			y = `-50%`;
			break;
		case OriginY.BOTTOM:
			y = `-100%`;
			break;
	}

	return { x, y };
}

/**
 * Determines whether two strategies are equal.
 * @param strategyA
 * @param strategyB
 */
export function areStrategiesEqual(strategyA: IPositionStrategy, strategyB: IPositionStrategy): boolean {
	return (
		strategyA.transformOriginX !== strategyB.transformOriginX ||
		strategyA.transformOriginY !== strategyB.transformOriginY ||
		strategyA.anchorOriginX !== strategyB.anchorOriginX ||
		strategyA.anchorOriginY !== strategyB.anchorOriginY
	);
}

/**
 * Computes the max dimensions of the container.
 * @param transformOriginX
 * @param transformOriginY
 * @param left
 * @param top
 */
export function computeMaxDimensions(
	{ transformOriginX, transformOriginY }: IPositionStrategy,
	{ left, top }: IAnchorPosition
): { maxWidth: number; maxHeight: number } {
	const { innerHeight, innerWidth } = window;
	return {
		maxWidth: transformOriginX === OriginX.RIGHT ? left : innerWidth - left,
		maxHeight: transformOriginY === OriginY.BOTTOM ? top : innerHeight - top
	};
}

/**
 * Computes a fallback strategy.
 * @param transformOriginX
 * @param transformOriginY
 * @param anchorOriginX
 * @param anchorOriginY
 * @param top
 * @param left
 * @param containerRect
 */
export function computeFallbackStrategy(
	{ transformOriginX, transformOriginY, anchorOriginX, anchorOriginY }: IPositionStrategy,
	{ top, left }: IAnchorPosition,
	containerRect: ClientRect | DOMRect
): IPositionStrategy {
	const { innerHeight, innerWidth } = window;
	switch (transformOriginY) {
		case OriginY.TOP:
			if (top + containerRect.height > innerHeight) {
				transformOriginY = OriginY.BOTTOM;
				anchorOriginY = OriginY.TOP;
			}
			break;
		case OriginY.BOTTOM:
			break;
	}

	switch (transformOriginX) {
		case OriginX.LEFT:
			if (left + containerRect.width > innerWidth) {
				transformOriginX = OriginX.RIGHT;
				anchorOriginX = OriginX.LEFT;
			}
			break;
	}

	return { transformOriginY, transformOriginX, anchorOriginX, anchorOriginY };
}
