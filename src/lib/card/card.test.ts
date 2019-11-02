import { assignedNodesMap, createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import "../card";
import { Card } from "./card";

describe("wl-card", () => {
	const { expect } = chai;
	let $card: Card;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<wl-card>This is a card</wl-card>`;

		await waitForElement("wl-card");
		$card = $container.querySelector<Card>("wl-card")!;
	});
	after(() => removeContainer($container));

	it("should render the slots", async () => {
		const assignedNodes = assignedNodesMap($card.shadowRoot!);
		expect(assignedNodes[""].length).to.be.above(0);
	});
});
