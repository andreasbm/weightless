import { GLOBAL_ROUTER_EVENTS_TARGET, GlobalRouterEventKind, IRoute, NavigationEndEvent, ROUTER_SLOT_TAG_NAME, RouterSlot } from "@appnest/web-router";
import { customElement, html, LitElement, property, PropertyValues, query } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import { cssResult } from "../../../lib/util/css";
import { addListener } from "../../../lib/util/event";
import { sharedStyles } from "../../style/shared";
import { COMPONENTS_ROUTES, IRouteData } from "./components-routes";

import styles from "./components-page.scss";
import { getMainScrollTarget, setMainScrollTarget } from "../../main-scroll-target";

@customElement("components-page")
export default class ComponentsPage extends LitElement {

	static styles = [sharedStyles, cssResult(styles)];
	private currentRoute?: IRoute<IRouteData>;

	@query("#router") $routerContainer: HTMLDivElement;
	@property({type: Boolean, reflect: true, attribute: "menu-visible"}) isMenuVisible = false;

	firstUpdated (props: PropertyValues) {
		super.firstUpdated(props);

		const $slot = this.shadowRoot!.querySelector<RouterSlot>(ROUTER_SLOT_TAG_NAME)!;
		$slot.add(COMPONENTS_ROUTES);

		setMainScrollTarget(this.$routerContainer);

		GLOBAL_ROUTER_EVENTS_TARGET.addEventListener(GlobalRouterEventKind.NavigationEnd, (e: NavigationEndEvent<IRouteData>) => {
			this.currentRoute = e.detail;
			getMainScrollTarget().scrollTo({top: 0, left: 0});
			this.requestUpdate().then();
		});

		window.addEventListener("toggleMenu", () => {
			this.isMenuVisible = !this.isMenuVisible;
			if (this.isMenuVisible) {
				addListener(this, "click", () => {
					window.dispatchEvent(new CustomEvent("toggleMenu"))
				}, {once: true});
			}
		})
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