import { customElement, html, LitElement } from "lit-element";
import "../../../../lib/button/wl-button";
import "../../../../lib/icon/wl-icon";
import { queueSnackbar } from "../../../../lib/snackbar/queue-snackbar";
import "../../../../lib/snackbar/wl-snackbar";
import { showSnackbar } from "../../../../lib/snackbar/show-snackbar";
import { defaultSnackbarConfig, ISnackbarBaseProperties, WlSnackbar } from "../../../../lib/snackbar/wl-snackbar";
import "../../../../lib/title/wl-title";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import { sharedStyles } from "../../../style/shared";

function getRandomText (): string {
	const texts = [
		"Your internet connection was lost.",
		"There was a problem processing a transaction on your credit card.",
		"Your password was updated on your other device. Please sign in again.",
		"We can't find your saved recipes until you sign in.",
		"We can't complete the search while you are offline.",
		"Something wen't wrong while saving your image. Try again later."
	];

	return texts[Math.floor(Math.random() * (texts.length - 1))];
}

async function showTemplateSnackbar ({text, buttonText, queue}: {text: string, buttonText: string, queue: boolean},
                                     config: Partial<ISnackbarBaseProperties> = defaultSnackbarConfig) {
	const ref = await (queue ? queueSnackbar : showSnackbar)({
		container: document.body,
		template: html`
			<span slot="text">${text}</span>
			<wl-button slot="action" flat inverted @click="${() => ref.overlay.hide()}">${buttonText}</wl-button>
		`,
		...config
	});

	console.log(await ref.result);
}

@customElement("snackbar-page")
export default class SnackbarPage extends LitElement {

	static styles = [sharedStyles];

	/**
	 * Shows the declarative snackbar.
	 */
	private showDeclarativeSnackbar () {
		const $snackbar = this.shadowRoot!.querySelector<WlSnackbar<string>>("#snackbar")!;
		console.log($snackbar);
		$snackbar.show().then();
	}

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<wl-snackbar open>
						<wl-icon slot="icon">photo</wl-icon>
						<span slot="text">Can't send photo. Retry in 5 seconds.</span>
						<wl-button slot="action" flat inverted>Retry</wl-button>
					</wl-snackbar>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Open snackbar already in the DOM (declarative)</wl-title>
			<demo-element>
				<code-example-element>
					<wl-button id="open-snackbar" @click="${() => this.showDeclarativeSnackbar()}">Open</wl-button>
					<wl-snackbar id="snackbar" fixed backdrop>
						<wl-icon slot="icon">photo</wl-icon>
						<span slot="text">Can't send photo. Retry in 5 seconds.</span>
						<wl-button slot="action" flat inverted>Retry</wl-button>
					</wl-snackbar>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Open snackbar from template (imperative)</wl-title>
			<demo-element>
				<code-example-element text='this.shadowRoot.querySelector("#snackbar").show()'>
					<wl-button id="open-snackbar" @click="${() => showTemplateSnackbar({
			text: getRandomText(),
			buttonText: "Okay",
			queue: false
		})}">Open</wl-button>
				</code-example-element>
			</demo-element>
			
			<wl-title level="3">Queue a snackback from template (imperative)</wl-title>
			<demo-element>
				<code-example-element>
					<wl-button id="open-snackbar" @click="${() => showTemplateSnackbar({
			text: getRandomText(),
			buttonText: "Okay",
			queue: true
		})}">Add to queue</wl-button>
				</code-example-element>
			</demo-element>
			
		`;
	}
}