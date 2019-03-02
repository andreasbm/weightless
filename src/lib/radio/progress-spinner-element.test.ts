import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../radio";
import { RadioElement } from "./radio-element";

describe("radio-element", () => {
	const {expect} = chai;
	let $radios: RadioElement[];
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<radio-element name="food" value="salad"></radio-element>
			<radio-element name="food" value="burger"></radio-element>
			<radio-element name="food" value="pizza"></radio-element>`;

		await waitForElements(["radio-element"]);
		$radios = Array.from($container.querySelectorAll<RadioElement>("radio-element"));
	});
	after(() => removeContainer($container));

	it("should have a radio role", () => {
		for (const $radio of $radios) {
			expect($radio.getAttribute("role")).to.equal("radio");
		}
	});
});

