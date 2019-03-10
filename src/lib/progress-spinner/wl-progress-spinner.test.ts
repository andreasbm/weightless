import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../progress-spinner";
import { WlProgressSpinner } from "./wl-progress-spinner";

describe("wl-progress-spinner", () => {
	const {expect} = chai;
	let $progressSpinner: WlProgressSpinner;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<wl-progress-spinner></wl-progress-spinner>`;

		await waitForElements(["wl-progress-spinner"]);
		$progressSpinner = $container.querySelector<WlProgressSpinner>("wl-progress-spinner")!;
	});
	after(() => removeContainer($container));

	it("should have a progressbar role", () => {
		expect($progressSpinner.getAttribute("role")).to.equal("progressbar");
	});
});

