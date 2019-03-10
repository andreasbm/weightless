import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../ripple";
import { WlRipple } from "./wl-ripple";

describe("wl-ripple", () => {
	const {expect} = chai;
	let $ripple: WlRipple;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<wl-ripple></wl-ripple>`;

		await waitForElements(["wl-ripple"]);
		$ripple = $container.querySelector<WlRipple>("wl-ripple")!;
	});
	after(() => removeContainer($container));

	it("should have a presentation role", () => {
		expect($ripple.getAttribute("role")).to.equal("presentation");
	});
});

