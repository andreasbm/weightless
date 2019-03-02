import { assignedNodesMap, createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import "../checkbox";
import { CheckboxElement } from "./checkbox-element";

describe("checkbox-element", () => {
	const {expect} = chai;
	let $checkbox: CheckboxElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `<checkbox-element></checkbox-element>`;

		await waitForElement("checkbox-element");
		$checkbox = $container.querySelector<CheckboxElement>("checkbox-element")!;
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

	it("should reflect aria-checked when checked", async () => {
		$checkbox.checked = true;
		await $checkbox.updateComplete;
		expect($checkbox.getAttribute("aria-checked")).to.equal("true");
	});

	it("should be removed from the tab order when disabled", async () => {
		$checkbox.disabled = true;
		await $checkbox.updateComplete;
		expect($checkbox.tabIndex).to.equal(-1);
	});
});

