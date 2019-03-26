import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../textarea";
import { Textarea } from "./textarea";

describe("wl-textarea", () => {
	const {expect} = chai;
	let $textarea: Textarea;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<wl-textarea></wl-textarea>
		`;

		await waitForElements(["wl-textarea"]);
		$textarea = $container.querySelector<Textarea>("wl-textarea")!;
	});
	after(() => removeContainer($container));

	it("should have a textbox role", () => {
		expect($textarea.getAttribute("role")).to.equal("textbox");
	});
});

