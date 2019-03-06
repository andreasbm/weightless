import { customElement, html, LitElement, property, query } from "lit-element";
import "../../../../lib/button/button-element";
import "../../../../lib/card/card-element";
import { defaultDialogConfig, DialogElement, DialogSize, IDialogElementBaseProperties } from "../../../../lib/dialog/dialog-element";
import "../../../../lib/dialog/dialog-element";
import { openDialog } from "../../../../lib/dialog/open-dialog";
import { SelectElement } from "../../../../lib/select/select-element";
import "../../../../lib/select/select-element";
import "../../../../lib/textfield/textfield-element";
import "../../../../lib/title/title-element";
import { cssResult } from "../../../../lib/util/css";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import "../../../elements/highlight/highlight-element";
import { getMainScrollContainer } from "../../../main-scroll-target";
import { sharedStyles } from "../../../style/shared";

async function openTemplateDialog (text: string, config: Partial<IDialogElementBaseProperties> = {}) {
	const ref = await openDialog({
		fixed: true,
		backdrop: true,
		blockScrolling: true,
		container: document.body,
		template: html`<p slot="content">${text}</p>`,
		scrollContainer: getMainScrollContainer(),
		...config
	});

	console.log(await ref.result);
}

@customElement("dialog-page")
export default class DialogPage extends LitElement {

	static styles = [sharedStyles, cssResult(`
		#selector {
			display: flex;
			align-items: center;
			margin: 0 0 12px;
		}
		
		select-element {
			width: 100%;
		}
		
		select-element:not(:last-child) {
			margin: 0 12px 0 0;
		}
	`)];

	@query("#size-select") $sizeSelect!: SelectElement;
	@query("#duration-select") $durationSelect!: SelectElement;

	@property({type: String}) size: DialogSize = defaultDialogConfig.size!;
	@property({type: Number}) duration: number = defaultDialogConfig.duration!;

	/**
	 * Opens the declarative dialog.
	 */
	private openDeclarativeDialog () {
		const $dialog = this.shadowRoot!.querySelector<DialogElement<string>>("#dialog")!;
		const $submitButton = this.shadowRoot!.querySelector("#dialog-submit-button")!;
		const $input = this.shadowRoot!.querySelector<HTMLInputElement>("#dialog-input")!;

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

		// Open the dialog
		$dialog.show().then((result: string | null) => {
			console.log("Result from dialog:", result);
			$input.value = "";
			$submitButton.removeEventListener("click", submit);
			$input.removeEventListener("keyup", submit);
		});
	}

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<dialog-element open>
						<title-element level="3" slot="header">This is a header</title-element>
						<div slot="content">
							<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
						</div>
						<div slot="footer">
							<button-element inverted flat>Cancel</button-element>
							<button-element>Okay</button-element>
						</div>
					</dialog-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Open dialog already in the DOM (declarative)</title-element>
			<demo-element>
				<code-example-element headline='this.shadowRoot.querySelector("#dialog").show().then(result => console.log(result));'>
					<button-element id="open-dialog" @click="${() => this.openDeclarativeDialog()}">Open</button-element>
					<dialog-element id="dialog" fixed backdrop blockScrolling .scrollContainer="${getMainScrollContainer()}">
						<h3 slot="header">Hello my friend</h3>
						<div slot="content">
							<textfield-element id="dialog-input" placeholder="Enter your name"></textfield-element>
						</div>
						<div slot="footer">
							<button-element id="dialog-submit-button">Submit</button-element>
						</div>
					</dialog-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Open dialog from template (imperative)</title-element>
			<demo-element>
				<div id="selector">
					<select-element outlined id="size-select" placeholder="Size" value="${this.size}" @change="${() => this.size = <DialogSize>this.$sizeSelect.value}">
						<option value="small">small</option>
						<option value="medium">medium</option>
						<option value="large">large</option>
						<option value="auto">auto</option>
						<option value="fullscreen">fullscreen</option>
					</select-element>
					<select-element outlined id="duration-select" placeholder="Duration" value="${this.duration}" @change="${() => this.duration = parseInt(this.$durationSelect.value)}">
						<option value="0">0ms</option>
						<option value="50">50ms</option>
						<option value="100">100ms</option>
						<option value="200">200ms</option>
						<option value="500">500ms</option>
						<option value="1000">1000ms</option>
					</select-element>
				</div>
				<button-element @click="${() => openTemplateDialog("This is a template!", {
			size: this.size,
			duration: this.duration
		})}">Open</button-element>
				<highlight-element language="javascript" text="${`
					const ref = await openDialog({
						fixed: true,
						backdrop: true,
						blockScrolling: true,
						container: document.body,
						size: "${this.size}",
						duration: ${this.duration},
						template: html\`<p slot="content">This is a template!</p>\`
					});
				`}"></highlight-element>
			</demo-element>
		`;
	}
}