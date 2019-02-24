export type Color = {r: string, g: string, b: string};
export type Palette = {[hue: number]: Color} & {contrast: Color | {[hue: number]: Color}};
export type PaletteMap = {[name: string]: Palette};

/**
 * Sets a color variable on a target.
 * @param name
 * @param hue
 * @param color
 * @param $target
 */
function setColor (name: string, hue: number, color: Color, $target: HTMLElement = document.documentElement) {
	$target.style.setProperty(`--${name}-${hue}`, `${color.r}, ${color.g}, ${color.b}`);
}

/**
 * Sets the palette variables for a palette map.
 * @param paletteMap
 */
function setPaletteMap (paletteMap: PaletteMap) {
	for (const [name, palette] of Object.entries(paletteMap)) {
		for (const [hue, color] of Object.entries(palette)) {
			if (hue === "contrast") {

			} else {
				setColor(name, parseInt(hue), <Color>color);
			}
		}
	}
}
