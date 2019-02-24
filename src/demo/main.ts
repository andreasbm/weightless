import { ROUTER_SLOT_TAG_NAME, RouterSlot } from "@appnest/web-router";
import "@appnest/web-router";
import "./main.scss";
import "../lib";
import "../lib/nav";
import "../lib/icon";
import "../lib/button";

customElements.whenDefined(ROUTER_SLOT_TAG_NAME).then(() => {
	const $slot = document.querySelector<RouterSlot>(ROUTER_SLOT_TAG_NAME)!;
	$slot.add([
		{
			path: "components",
			component: () => import("./pages/components-page")
		},
		{
			path: "**",
			redirectTo: "components"
		}
	]);
});

const $menuButton = document.querySelector("#menu-button")!;
$menuButton.addEventListener("click", () => {
	window.dispatchEvent(new CustomEvent("toggleMenu"));
}, {passive: true});


