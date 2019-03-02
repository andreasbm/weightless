import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../select";
import { SelectElement } from "./select-element";

describe("select-element", () => {
	const {expect} = chai;
	let $select: SelectElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<select-element placeholder="Select something">
				<option value="" disabled selected>Select something</option>
				<option value="1">Option 1</option>
				<option value="2">Option 2</option>
				<option value="3">Option 3</option>
				<option value="4">Option 4</option>
			</select-element>
		`;

		await waitForElements(["select-element"]);
		$select = $container.querySelector<SelectElement>("select-element")!;
	});
	after(() => removeContainer($container));

	it("should have a select role", () => {
		expect($select.getAttribute("role")).to.equal("select");
	});
});

