import "../list-item";
import { assignedNodesMap, createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import { WlListItem } from "./wl-list-item";

describe("wl-list-item", () => {
	const {expect} = chai;
	let $listItem: WlListItem;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<wl-list-item>
				<div slot="left">Hello</div>
				<div>Lorem ipsum</div>
				<div slot="right">World</div>
			</wl-list-item>`;

		await waitForElement("wl-list-item");
		$listItem = $container.querySelector<WlListItem>("wl-list-item")!;
	});
	after(() => removeContainer($container));

	it("should render the slots", async () => {
		const assignedNodes = assignedNodesMap($listItem.shadowRoot!);

		expect(assignedNodes["left"].length).to.be.above(0);
		expect(assignedNodes[""].length).to.be.above(0);
		expect(assignedNodes["right"].length).to.be.above(0);
	});

	it("should have a list item role", () => {
		expect($listItem.getAttribute("role")).to.equal("listitem");
	});
});

