import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../tooltip";
import { TooltipElement } from "./tooltip-element";

describe("tooltip-element", () => {
	const {expect} = chai;
	let $tooltip: TooltipElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<tooltip-element></tooltip-element>
		`;

		await waitForElements(["tooltip-element"]);
		$tooltip = $container.querySelector<TooltipElement>("tooltip-element")!;
	});
	after(() => removeContainer($container));

	it("should have a menu role", () => {
		expect($tooltip.getAttribute("role")).to.equal("menu");
	});
});

