import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../textfield";
import { Textfield } from "./textfield";

describe("wl-textfield", () => {
	const {expect} = chai;
	let $textfield: Textfield;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<wl-textfield></wl-textfield>
		`;

		await waitForElements(["wl-textfield"]);
		$textfield = $container.querySelector<Textfield>("wl-textfield")!;
	});
	after(() => removeContainer($container));

	it("should have a textbox role", () => {
		expect($textfield.getAttribute("role")).to.equal("textbox");
	});
});

