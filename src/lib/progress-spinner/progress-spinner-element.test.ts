import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../progress-spinner";
import { ProgressSpinnerElement } from "./progress-spinner-element";

describe("progress-spinner-element", () => {
	const {expect} = chai;
	let $progressSpinner: ProgressSpinnerElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<progress-spinner-element></progress-spinner-element>`;

		await waitForElements(["progress-spinner-element"]);
		$progressSpinner = $container.querySelector<ProgressSpinnerElement>("progress-spinner-element")!;
	});
	after(() => removeContainer($container));

	it("should have a progressbar role", () => {
		expect($progressSpinner.getAttribute("role")).to.equal("progressbar");
	});
});

