import { assignedNodesMap, createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import "../divider";
import { Divider } from "./divider";

describe("wl-divider", () => {
	const {expect} = chai;
	let $divider: Divider;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<wl-divider></wl-divider>`;
		await waitForElement("wl-divider");
		$divider = $container.querySelector<Divider>("wl-divider")!;
	});
	after(() => removeContainer($container));

	it("should have a separator role", () => {
		expect($divider.getAttribute("role")).to.equal("separator");
	});
});

