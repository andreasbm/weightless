import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../textarea";
import { TextareaElement } from "./textarea-element";

describe("textarea-element", () => {
	const {expect} = chai;
	let $textarea: TextareaElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<textarea-element></textarea-element>
		`;

		await waitForElements(["textarea-element"]);
		$textarea = $container.querySelector<TextareaElement>("textarea-element")!;
	});
	after(() => removeContainer($container));

	it("should have a textbox role", () => {
		expect($textarea.getAttribute("role")).to.equal("textbox");
	});
});

