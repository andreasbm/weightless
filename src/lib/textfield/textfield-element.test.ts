import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../textfield";
import { TextfieldElement } from "./textfield-element";

describe("textfield-element", () => {
	const {expect} = chai;
	let $textfield: TextfieldElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<textfield-element></textfield-element>
		`;

		await waitForElements(["textfield-element"]);
		$textfield = $container.querySelector<TextfieldElement>("textfield-element")!;
	});
	after(() => removeContainer($container));

	it("should have a textbox role", () => {
		expect($textfield.getAttribute("role")).to.equal("textbox");
	});
});

