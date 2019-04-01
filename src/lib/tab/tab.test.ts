import { createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import "./tab";
import { Tab } from "./tab";

describe("wl-tab", () => {
	const {expect} = chai;
	let $tab: Tab;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<wl-tab></wl-tab>`;
		await waitForElement("wl-tab");
		$tab = $container.querySelector<Tab>("wl-tab")!;
	});
	after(() => removeContainer($container));

	it("should have a tab role", () => {
		expect($tab.getAttribute("role")).to.equal("tab");
	});
});

