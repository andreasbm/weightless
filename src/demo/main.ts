import { GLOBAL_ROUTER_EVENTS_TARGET, GlobalRouterEventKind, ROUTER_SLOT_TAG_NAME, RouterSlot } from "@appnest/web-router";
import "@appnest/web-router";
import "../lib";
import "./main.scss";
import "./navbar/navbar-element";

GLOBAL_ROUTER_EVENTS_TARGET.addEventListener(GlobalRouterEventKind.NavigationEnd, () => {
	document.documentElement.classList.add("initialized");
}, {once: true});

customElements.whenDefined(ROUTER_SLOT_TAG_NAME).then(() => {
	const $slot = document.querySelector<RouterSlot>(ROUTER_SLOT_TAG_NAME)!;
	$slot.add([
		{
			path: "components",
			component: () => import("./pages/components/components-page")
		},
		{
			path: "getting-started",
			component: () => import("./pages/home/home-page")
		},
		{
			path: "",
			component: () => import("./pages/home/home-page")
		},
		{
			path: "**",
			redirectTo: "components"
		}
	]);
});


