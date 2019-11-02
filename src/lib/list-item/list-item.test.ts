import "../list-item";
import { assignedNodesMap, createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import { ListItem } from "./list-item";

describe("wl-list-item", () => {
	const { expect } = chai;
	let $listItem: ListItem;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<wl-list-item>
				<div slot="before">Hello</div>
				<div>Lorem ipsum</div>
				<div slot="after">World</div>
			</wl-list-item>`;

		await waitForElement("wl-list-item");
		$listItem = $container.querySelector<ListItem>("wl-list-item")!;
	});
	after(() => removeContainer($container));

	it("should render the slots", async () => {
		const assignedNodes = assignedNodesMap($listItem.shadowRoot!);

		expect(assignedNodes["before"].length).to.be.above(0);
		expect(assignedNodes[""].length).to.be.above(0);
		expect(assignedNodes["after"].length).to.be.above(0);
	});

	it("should have a list item role", () => {
		expect($listItem.getAttribute("role")).to.equal("listitem");
	});
});
