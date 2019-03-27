import { createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import "../checkbox";
import { Switch } from "./switch";

describe("wl-checkbox", () => {
	const {expect} = chai;
	let $switch: Switch;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<wl-switch></wl-switch>`;

		await waitForElement("wl-switch");
		$switch = $container.querySelector<Switch>("wl-switch")!;
	});
	after(() => removeContainer($container));

	it("should have checkbox role", async () => {
		expect($switch.getAttribute("role")).to.be.equal("checkbox");
	});

	it("should reflect aria-checked when not checked", async () => {
		$switch.checked = false;
		await $switch.updateComplete;
		expect($switch.getAttribute("aria-checked")).to.equal("false");
	});

	it("should reflect aria-checked when checked", (done) => {
		$switch.checked = true;
		$switch.updateComplete.then(() => {

			// For some reason we have to wait a bit for the aria-checked attribute to be updated
			// Very weird.
			setTimeout(() => {
				expect($switch.getAttribute("aria-checked")).to.equal("true");
				done();
			}, 100);
		});

	});

	it("should be removed from the tab order when disabled", async () => {
		$switch.disabled = true;
		await $switch.updateComplete;
		expect($switch.tabIndex).to.equal(-1);
	});
});

