import { removeProperty, setProperty } from "./dom";

export type HSLColor = [number /* 0-360 */, number /* 0-100 */, number /* 0-100 */];
export type Palette = { [hue: number]: HSLColor | string } & { contrast: HSLColor | { [hue: number]: HSLColor | string } };
export type PaletteMap = { [name: string]: Palette };

export interface IColorConfig {
	isContrast: boolean;
	$target: HTMLElement;
}

export const defaultColorConfig: IColorConfig = {
	isContrast: false,
	$target: document.documentElement
};

/**
 * Returns the color key for a color with a given hue.
 * @param name
 * @param hue
 * @param isContrast
 */
export function colorKey(name: string, hue: number | string, isContrast: boolean = false): string {
	return `--${name}-${hue}${isContrast ? `-contrast` : ""}`;
}

/**
 * Returns a string for the color.
 * @param color
 */
export function colorValue(color: HSLColor | string | number) {
	return Array.isArray(color) ? `${(color as HSLColor)[0]}, ${(color as HSLColor)[1]}%, ${(color as HSLColor)[2]}%` : color.toString();
}

/**
 * Sets a color variable on a target.
 * @param name
 * @param hue
 * @param color
 * @param isContrast
 * @param $target
 */
export function setColor(
	name: string,
	hue: number | string,
	color: HSLColor | string | number,
	{ isContrast = defaultColorConfig.isContrast, $target = defaultColorConfig.$target }: Partial<IColorConfig> = {}
) {
	setProperty(colorKey(name, hue, isContrast), colorValue(color), $target);
}

/**
 * Removes a color variable on a target.
 * @param name
 * @param hue
 * @param isContrast
 * @param $target
 */
export function removeColor(
	name: string,
	hue: number | string,
	{ isContrast = defaultColorConfig.isContrast, $target = defaultColorConfig.$target }: Partial<IColorConfig> = {}
) {
	removeProperty(colorKey(name, hue, isContrast), $target);
}

/**
 * Sets the palette variables.
 * @param name
 * @param palette
 * @param config
 */
export function setPalette(name: string, palette: Palette, config: Partial<IColorConfig> = {}) {
	for (const [hue, color] of Object.entries(palette)) {
		if (hue == "contrast") {
			// Check whether the contrast is defined as a new palette or as a color.
			if (typeof color == "string" || Array.isArray(color)) {
				// Add the contrast color for all hues.
				const hues = Object.keys(palette)
					.filter(key => key !== "contrast")
					.map(k => parseInt(k));
				palette = <Palette>hues.reduce(
					(acc: Palette, contrastHue: number) => {
						acc[contrastHue] = color as HSLColor;
						return acc;
					},
					{} as Palette
				);
			}

			setPalette(name, <Palette>color, { ...config, isContrast: true });
		} else {
			setColor(name, parseInt(hue), <HSLColor>color, config);
		}
	}
}

/**
 * Sets the palette variables for a palette map.
 * @param paletteMap
 */
export function setPaletteMap(paletteMap: PaletteMap) {
	for (const [name, palette] of Object.entries(paletteMap)) {
		setPalette(name, palette);
	}
}
