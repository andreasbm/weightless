import { customElement, html, LitElement, property } from "lit-element";
import { defaultMenuConfig, IMenuElementBaseProperties, MenuElement } from "../../../../lib/menu/menu-element";
import { openMenu } from "../../../../lib/menu/open-menu";
import { cssResult } from "../../../../lib/util/css";
import { DirectionX, DirectionY, OriginX, OriginY } from "../../../../lib/util/position";
import "../../../code-example/code-example-element";
import "../../demo/demo-element";
import { sharedStyles } from "../../../style/shared";
import { getMainScrollTarget } from "../../../main-scroll-target";
import "./../../../lib/button/button-element";
import "./../../../lib/title/title-element";

async function openTemplateMenu (target: Element, text: string, config: Partial<IMenuElementBaseProperties> = {}) {
	const ref = await openMenu({
		fixed: true,
		backdrop: true,
		blockScrolling: true,
		container: document.body,
		template: html`<p>${text}</p>`,
		scrollTarget: getMainScrollTarget(),
		target,
		...config
	});

	console.log(await ref.result);
}

@customElement("menu-page")
export default class MenuPage extends LitElement {

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

	@property({type: String}) directionX = defaultMenuConfig.directionX;
	@property({type: String}) directionY = defaultMenuConfig.directionY;
	@property({type: String}) originX = defaultMenuConfig.originX;
	@property({type: String}) originY = defaultMenuConfig.originY;

	/**
	 * Opens the declarative menu.
	 */
	private async openDeclarativeMenu () {
		const $menu = this.shadowRoot!.querySelector<MenuElement<string>>("#menu")!;
		const res = await $menu.show();
		console.log("Result:", res);
	}

	protected render () {
		return html`
			<demo-element default>
				<code-example-element>
					<menu-element open>
						<p>This is a menu!</p>
					</menu-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Open menu already in the DOM (declarative)</title-element>
			<demo-element>
				<code-example-element headline='this.shadowRoot.querySelector("#menu").show().then(result => console.log(result));'>
					<button-element id="open-menu" @click="${() => this.openDeclarativeMenu()}">Open menu 1</button-element>
					<menu-element id="menu" target="#open-menu" backdrop fixed .scrollTarget="${getMainScrollTarget()}">
						<p>Hello world!</p>
					</menu-element>
				</code-example-element>
			</demo-element>
			
			<title-element level="3">Open menu from template (imperative)</title-element>
			<demo-element>
				<div id="selector">
					<select-element outlined placeholder="Direction X" value="${this.directionX}" @change="${(e: Event) => this.directionX = (<DirectionX>(<HTMLSelectElement>e.target).value)}">
						<option value="right">Right</option>
						<option value="left">Left</option>
					</select-element>
					<select-element outlined placeholder="Direction Y" value="${this.directionY}" @change="${(e: Event) => this.directionY = (<DirectionY>(<HTMLSelectElement>e.target).value)}">
						<option value="up">Up</option>
						<option value="down">Down</option>
					</select-element>
					<select-element outlined placeholder="Origin X" value="${this.originX}" @change="${(e: Event) => this.originX = (<OriginX>(<HTMLSelectElement>e.target).value)}">
						<option value="start">Start</option>
						<option value="center">Center</option>
						<option value="end">End</option>
					</select-element>
					<select-element outlined placeholder="Origin Y" value="${this.originY}" @change="${(e: Event) => this.originY = (<OriginY>(<HTMLSelectElement>e.target).value)}">
						<option value="top">Top</option>
						<option value="center">Center</option>
						<option value="end">Bottom</option>
					</select-element>
				</div>
				<code-example-element>
					<button-element id="open-menu-2" @click="${() => openTemplateMenu(this.shadowRoot!.querySelector("#open-menu-2")!, "This is a template!", {
			directionX: this.directionX,
			directionY: this.directionY,
			originX: this.originX,
			originY: this.originY
		})}">Open</button-element>
				</code-example-element>
				<highlight-element language="javascript" text="${`
					const ref = await openMenu({
						fixed: true,
						backdrop: true,
						blockScrolling: true,
						container: document.body,
						directionX: "${this.directionX}",
						directionY: "${this.directionY}",
						originX: "${this.originX}",
						originY: "${this.originY}",
						target: this.shadowRoot.querySelector("#open-menu-2"),
						template: html\`<p>This is a template!</p>\`
					});
				`}"></highlight-element>
		`;
	}
}