import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../ripple";
import { Ripple } from "./ripple";

describe("wl-ripple", () => {
	const { expect } = chai;
	let $ripple: Ripple;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<wl-ripple></wl-ripple>`;

		await waitForElements(["wl-ripple"]);
		$ripple = $container.querySelector<Ripple>("wl-ripple")!;
	});
	after(() => removeContainer($container));

	it("should have a presentation role", () => {
		expect($ripple.getAttribute("role")).to.equal("presentation");
	});
});
