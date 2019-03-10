import { createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import "../backdrop";
import { WlBackdrop } from "./wl-backdrop";

describe("wl-backdrop", () => {
	const {expect} = chai;
	let $backdrop: WlBackdrop;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<wl-backdrop></wl-backdrop>`;

		await waitForElement("wl-backdrop");
		$backdrop = $container.querySelector<WlBackdrop>("wl-backdrop")!;
	});
	after(() => removeContainer($container));

	it("should have a presentation role", () => {
		expect($backdrop.getAttribute("role")).to.equal("presentation");
	});
});

