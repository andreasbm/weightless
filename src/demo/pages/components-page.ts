import { ROUTER_SLOT_TAG_NAME, RouterSlot } from "@appnest/web-router";
import { customElement, html, LitElement, PropertyValues } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import { cssResult } from "../../lib/util/css";
import { sharedStyles } from "../style/shared";

import styles from "./components-page.scss";

const ROUTES = [
	{
		path: "button",
		component: () => import("./components/button-page")
	},
	{
		path: "dialog",
		component: () => import("./components/dialog-page")
	},
	{
		path: "icon",
		component: () => import("./components/icon-page")
	},
	{
		path: "progress",
		component: () => import("./components/progress-page")
	},
	{
		path: "divider",
		component: () => import("./components/divider-page")
	},
	{
		path: "banner",
		component: () => import("./components/banner-page")
	},
	{
		path: "menu",
		component: () => import("./components/menu-page")
	},
	{
		path: "select",
		component: () => import("./components/select-page")
	},
	{
		path: "textfield",
		component: () => import("./components/textfield-page")
	},
	{
		path: "textarea",
		component: () => import("./components/textarea-page")
	},
	{
		path: "card",
		component: () => import("./components/card-page")
	},
	{
		path: "ripple",
		component: () => import("./components/ripple-page")
	},
	{
		path: "checkbox",
		component: () => import("./components/checkbox-page")
	},
	{
		path: "radio",
		component: () => import("./components/radio-page")
	},
	{
		path: "label",
		component: () => import("./components/label-page")
	},
	{
		path: "**",
		redirectTo: "button"
	}
];

@customElement("components-page")
export default class ComponentsPage extends LitElement {

	static styles = [sharedStyles, cssResult(styles)];

	firstUpdated (props: PropertyValues) {
		super.firstUpdated(props);

		const $slot = this.shadowRoot!.querySelector<RouterSlot>(ROUTER_SLOT_TAG_NAME)!;
		$slot.add(ROUTES);
	}

	protected render () {
		return html`
			<div id="menu">
				${repeat(ROUTES.filter(route => route.path !== "**"), route => html`
					<router-link class="menu-item" path="${route.path}">${route.path}</router-link>
				`)}
			</div>
			<div id="router">
				<router-slot></router-slot>
			</div>
		`;
	}
}