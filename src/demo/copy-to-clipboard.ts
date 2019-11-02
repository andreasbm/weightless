/**
 * Copies text to clipboard.
 * @param text
 */
export function copyToClipboard(text: string) {
	// Create input and add it to the DOM
	const $input = document.createElement("input");
	$input.style.opacity = `0`;
	$input.style.position = `absolute`;
	$input.value = text;
	document.documentElement.appendChild($input);

	// Select and copy
	$input.select();
	document.execCommand("copy");

	// Remove the input again - nobody noticed!
	document.documentElement.removeChild($input);
}
