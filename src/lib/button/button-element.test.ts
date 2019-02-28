import "../button";
import { createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import { ButtonElement } from "./button-element";

describe("button-element", () => {
	const {expect} = chai;
	let $button: ButtonElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<button-element>Hello World</button-element>`;

		await waitForElement("button-element");
		$button = $container.querySelector<ButtonElement>("button-element")!;
	});
	after(() => removeContainer($container));

	it("should render the slot", async () => {
		const text = "Hello slot";

		$button.innerText = text;
		await $button.updateComplete;

		const slotContent = $button.shadowRoot!.querySelector("slot")!.assignedNodes()[0].textContent;
		expect(slotContent).to.equal(text);
	});

	it("should interact with form elements", done => {

		// Add button to form
		const $form = createContainer<HTMLFormElement>("form", $container);
		const $button = new ButtonElement();
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
		expect($button.hasAttribute("aria-disabled")).to.be.true;
	});

	it("should be inserted into the tab sequence as default", () => {
		expect($button.getAttribute("tabindex")).to.equal("0");
	});

	it("should be removed from the tab sequence when disabled", async () => {
		$button.disabled = true;
		await $button.updateComplete;

		expect($button.hasAttribute("disabled")).to.be.true;
		expect($button.getAttribute("tabindex")).to.equal("-1");
	});
});

