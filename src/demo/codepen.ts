export interface ICodePenOptions {
	title?: string;
	description?: string;
	private?: boolean; // true || false - When the Pen is saved, it will save as Private if logged in user has that privledge, otherwise it will save as public
	parent?: string; // If supplied, the Pen will save as a fork of this id. Note it's not the slug, but ID. You can find the ID of a Pen with `window.CP.pen.id` in the browser console.
	tags?: string[]; // an array of strings
	editors?: string; // Set which editors are open. In this example HTML open, CSS closed, JS open
	layout?: "top" | "left" | "right";
	html?: string;
	html_pre_processor?: "none" | "slim" | "haml" | "markdown";
	css?: string;
	css_pre_processor?: "none" | "less" | "scss" | "sass" | "stylus";
	css_starter?: "normalize" | "reset" | "neither";
	css_prefix?: "autoprefixer" | "prefixfree" | "neither";
	js?: string;
	js_pre_processor?: "none" | "coffeescript" | "babel" | "livescript" | "typescript";
	html_classes?: string;
	head?: string;
	css_external?: string; // semi-colon separate multiple files
	js_external?: string; // semi-colon separate multiple files
}

const CODEPEN_URL = `https://codepen.io/pen/define`;

export function openCodepen(options: ICodePenOptions) {
	const $form = document.createElement("form");
	$form.action = CODEPEN_URL;
	$form.target = `_blank`;
	$form.method = `POST`;
	$form.style.display = `none`;

	const $input = document.createElement("input");
	$input.type = `hidden`;
	$input.name = `data`;
	$input.value = JSON.stringify(options);

	const $button = document.createElement("button");
	$button.type = `submit`;

	$form.appendChild($input);
	$form.appendChild($button);

	document.documentElement.appendChild($form);
	$button.click();
}
