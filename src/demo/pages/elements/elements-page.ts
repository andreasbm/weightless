import { ChangeStateEvent, IRoute, isPathActive, path, RouterSlot, RouterSlotEventKind } from "@appnest/web-router";
import { customElement, html, LitElement, property, PropertyValues, query } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import "../../../lib/button/wl-button";
import "../../../lib/icon/wl-icon";
import "../../../lib/list-item/wl-list-item";
import { cssResult } from "../../../lib/util/css";
import { addListener } from "../../../lib/util/event";
import { DOCS_URL } from "../../constants";
import "../../elements/footer/footer-element";
import { getMainScrollContainer } from "../../main-scroll-target";
import { sharedStyles } from "../../style/shared";

import styles from "./elements-page.scss";
import { COMPONENTS_ROUTES, IRouteData } from "./elements-routes";

@customElement("elements-page")
export default class ElementsPage extends LitElement {

	static styles = [sharedStyles, cssResult(styles)];
	private currentRoute?: IRoute<IRouteData>;

	@query("#router") protected $routerContainer: HTMLDivElement;
	@query("#router-slot") protected $routerSlot: RouterSlot<IRouteData>;
	@property({type: Boolean, reflect: true, attribute: "popover-visible"}) isPopoverVisible = false;

	firstUpdated (props: PropertyValues) {
		super.firstUpdated(props);

		this.$routerSlot.add(COMPONENTS_ROUTES);

		this.$routerSlot.addEventListener(RouterSlotEventKind.ChangeState, (e: ChangeStateEvent) => {
			this.currentRoute = this.$routerSlot.match!.route;
			getMainScrollContainer().scrollTo({top: 0, left: 0});
			this.requestUpdate().then();

			// Register that the parent has finished routing
			if (!this.hasAttribute("routed")) {
				this.setAttribute("routed", "");
			}
		});

		// GLOBAL_ROUTER_EVENTS_TARGET.addEventListener(GlobalRouterEventKind.NavigationEnd, (e: NavigationEndEvent<IRouteData>) => {
		// 	this.currentRoute = e.detail.match.route;
		// 	getMainScrollContainer().scrollTo({top: 0, left: 0});
		// 	this.requestUpdate().then();
		// });

		window.addEventListener("toggleMenu", () => {
			this.isPopoverVisible = !this.isPopoverVisible;
			if (this.isPopoverVisible) {
				addListener(this, "click", () => {
					window.dispatchEvent(new CustomEvent("toggleMenu"));
				}, {once: true});
			}
		});
	}

	protected render () {
		return html`
			<div id="menu">
				${repeat(COMPONENTS_ROUTES.filter(route => route.path !== "**"), route => html`
					<router-link class="menu-item" path="${route.path}">
						<wl-list-item clickable ?active="${path({endSlash: false}).endsWith(route.path)}">
							${route.data != null ? html`<img slot="before" class="img" src="${route.data.img}" alt="Icon" />` : ""}
							<span>${route.data != null ? route.data.title : route.path}</span>
						</wl-list-item>
					</router-link>
				`)}
			</div>
			<div id="router">
				${this.currentRoute != null && this.currentRoute.data != null ? html`
					<header id="header">
						<aside>
							<wl-title level="1">${this.currentRoute.data.title}</wl-title>
							<wl-label>${this.currentRoute.data.desc}</wl-label>
						</aside>
						<a tabindex="-1" href="${DOCS_URL(this.currentRoute.data.docs || this.currentRoute.path)}" target="_blank" rel="noopener">
							<wl-button id="open-docs" inverted flat>
								<span>Documentation</span>
								<wl-icon>open_in_new</wl-icon>
							</wl-button>
						</a>
					</header>
				` : ""}
				<router-slot id="router-slot"></router-slot>
				<footer-element id="footer"></footer-element>
			</div>
		`;
	}
}