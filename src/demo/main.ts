import { ROUTER_SLOT_TAG_NAME, RouterSlot } from "@appnest/web-router";
import "@appnest/web-router";
import "../lib";
import "./main.scss";

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


