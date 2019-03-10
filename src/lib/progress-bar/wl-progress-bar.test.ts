import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../progress-bar";
import { WlProgressBar } from "./wl-progress-bar";

describe("wl-progress-bar", () => {
	const {expect} = chai;
	let $progressBar: WlProgressBar;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<wl-progress-bar></wl-progress-bar>`;

		await waitForElements(["wl-progress-bar"]);
		$progressBar = $container.querySelector<WlProgressBar>("wl-progress-bar")!;
	});
	after(() => removeContainer($container));

	it("should have a progressbar role", () => {
		expect($progressBar.getAttribute("role")).to.equal("progressbar");
	});
});

