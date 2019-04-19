import { customElement, html, LitElement, property, query } from "lit-element";
import "../../../../lib/button/button";
import "../../../../lib/card/card";
import { defaultDialogConfig, Dialog, DialogSize, IDialogBaseProperties } from "../../../../lib/dialog/dialog";
import "../../../../lib/dialog/dialog";
import { showDialog } from "../../../../lib/dialog/show-dialog";
import { Select } from "../../../../lib/select/select";
import "../../../../lib/select/select";
import "../../../../lib/textfield/textfield";
import "../../../../lib/title/title";
import "../../../../lib/text/text";
import { cssResult } from "../../../../lib/util/css";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import "../../../elements/highlight/highlight-element";
import { getMainScrollContainer } from "../../../main-scroll-target";
import { sharedStyles } from "../../../style/shared";

async function openTemplateDialog (text: string, config: Partial<IDialogBaseProperties> = {}) {
	const ref = await showDialog({
		fixed: true,
		backdrop: true,
		blockScrolling: true,
		container: document.body,
		template: html`<wl-text slot="content">${text}</wl-text>`,
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
		
		wl-select {
			width: 100%;
		}
		
		wl-select:not(:last-child) {
			margin: 0 12px 0 0;
		}
	`)];

	@query("#size-select") $sizeSelect!: Select;
	@query("#duration-select") $durationSelect!: Select;

	@property({type: String}) size: DialogSize = defaultDialogConfig.size!;
	@property({type: Number}) duration: number = defaultDialogConfig.duration!;

	/**
	 * Opens the declarative dialog.
	 */
	private openDeclarativeDialog () {
		const $dialog = this.shadowRoot!.querySelector<Dialog<string>>("#dialog")!;
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
					<wl-dialog open>
						<wl-title level="3" slot="header">This is a header</wl-title>
						<div slot="content">
							<wl-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</wl-text>
						</div>
						<div slot="footer">
							<wl-button inverted flat>Cancel</wl-button>
							<wl-button>Okay</wl-button>
						</div>
					</wl-dialog>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Open dialog already in the DOM (declarative)</wl-title>
			<demo-element>
				<code-example-element headline='this.shadowRoot.querySelector("#dialog").show().then(result => console.log(result));'>
					<wl-button id="open-dialog" @click="${() => this.openDeclarativeDialog()}">Open</wl-button>
					<wl-dialog id="dialog" fixed backdrop blockScrolling .scrollContainer="${getMainScrollContainer()}">
						<h3 slot="header">Hello my friend</h3>
						<div slot="content">
							<wl-textfield id="dialog-input" label="Enter your name"></wl-textfield>
						</div>
						<div slot="footer">
							<wl-button id="dialog-submit-button">Submit</wl-button>
						</div>
					</wl-dialog>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Open dialog from template (imperative)</wl-title>
			<demo-element>
				<div id="selector">
					<wl-select outlined id="size-select" label="Size" value="${this.size}" @change="${() => this.size = <DialogSize>this.$sizeSelect.value}">
						<option value="small">small</option>
						<option value="medium">medium</option>
						<option value="large">large</option>
						<option value="auto">auto</option>
						<option value="fullscreen">fullscreen</option>
					</wl-select>
					<wl-select outlined id="duration-select" label="Duration" value="${this.duration}" @change="${() => this.duration = parseInt(this.$durationSelect.value)}">
						<option value="0">0ms</option>
						<option value="50">50ms</option>
						<option value="100">100ms</option>
						<option value="200">200ms</option>
						<option value="500">500ms</option>
						<option value="1000">1000ms</option>
					</wl-select>
				</div>
				<wl-button @click="${() => openTemplateDialog("This is a template!", {
			size: this.size,
			duration: this.duration
		})}">Open</wl-button>
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