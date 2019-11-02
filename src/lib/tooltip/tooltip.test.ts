import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../tooltip";
import { Tooltip } from "./tooltip";

describe("wl-tooltip", () => {
	const { expect } = chai;
	let $tooltip: Tooltip;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<wl-tooltip></wl-tooltip>
		`;

		await waitForElements(["wl-tooltip"]);
		$tooltip = $container.querySelector<Tooltip>("wl-tooltip")!;
	});
	after(() => removeContainer($container));

	it("should have a menu role", () => {
		expect($tooltip.getAttribute("role")).to.equal("menu");
	});
});
