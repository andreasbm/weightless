import "../lib";
import { html } from "lit-html";
import { DialogElement } from "../lib/dialog/dialog-element";
import { openDialog } from "../lib/dialog/open-dialog";
import { defaultMenuConfig, IMenuBehaviorConfig } from "../lib/menu/menu-element";
import { MenuElement } from "../lib/menu/menu-element";
import { ENTER } from "../lib/util/constant/keycode";
import "./main.scss";

document.querySelector("#open-dialog-1")!.addEventListener("click", () => {
	const $dialog = document.querySelector<DialogElement<string>>("#dialog-1")!;
	const $submitButton = document.querySelector("#dialog-1-submit-button")!;
	const $input = document.querySelector<HTMLInputElement>("#dialog-1-input")!;

	const submit = () => {
		if (Boolean($input.value)) {
			$dialog.hide($input.value);
		} else {
			$input.focus();
		}
	};

	const keyup = (e: KeyboardEvent) => {
		switch (e.code) {
			case ENTER:
				submit();
		}
	};

	$input.addEventListener("keyup", keyup);
	$submitButton.addEventListener("submit", submit);
	$dialog.show().then((result: string | null) => {
		console.log("Result from dialog:", result);
		$input.value = "";
		$submitButton.removeEventListener("click", submit);
		$input.removeEventListener("keyup", submit);
	});
});

document.querySelector("#open-dialog-2")!.addEventListener("click", async () => {
	const ref = await openDialog({
		fixed: true,
		backdrop: true,
		blockScrolling: true,
		container: document.body,
		template: html`<p slot="content">This is a template!</p>`
	});

	console.log(await ref.result);
});

function openMenu (e: MouseEvent, query: string, config?: IMenuBehaviorConfig) {
	const menu = document.querySelector<MenuElement<any>>(query)!;
	console.log(e, e.srcElement);
	menu.show({...config, trigger: <HTMLElement>e.srcElement}).then(e => {
		console.log("Result:", e);
	});
}

document.querySelector("#open-menu-1")!.addEventListener("click", (e: MouseEvent) => {
	openMenu(e, "#menu-1", defaultMenuConfig);
});
