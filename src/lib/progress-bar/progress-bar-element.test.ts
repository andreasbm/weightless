import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../progress-bar";
import { ProgressBarElement } from "./progress-bar-element";

describe("progress-bar-element", () => {
	const {expect} = chai;
	let $progressBar: ProgressBarElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<progress-bar-element></progress-bar-element>`;

		await waitForElements(["progress-bar-element"]);
		$progressBar = $container.querySelector<ProgressBarElement>("progress-bar-element")!;
	});
	after(() => removeContainer($container));

	it("should have a progressbar role", () => {
		expect($progressBar.getAttribute("role")).to.equal("progressbar");
	});
});

