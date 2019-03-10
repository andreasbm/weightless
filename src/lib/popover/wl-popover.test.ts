import { assignedNodesMap, createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../popover";
import { WlPopover } from "./wl-popover";

describe("wl-popover", () => {
	const {expect} = chai;
	let $popover: WlPopover;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<wl-popover open>
				<p>This is a popover!</p>
			</wl-popover>`;

		await waitForElements(["wl-popover"]);
		$popover = $container.querySelector<WlPopover>("wl-popover")!;
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

