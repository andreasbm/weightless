import { HSLColor } from "../../../lib/util/theme";

export type RgbColor = { r: number; g: number; b: number };

/**
 * Shades a color.
 * @param rgb
 * @param perc
 */
export function shadeColor(rgb: RgbColor, perc: number): RgbColor {
	let { r, g, b } = rgb;

	r = (r * (100 + perc)) / 100;
	g = (g * (100 + perc)) / 100;
	b = (b * (100 + perc)) / 100;

	r = r < 255 ? r : 255;
	g = g < 255 ? g : 255;
	b = b < 255 ? b : 255;

	return { r, g, b };
}

/**
 * Converts a hex number into rgb.
 * TODO: Move to lit util
 * @param hex
 */
export function hexToRGB(hex: string): RgbColor {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
	if (result == null) return { r: 0, g: 0, b: 0 };

	const [, rHex, gHex, bHex] = result;
	const radix = 16;

	return {
		r: parseInt(rHex, radix),
		g: parseInt(gHex, radix),
		b: parseInt(bHex, radix)
	};
}

/**
 * Converts an RGB color value to HSL.
 * Source: https://gist.github.com/mjackson/5311256
 * @param r
 * @param g
 * @param b
 */
export function rgbToHSL({ r, g, b }: RgbColor): HSLColor {
	r /= 255;
	g /= 255;
	b /= 255;

	const max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h = 0,
		s = 0,
		l = (max + min) / 2;

	if (max != min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}

		h /= 6;
	}

	return [h * 360, s * 100, l * 100];
}

/**
 * Computes the contrast color.
 * @param color
 */
export function contrastColor({ r, g, b }: RgbColor): RgbColor {
	const yiq = (r * 299 + g * 587 + b * 114) / 1000;
	return yiq >= 140 ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 };
}
