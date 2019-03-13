import { assignedNodesMap, createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import "../expansion";
import { WlExpansion } from "./wl-expansion";

describe("wl-expansion", () => {
	const {expect} = chai;
	let $expansion: WlExpansion;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<wl-expansion>
				<span slot="title">Title</span>
				<span slot="description">Description</span>
				<p>Here's some content</p>
			</wl-expansion>`;

		await waitForElement("wl-expansion");
		$expansion = $container.querySelector<WlExpansion>("wl-expansion")!;
	});
	after(() => removeContainer($container));

	it("should render the slots", async () => {
		const assignedNodes = assignedNodesMap($expansion.shadowRoot!);

		expect(assignedNodes["title"].length).to.be.above(0);
		expect(assignedNodes["description"].length).to.be.above(0);
		expect(assignedNodes[""].length).to.be.above(0);
	});
});

