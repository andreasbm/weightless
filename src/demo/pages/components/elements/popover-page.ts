import { customElement, html, LitElement, property } from "lit-element";
import "../../../../lib/title/title-element";
import "../../../../lib/button/button-element";
import { defaultPopoverConfig, IPopoverElementBaseProperties, PopoverElement } from "../../../../lib/popover/popover-element";
import { openPopover } from "../../../../lib/popover/open-popover";
import { cssResult } from "../../../../lib/util/css";
import { DirectionX, DirectionY, OriginX, OriginY } from "../../../../lib/util/position";
import "../../../code-example/code-example-element";
import "../../../demo/demo-element";
import { getMainScrollTarget } from "../../../main-scroll-target";
import { sharedStyles } from "../../../style/shared";

async function openTemplatePopover (target: Element, text: string, config: Partial<IPopoverElementBaseProperties> = {}) {
	const ref = await openPopover({
		fixed: true,
		backdrop: true,
		blockScrolling: true,
		container: document.body,
		template: html`<p>${text}</p>`,
		scrollTarget: getMainScrollTarget(),
		anchor: target,
		...config
	});

	console.log(await ref.result);
}

@customElement("popover-page")
export default class PopoverPage extends LitElement {

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

	@property({type: String}) directionX = defaultPopoverConfig.directionX;
	@property({type: String}) directionY = defaultPopoverConfig.directionY;
	@property({type: String}) anchorOriginX = defaultPopoverConfig.anchorOriginX;
	@property({type: String}) anchorOriginY = defaultPopoverConfig.anchorOriginY;

	/**
	 * Opens the declarative popover.
	 */
	private async openDeclarativePopover () {
		const $popover = this.shadowRoot!.querySelector<PopoverElement<string>>("#popover")!;
		const res = await $popover.show();
		console.log("Result:", res);
	}

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<popover-element open>
						<p>This is a popover!</p>
					</popover-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Open popover already in the DOM (declarative)</title-element>
			<demo-element>
				<code-example-element headline='this.shadowRoot.querySelector("#popover").show().then(result => console.log(result));'>
					<button-element id="open-popover" @click="${() => this.openDeclarativePopover()}">Open popover 1</button-element>
					<popover-element id="popover" anchor="#open-popover" backdrop fixed .scrollTarget="${getMainScrollTarget()}">
						<p>Hello world!</p>
					</popover-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Open popover from template (imperative)</title-element>
			<demo-element>
				<div id="selector">
					<select-element outlined placeholder="Transform Origin X" value="${this.directionX}" @change="${(e: Event) => this.directionX = (<DirectionX>(<HTMLSelectElement>e.target).value)}">
						<option value="start">Start</option>
						<option value="center">Center</option>
						<option value="end">End</option>
					</select-element>
					<select-element outlined placeholder="Transform Origin Y" value="${this.directionY}" @change="${(e: Event) => this.directionY = (<DirectionY>(<HTMLSelectElement>e.target).value)}">
						<option value="top">Top</option>
						<option value="center">Center</option>
						<option value="end">Bottom</option>
					</select-element>
					<select-element outlined placeholder="Anchor Origin X" value="${this.anchorOriginX}" @change="${(e: Event) => this.anchorOriginX = (<OriginX>(<HTMLSelectElement>e.target).value)}">
						<option value="start">Start</option>
						<option value="center">Center</option>
						<option value="end">End</option>
					</select-element>
					<select-element outlined placeholder="Anchor Origin Y" value="${this.anchorOriginY}" @change="${(e: Event) => this.anchorOriginY = (<OriginY>(<HTMLSelectElement>e.target).value)}">
						<option value="top">Top</option>
						<option value="center">Center</option>
						<option value="end">Bottom</option>
					</select-element>
				</div>
				<code-example-element>
					<button-element id="open-popover-2" @click="${() => openTemplatePopover(this.shadowRoot!.querySelector("#open-popover-2")!, "This is a template!", {
			directionX: this.directionX,
			directionY: this.directionY,
			anchorOriginX: this.anchorOriginX,
			anchorOriginY: this.anchorOriginY
		})}">Open</button-element>
				</code-example-element>
				<highlight-element language="javascript" text="${`
					const ref = await openPopover({
						fixed: true,
						backdrop: true,
						blockScrolling: true,
						container: document.body,
						transformOriginX: "${this.directionX}",
						transformOriginY: "${this.directionY}",
						anchorOriginX: "${this.anchorOriginX}",
						anchorOriginY: "${this.anchorOriginY}",
						anchor: this.shadowRoot.querySelector("#open-popover-2"),
						template: html\`<p>This is a template!</p>\`
					});
				`}"></highlight-element>
		`;
	}
}