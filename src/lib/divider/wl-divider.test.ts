import { assignedNodesMap, createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import "../divider";
import { WlDivider } from "./wl-divider";

describe("wl-divider", () => {
	const {expect} = chai;
	let $divider: WlDivider;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<wl-divider></wl-divider>`;
		await waitForElement("wl-divider");
		$divider = $container.querySelector<WlDivider>("wl-divider")!;
	});
	after(() => removeContainer($container));

	it("should have a separator role", () => {
		expect($divider.getAttribute("role")).to.equal("separator");
	});
});

