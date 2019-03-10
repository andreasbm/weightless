import { assignedNodesMap, createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import { PopoverCardElement } from "./wl-popover-card";
import "../popover-card";
import "../popover";

describe("wl-popover-card", () => {
	const {expect} = chai;
	let $popoverCard: PopoverCardElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<wl-popover open>
				<wl-popover-card>
					<p>This is a popover!</p>
				</wl-popover-card>
			</wl-popover>`;

		await waitForElements(["wl-popover", "wl-popover-card"]);
		$popoverCard = $container.querySelector<PopoverCardElement>("wl-popover-card")!;
	});
	after(() => removeContainer($container));

	it("should render the slots", async () => {
		const assignedNodes = assignedNodesMap($popoverCard.shadowRoot!);
		expect(assignedNodes[""].length).to.be.above(0);
	});
});

