import { createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import { BackdropElement } from "./backdrop-element";
import "../backdrop";

describe("backdrop-element", () => {
	const {expect} = chai;
	let $backdrop: BackdropElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<backdrop-element></backdrop-element>`;

		await waitForElement("backdrop-element");
		$backdrop = $container.querySelector<BackdropElement>("backdrop-element")!;
	});
	after(() => removeContainer($container));

	it("should have a presentation role", () => {
		expect($backdrop.getAttribute("role")).to.equal("presentation");
	});
});

