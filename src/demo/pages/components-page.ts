import { GLOBAL_ROUTER_EVENTS_TARGET, GlobalRouterEventKind, IRoute, NavigationEndEvent, ROUTER_SLOT_TAG_NAME, RouterSlot } from "@appnest/web-router";
import { customElement, html, LitElement, PropertyValues, query } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import { cssResult } from "../../lib/util/css";
import { sharedStyles } from "../style/shared";
import { COMPONENTS_ROUTES, IRouteData } from "./components-routes";

import styles from "./components-page.scss";

@customElement("components-page")
export default class ComponentsPage extends LitElement {

	static styles = [sharedStyles, cssResult(styles)];
	private currentRoute?: IRoute<IRouteData>;

	@query("#router") $routerContainer: HTMLDivElement;

	firstUpdated (props: PropertyValues) {
		super.firstUpdated(props);

		const $slot = this.shadowRoot!.querySelector<RouterSlot>(ROUTER_SLOT_TAG_NAME)!;
		$slot.add(COMPONENTS_ROUTES);

		GLOBAL_ROUTER_EVENTS_TARGET.addEventListener(GlobalRouterEventKind.NavigationEnd, (e: NavigationEndEvent<IRouteData>) => {
			this.currentRoute = e.detail;
			this.$routerContainer.scrollTo(0, 0);
			this.requestUpdate().then();
		});
	}

	protected render () {
		return html`
			<div id="menu">
				${repeat(COMPONENTS_ROUTES.filter(route => route.path !== "**"), route => html`
					<router-link class="menu-item" path="${route.path}">
						${route.data != null ? html`<img class="img" src="${route.data.img}" />` : ""}
						<span>${route.data != null ? route.data.title : route.path}</span><br/>
					</router-link>
				`)}
			</div>
			<div id="router">
				${this.currentRoute != null && this.currentRoute.data != null ? html`
					<title-element level="1">${this.currentRoute.data.title}</title-element>
					<label-element>${this.currentRoute.data.desc}</label-element>
				` : ""}
				<router-slot></router-slot>
			</div>
		`;
	}
}