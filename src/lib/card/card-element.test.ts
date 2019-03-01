import { assignedNodesMap, createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import "../card";
import { CardElement } from "./card-element";

describe("card-element", () => {
	const {expect} = chai;
	let $card: CardElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<card-element>This is a card</card-element>`;

		await waitForElement("card-element");
		$card = $container.querySelector<CardElement>("card-element")!;
	});
	after(() => removeContainer($container));

	it("should render the slots", async () => {
		const assignedNodes = assignedNodesMap($card.shadowRoot!);
		expect(assignedNodes[""].length).to.equal(1);
	});
});

