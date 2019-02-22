import { customElement, html, LitElement, PropertyValues } from "lit-element";
import { defaultMenuConfig, IMenuBehaviorConfig, MenuElement } from "../../../lib/menu/menu-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";

@customElement("menu-page")
export default class MenuPage extends LitElement {

	static styles = [sharedStyles];

	firstUpdated (props: PropertyValues) {
		super.firstUpdated(props);

		this.shadowRoot!.querySelector("#open-menu-1")!.addEventListener("click", (e: MouseEvent) => {
			const menu = this.shadowRoot!.querySelector<MenuElement<any>>("#menu-1")!;
			menu.show({...defaultMenuConfig /*target: <HTMLElement>e.srcElement*/}).then(e => {
				console.log("Result:", e);
			});
		});
	}

	protected render () {
		return html`
			<h3>menu-element</h3>
			<button-element id="open-menu-1">Open menu 1</button-element>
			<menu-element id="menu-1" target="#open-menu-1">
				<p>Hello world!</p>
			</menu-element>
		`;
	}
}