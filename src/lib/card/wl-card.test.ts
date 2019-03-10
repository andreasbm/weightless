import { assignedNodesMap, createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import "../card";
import { WlCard } from "./wl-card";

describe("wl-card", () => {
	const {expect} = chai;
	let $card: WlCard;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<wl-card>This is a card</wl-card>`;

		await waitForElement("wl-card");
		$card = $container.querySelector<WlCard>("wl-card")!;
	});
	after(() => removeContainer($container));

	it("should render the slots", async () => {
		const assignedNodes = assignedNodesMap($card.shadowRoot!);
		expect(assignedNodes[""].length).to.be.above(0);
	});
});

