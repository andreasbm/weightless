import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../textarea";
import { WlTextarea } from "./wl-textarea";

describe("wl-textarea", () => {
	const {expect} = chai;
	let $textarea: WlTextarea;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<wl-textarea></wl-textarea>
		`;

		await waitForElements(["wl-textarea"]);
		$textarea = $container.querySelector<WlTextarea>("wl-textarea")!;
	});
	after(() => removeContainer($container));

	it("should have a textbox role", () => {
		expect($textarea.getAttribute("role")).to.equal("textbox");
	});
});

