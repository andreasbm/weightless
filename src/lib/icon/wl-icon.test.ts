import { assignedNodesMap, createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import "../icon";
import { WlIcon } from "./wl-icon";

describe("wl-divider", () => {
	const {expect} = chai;
	let $icon: WlIcon;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<wl-icon>flash_on</wl-icon>`;
		await waitForElement("wl-icon");
		$icon = $container.querySelector<WlIcon>("wl-icon")!;
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

