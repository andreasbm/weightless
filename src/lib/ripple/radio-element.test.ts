import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../ripple";
import { RippleElement } from "./ripple-element";

describe("ripple-element", () => {
	const {expect} = chai;
	let $ripple: RippleElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<ripple-element></ripple-element>`;

		await waitForElements(["ripple-element"]);
		$ripple = $container.querySelector<RippleElement>("ripple-element")!;
	});
	after(() => removeContainer($container));

	it("should have a presentation role", () => {
		expect($ripple.getAttribute("role")).to.equal("presentation");
	});
});

