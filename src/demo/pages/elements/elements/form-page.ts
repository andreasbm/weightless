import { css, customElement, html, LitElement, PropertyValues, query } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import "../../../../lib/button/button";
import "../../../../lib/checkbox/checkbox";
import { showDialog } from "../../../../lib/dialog/show-dialog";
import "../../../../lib/label/label";
import "../../../../lib/radio/radio";
import "../../../../lib/select/select";
import "../../../../lib/slider/slider";
import "../../../../lib/textarea/textarea";
import "../../../../lib/textfield/textfield";
import "../../../../lib/title/title";
import "../../../elements/code-example/code-example-element";
import "../../../elements/demo/demo-element";
import { sharedStyles } from "../../../style/shared";

@customElement("form-page")
export default class FormPage extends LitElement {
	static styles = [
		sharedStyles,
		css`
			form {
				text-align: left;
			}

			fieldset {
				border: 1px solid grey;
				border-radius: 6px;
			}

			fieldset,
			wl-textfield,
			wl-textarea,
			wl-slider,
			wl-select {
				margin: 0 0 12px;
			}
		`
	];

	@query("#form") $form!: HTMLFormElement;

	firstUpdated(props: PropertyValues) {
		super.firstUpdated(props);
		this.$form.addEventListener("submit", async e => {
			e.preventDefault();

			// For some reason .entries() could not be found in the typings.
			const data = new FormData(this.$form) as any;

			const res = await showDialog({
				backdrop: true,
				fixed: true,
				template: html`
					<div slot="content">
						<wl-title>Formdata</wl-title>
						${repeat(
							data.entries(),
							([key, value]: [string, unknown]) =>
								html`
									<p><b>${key}: </b>${value}</p>
								`
						)}
					</div>
				`,
				container: document.body
			}).then();

			res.overlay.style.cssText = `--dialog-max-width: 600px;`;

			// Handle the focus manually since we disabled the focus trap
			// res.overlay.storeCurrentActiveElement();
			// res.overlay.focus();
		});
	}

	private resetValidation(e: Event) {
		const $input = e.target as HTMLInputElement;
		$input.setCustomValidity(``);
		$input.checkValidity();
	}

	private validate(e: Event) {
		const $input = e.target as HTMLInputElement;
		switch ($input.name) {
			case "age":
				console.log($input.validity);
				$input.setCustomValidity(`An age is between 0 and 100. Congrats if you are above 100!`);
				break;
			case "fruit":
				$input.setCustomValidity(`Choose between a 'Banana' or an 'Apple'!`);
				break;
			case "email":
				$input.setCustomValidity(`I expect an e-mail, darling!`);
				break;
		}
	}

	protected render() {
		return html`
			<demo-element default>
				<code-example-element>
					<form id="form">
						<fieldset>
							<legend>Title</legend>
							<wl-label> <wl-radio name="title" value="mr" checked></wl-radio>Mr. </wl-label>
							<wl-label> <wl-radio name="title" value="ms"></wl-radio>Ms. </wl-label>
						</fieldset>
						<wl-textfield
							name="age"
							required
							label="Enter your age"
							type="number"
							min="0"
							max="100"
							outlined
							@invalid="${this.validate}"
							@input="${this.resetValidation}"
						></wl-textfield>
						<wl-textfield
							name="fruit"
							required
							label="What's your favorite fruit?"
							pattern="[Bb]anana|[Aa]pple"
							outlined
							list="fruit-options"
							@invalid="${this.validate}"
							@input="${this.resetValidation}"
						></wl-textfield>
						<datalist id="fruit-options">
							<option>Banana</option>
							<option>Apple</option>
						</datalist>
						<wl-select name="happy" required label="Are you happy today?" outlined @invalid="${this.validate}" @input="${this.resetValidation}">
							<option disabled selected value="">Are you happy today?</option>
							<option value="yes">Yes, very happy!</option>
							<option value="no">No, leave me alone..</option>
						</wl-select>
						<wl-textfield
							name="email"
							type="email"
							required
							outlined
							label="What's your email?"
							@invalid="${this.validate}"
							@input="${this.resetValidation}"
						></wl-textfield>
						<wl-slider
							name="awesomeness"
							required
							outlined
							label="How awesome do you think this form is? (0% - 100%)"
							value="100"
							thumbLabel
							@invalid="${this.validate}"
							@input="${this.resetValidation}"
						></wl-slider>
						<wl-textarea
							name="message"
							outlined
							label="Leave a short message"
							style="--textarea-min-height: 100px; --textarea-max-height: 300px;"
						></wl-textarea>
						<wl-button type="submit">Submit</wl-button>
					</form>
				</code-example-element>
			</demo-element>
		`;
	}
}
