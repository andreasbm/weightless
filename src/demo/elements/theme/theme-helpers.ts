import { Color } from "../../../lib/util/theme";

/**
 * Shades a color.
 * @param rgb
 * @param perc
 */
export function shadeColor (rgb: Color, perc: number): Color {

	let {r, g, b} = rgb;

	r = r * (100 + perc) / 100;
	g = g * (100 + perc) / 100;
	b = b * (100 + perc) / 100;

	r = (r < 255) ? r : 255;
	g = (g < 255) ? g : 255;
	b = (b < 255) ? b : 255;

	return {r, g, b};
}

/**
 * Converts a hex number into rgb.
 * TODO: Move to lit util
 * @param hex
 */
export function hexToRGB (hex: string): Color {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
	if (result == null) return {r: 0, g: 0, b: 0};

	const [, rHex, gHex, bHex] = result;
	const radix = 16;

	return {
		r: parseInt(rHex, radix),
		g: parseInt(gHex, radix),
		b: parseInt(bHex, radix)
	};
}

/**
 * Computes the contrast color.
 * @param color
 */
export function contrastColor ({r, g, b}: Color): Color {
	const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
	return (yiq >= 140) ? {r: 0, g: 0, b: 0} : {r: 255, g: 255, b: 255};
}
