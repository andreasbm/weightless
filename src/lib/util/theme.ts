import { setProperty } from "./dom";

export type Color = {r: number, g: number, b: number};
export type Palette = {[hue: number]: Color | string} & {contrast: Color | {[hue: number]: Color | string}};
export type PaletteMap = {[name: string]: Palette};

export interface IColorConfig {
	isContrast: boolean;
	$target: HTMLElement;
}

export const defaultColorConfig: IColorConfig = {
	isContrast: false,
	$target: document.documentElement
};

/**
 * Sets a color variable on a target.
 * @param name
 * @param hue
 * @param color
 * @param isContrast
 * @param $target
 */
export function setColor (name: string,
                          hue: number,
                          color: Color | string,
                          {isContrast = defaultColorConfig.isContrast, $target = defaultColorConfig.$target}: Partial<IColorConfig> = {}) {
	const rgb = typeof color == "string" ? color : `${color.r}, ${color.g}, ${color.b}`;
	setProperty(`--${name}-${hue}${isContrast ? `-contrast` : ""}`, rgb);
}

/**
 * Sets the palette variables.
 * @param name
 * @param palette
 * @param config
 */
export function setPalette (name: string, palette: Palette, config: Partial<IColorConfig> = {}) {
	for (const [hue, color] of Object.entries(palette)) {
		if (hue == "contrast") {

			// Check whether the contrast is defined as a new palette or as a color.
			if (typeof color == "string" || ("r" in color && "g" in color && "b" in color)) {

				// Add the contrast color for all hues.
				const hues = Object.keys(palette).filter(key => key !== "contrast").map(k => parseInt(k));
				palette = <Palette>hues.reduce((acc: Palette, contrastHue: number) => {
                   	acc[contrastHue] = color;
                   	return acc;
                }, {});
			}

			setPalette(name, <Palette>color, {...config, isContrast: true});

		} else {
			setColor(name, parseInt(hue), <Color>color, config);
		}
	}
}

/**
 * Sets the palette variables for a palette map.
 * @param paletteMap
 */
export function setPaletteMap (paletteMap: PaletteMap) {
	for (const [name, palette] of Object.entries(paletteMap)) {
		setPalette(name, palette);
	}
}
