import { createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import "../checkbox";
import { Checkbox } from "./checkbox";

describe("wl-checkbox", () => {
	const { expect } = chai;
	let $checkbox: Checkbox;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<wl-checkbox></wl-checkbox>`;

		await waitForElement("wl-checkbox");
		$checkbox = $container.querySelector<Checkbox>("wl-checkbox")!;
	});
	after(() => removeContainer($container));

	it("should have checkbox role", async () => {
		expect($checkbox.getAttribute("role")).to.be.equal("checkbox");
	});

	it("should reflect aria-checked when not checked", async () => {
		$checkbox.checked = false;
		await $checkbox.updateComplete;
		expect($checkbox.getAttribute("aria-checked")).to.equal("false");
	});

	it("should reflect aria-checked when checked", done => {
		$checkbox.checked = true;
		$checkbox.updateComplete.then(() => {
			// For some reason we have to wait a bit for the aria-checked attribute to be updated
			// Very weird.
			setTimeout(() => {
				expect($checkbox.getAttribute("aria-checked")).to.equal("true");
				done();
			}, 100);
		});
	});

	it("should be removed from the tab order when disabled", async () => {
		$checkbox.disabled = true;
		await $checkbox.updateComplete;
		expect($checkbox.tabIndex).to.equal(-1);
	});
});
