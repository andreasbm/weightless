import { assignedNodesMap, createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import { PopoverCardElement } from "./popover-card-element";
import "../popover-card";
import "../popover";

describe("popover-card-element", () => {
	const {expect} = chai;
	let $popoverCard: PopoverCardElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<popover-element open>
				<popover-card-element>
					<p>This is a popover!</p>
				</popover-card-element>
			</popover-element>`;

		await waitForElements(["popover-element", "popover-card-element"]);
		$popoverCard = $container.querySelector<PopoverCardElement>("popover-card-element")!;
	});
	after(() => removeContainer($container));

	it("should render the slots", async () => {
		const assignedNodes = assignedNodesMap($popoverCard.shadowRoot!);
		expect(assignedNodes[""].length).to.be.above(0);
	});
});

