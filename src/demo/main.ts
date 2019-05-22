import "@a11y/skip-navigation";
import "@appnest/web-router";
import { GLOBAL_ROUTER_EVENTS_TARGET, GlobalRouterEventKind, path, ROUTER_SLOT_TAG_NAME, RouterSlot } from "@appnest/web-router";
import { Nav } from "../lib/nav/nav";
import { GA_MEASUREMENT_ID } from "./constants";
import "./elements/navbar/navbar-element";
import { getMainScrollContainer, setMainScrollContainer } from "./main-scroll-target";
import "./main.scss";
import { track } from "./track";

const $navbar = document.querySelector<Nav>("#navbar")!;

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

// Track page views
window.addEventListener(GlobalRouterEventKind.NavigationEnd, () => {
	track("config", GA_MEASUREMENT_ID, {
		"page_path": location.pathname,
		"page_location": location.href
	});
});

// Sends the timing event to analytics.
if (window.performance) {
	const timeSincePageLoad = Math.round(performance.now());
	track("event", "timing_complete", {
		"name": "load",
		"value": timeSincePageLoad,
		"event_category": "Performance"
	});
}