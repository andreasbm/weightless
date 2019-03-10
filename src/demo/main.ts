import { GLOBAL_ROUTER_EVENTS_TARGET, GlobalRouterEventKind, path, ROUTER_SLOT_TAG_NAME, RouterSlot } from "@appnest/web-router";
import "@appnest/web-router";
import { WlNav } from "../lib/nav/wl-nav";
import "./elements/navbar/navbar-element";
import { getMainScrollContainer, setMainScrollContainer } from "./main-scroll-target";
import "./main.scss";

const $navbar = document.querySelector<WlNav>("#navbar")!;

let currentPath = path();

function updateShadow () {
	let shadow = true;
	if (window.scrollY <= 100 && !currentPath.startsWith("/elements")) {
		shadow = false;
	}

	if ($navbar.shadow != shadow) {
		$navbar.shadow = shadow;
	}
}

GLOBAL_ROUTER_EVENTS_TARGET.addEventListener(GlobalRouterEventKind.ChangeState, () => {
	currentPath = path();
	updateShadow();
	getMainScrollContainer().scrollTo({top: 0, left: 0});
});

customElements.whenDefined(ROUTER_SLOT_TAG_NAME).then(() => {
	const $slot = document.querySelector<RouterSlot>(ROUTER_SLOT_TAG_NAME)!;
	$slot.add([
		{
			path: "elements",
			component: () => import("./pages/elements/elements-page")
		},
		{
			path: "get-started",
			component: () => import("./pages/get-started/get-started-page")
		},
		{
			path: "",
			component: () => import("./pages/home/home-page")
		},
		{
			path: "**",
			redirectTo: "home"
		}
	]);
});

setMainScrollContainer(window);
getMainScrollContainer().addEventListener("scroll", updateShadow);
updateShadow();

// Register the service worker
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/sw.js").then(res => {
		console.log(`Service worker registered`, res);
	});
}
