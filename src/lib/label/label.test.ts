import { assignedNodesMap, createContainer, removeContainer, waitForElement, waitForElements } from "../../test/testing-helpers";
import "../icon";
import "../checkbox";
import { Checkbox } from "../checkbox/checkbox";
import { Label } from "./label";

describe("wl-label", () => {
	const {expect} = chai;
	let $container: HTMLElement;
	let $label1: Label;
	let $checkbox1: Checkbox;
	let $label2: Label;
	let $checkbox2: Checkbox;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `

			<!-- Technique 1 -->
			<wl-checkbox id="cb1"></wl-checkbox>
			<wl-label id="l1" for="cb1">This is a label</wl-label>
			
			<!-- Technique 2 -->
			<wl-label id="l2">
				<wl-checkbox id="cb2"></wl-checkbox>
				This is another label
			</wl-label>
		`;

		await waitForElements(["wl-label", "wl-checkbox"]);

		$label1 = $container.querySelector<Label>("#l1")!;
		$checkbox1 = $container.querySelector<Checkbox>("#cb1")!;
		$label2 = $container.querySelector<Label>("#l2")!;
		$checkbox2 = $container.querySelector<Checkbox>("#cb2")!;
	});
	after(() => removeContainer($container));

	/**
	 * Tests the refiring of click.
	 * @param $label
	 * @param $checkbox
	 * @param done
	 */
	function expectRefireClick ($label: Label, $checkbox: Checkbox, done: (() => void)) {

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
		expect(assignedNodes[""].length).to.be.above(0);
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

