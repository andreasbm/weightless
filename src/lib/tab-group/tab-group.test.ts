import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "./tab-group";
import "../tab";
import { TabGroup } from "./tab-group";

describe("wl-tab-group", () => {
	const { expect } = chai;
	let $tabGroup: TabGroup;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<wl-tab-group></wl-tab-group>`;
		await waitForElements(["wl-tab-group", "wl-tab"]);
		$tabGroup = $container.querySelector<TabGroup>("wl-tab-group")!;
	});
	after(() => removeContainer($container));

	it("should have a tablist role", () => {
		expect($tabGroup.getAttribute("role")).to.equal("tablist");
	});
});
