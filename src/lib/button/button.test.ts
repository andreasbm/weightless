import "../button";
import { assignedNodesMap, createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import { Button } from "./button";

describe("wl-button", () => {
	const {expect} = chai;
	let $button: Button;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<wl-button>Hello World</wl-button>`;

		await waitForElement("wl-button");
		$button = $container.querySelector<Button>("wl-button")!;
	});
	after(() => removeContainer($container));

	it("should render the slot", async () => {
		const assignedNodes = assignedNodesMap($button.shadowRoot!);
		expect(assignedNodes[""].length).to.be.above(0);
	});

	it("should interact with form elements", done => {

		// Add button to form
		const $form = createContainer<HTMLFormElement>("form", $container);
		const $button = new Button();
		$form.appendChild($button);
		$button.updateComplete.then(() => {

			// Listen for submit event (prevent the default reload behavior).
			$form.addEventListener("submit", e => {
				e.preventDefault();
				done();
			});

			// Simulate a click
			$button.click();
		});
	});

	/**
	 * ARIA TESTS: https://www.w3.org/TR/wai-aria-practices-1.1/#button
	 */
	it("should have a button role", () => {
		expect($button.getAttribute("role")).to.equal("button");
	});

	it("should set aria-disabled to true when disabled", async () => {
		$button.disabled = true;
		await $button.updateComplete;
		expect($button.getAttribute("aria-disabled")).to.be.equal("true");
	});

	it("should be removed from the tab sequence when disabled", async () => {
		$button.disabled = true;
		await $button.updateComplete;

		expect($button.hasAttribute("disabled")).to.be.true;
		expect($button.getAttribute("tabindex")).to.equal("-1");
	});

	it("should be inserted into the tab sequence as default", () => {
		expect($button.getAttribute("tabindex")).to.equal("0");
	});

	it("should be respect the tabindex set by the page author", async () => {
		$button.tabIndex = 123;
		await $button.updateComplete;

		expect($button.getAttribute("tabindex")).to.equal("123");
	});
});

