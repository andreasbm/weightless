import { assignedNodesMap, createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import "../icon";
import { Icon } from "./icon";

describe("wl-divider", () => {
	const { expect } = chai;
	let $icon: Icon;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<wl-icon>flash_on</wl-icon>`;
		await waitForElement("wl-icon");
		$icon = $container.querySelector<Icon>("wl-icon")!;
	});
	after(() => removeContainer($container));

	it("should have an presentation role", () => {
		expect($icon.getAttribute("role")).to.equal("presentation");
	});

	it("should render the slots", async () => {
		const assignedNodes = assignedNodesMap($icon.shadowRoot!);
		expect(assignedNodes[""].length).to.be.above(0);
	});
});
