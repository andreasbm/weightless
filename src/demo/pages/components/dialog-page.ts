import { customElement, html, LitElement, PropertyValues } from "lit-element";
import { DialogElement } from "../../../lib/dialog/dialog-element";
import { openDialog } from "../../../lib/dialog/open-dialog";
import { sharedStyles } from "../../style/shared";

@customElement("dialog-page")
export default class DialogPage extends LitElement {

	static styles = [sharedStyles];

	firstUpdated (props: PropertyValues) {
		super.firstUpdated(props);

		this.shadowRoot!.querySelector("#open-dialog-1")!.addEventListener("click", () => {
			const $dialog = this.shadowRoot!.querySelector<DialogElement<string>>("#dialog-1")!;
			const $submitButton = this.shadowRoot!.querySelector("#dialog-1-submit-button")!;
			const $input = this.shadowRoot!.querySelector<HTMLInputElement>("#dialog-1-input")!;

			const submit = () => {
				if (Boolean($input.value)) {
					$dialog.hide($input.value);
				} else {
					console.log("focus");
					$input.focus();
				}
			};

			$input.addEventListener("submit", submit);
			$submitButton.addEventListener("click", submit);
			$dialog.show().then((result: string | null) => {
				console.log("Result from dialog:", result);
				$input.value = "";
				$submitButton.removeEventListener("click", submit);
				$input.removeEventListener("keyup", submit);
			});
		});

		this.shadowRoot!.querySelector("#open-dialog-2")!.addEventListener("click", async () => {
			const ref = await openDialog({
				fixed: true,
				backdrop: true,
				blockScrolling: true,
				container: document.body,
				template: html`<p slot="content">This is a template!</p>`
			});

			console.log(await ref.result);
		});
	}

	protected render () {
		return html`
			<h3>dialog-element</h3>
			<button id="open-dialog-1">Open inline dialog</button>
			<button id="open-dialog-2">Open template dialog</button>
			<dialog-element id="dialog-1" fixed backdrop blockScrolling>
				<h3 slot="header">Hello my friend</h3>
				<div slot="content">
					<textfield-element id="dialog-1-input" placeholder="Enter your name"></textfield-element>
				</div>
				<div slot="footer">
					<button-element id="dialog-1-submit-button">Submit</button-element>
				</div>
			</dialog-element>
		`;
	}
}