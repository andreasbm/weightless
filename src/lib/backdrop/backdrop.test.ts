import { createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import "../backdrop";
import { Backdrop } from "./backdrop";

describe("wl-backdrop", () => {
	const {expect} = chai;
	let $backdrop: Backdrop;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<wl-backdrop></wl-backdrop>`;

		await waitForElement("wl-backdrop");
		$backdrop = $container.querySelector<Backdrop>("wl-backdrop")!;
	});
	after(() => removeContainer($container));

	it("should have a presentation role", () => {
		expect($backdrop).to.exist
		expect($backdrop.getAttribute("role")).to.equal("presentation");
	});
});

