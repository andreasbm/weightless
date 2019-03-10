import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../textfield";
import { WlTextfield } from "./wl-textfield";

describe("wl-textfield", () => {
	const {expect} = chai;
	let $textfield: WlTextfield;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<wl-textfield></wl-textfield>
		`;

		await waitForElements(["wl-textfield"]);
		$textfield = $container.querySelector<WlTextfield>("wl-textfield")!;
	});
	after(() => removeContainer($container));

	it("should have a textbox role", () => {
		expect($textfield.getAttribute("role")).to.equal("textbox");
	});
});

