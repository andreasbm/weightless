import "../lib";
import "./main.scss";
import { DialogElement } from "../lib/dialog/dialog-element";
import { ENTER } from "../lib/util/constant/keycode";

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
				submit()
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

