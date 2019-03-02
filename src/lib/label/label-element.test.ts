import { assignedNodesMap, createContainer, removeContainer, waitForElement, waitForElements } from "../../test/testing-helpers";
import "../icon";
import "../checkbox";
import { CheckboxElement } from "../checkbox/checkbox-element";
import { LabelElement } from "./label-element";

describe("label-element", () => {
	const {expect} = chai;
	let $container: HTMLElement;
	let $label1: LabelElement;
	let $checkbox1: CheckboxElement;
	let $label2: LabelElement;
	let $checkbox2: CheckboxElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `

			<!-- Technique 1 -->
			<checkbox-element id="cb1"></checkbox-element>
			<label-element id="l1" for="cb1">This is a label</label-element>
			
			<!-- Technique 2 -->
			<label-element id="l2">
				<checkbox-element id="cb2"></checkbox-element>
				This is another label
			</label-element>
		`;

		await waitForElements(["label-element", "checkbox-element"]);

		$label1 = $container.querySelector<LabelElement>("#l1")!;
		$checkbox1 = $container.querySelector<CheckboxElement>("#cb1")!;
		$label2 = $container.querySelector<LabelElement>("#l2")!;
		$checkbox2 = $container.querySelector<CheckboxElement>("#cb2")!;
	});
	after(() => removeContainer($container));

	/**
	 * Tests the refiring of click.
	 * @param $label
	 * @param $checkbox
	 * @param done
	 */
	function expectRefireClick ($label: LabelElement, $checkbox: CheckboxElement, done: (() => void)) {

		// Listen for click event (prevent the default reload behavior).
		$checkbox.addEventListener("click", e => {
			e.preventDefault();
			done();
		});

		// Ensure that the targeted elements are correct
		expect($label.getTargetElement()).to.be.equal($checkbox);

		// Simulate a click
		$label.click();
	}

	it("should render the slots", async () => {
		const assignedNodes = assignedNodesMap($label2.shadowRoot!);
		expect(assignedNodes[""].length).to.equal(3);
	});

	it("should interact with associated element via the for attribute", done => {
		expectRefireClick($label1, $checkbox1, done);
	});

	it("should interact with associated element via the slot", done => {
		expectRefireClick($label2, $checkbox2, done);
	});

	it("should add aria-labelledby when using the for attribute", () => {
		expect($checkbox1.getAttribute("aria-labelledby")).to.equal($label1.id);
	});
});

