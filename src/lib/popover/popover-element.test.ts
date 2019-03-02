import { assignedNodesMap, createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../popover";
import { PopoverElement } from "./popover-element";

describe("popover-element", () => {
	const {expect} = chai;
	let $popover: PopoverElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<popover-element open>
				<p>This is a popover!</p>
			</popover-element>`;

		await waitForElements(["popover-element"]);
		$popover = $container.querySelector<PopoverElement>("popover-element")!;
	});
	after(() => removeContainer($container));

	it("should have menu role", async () => {
		expect($popover.getAttribute("role")).to.be.equal("menu");
	});

	it("should render the slots", async () => {
		const assignedNodes = assignedNodesMap($popover.shadowRoot!);
		expect(assignedNodes[""].length).to.be.above(0);
	});

	// TODO: Add more tests for the popover
});

