import { assignedNodesMap, createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import "../divider";
import { DividerElement } from "./divider-element";

describe("divider-element", () => {
	const {expect} = chai;
	let $divider: DividerElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<divider-element></divider-element>`;
		await waitForElement("divider-element");
		$divider = $container.querySelector<DividerElement>("divider-element")!;
	});
	after(() => removeContainer($container));

	it("should have a separator role", () => {
		expect($divider.getAttribute("role")).to.equal("separator");
	});
});

