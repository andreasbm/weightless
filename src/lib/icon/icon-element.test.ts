import { assignedNodesMap, createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import "../icon";
import { IconElement } from "./icon-element";

describe("divider-element", () => {
	const {expect} = chai;
	let $icon: IconElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<icon-element>flash_on</icon-element>`;
		await waitForElement("icon-element");
		$icon = $container.querySelector<IconElement>("icon-element")!;
	});
	after(() => removeContainer($container));

	it("should have an img role", () => {
		expect($icon.getAttribute("role")).to.equal("img");
	});

	it("should render the slots", async () => {
		const assignedNodes = assignedNodesMap($icon.shadowRoot!);
		expect(assignedNodes[""].length).to.be.above(0);
	});
});

