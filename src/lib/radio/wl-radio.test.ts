import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../radio";
import { WlRadio } from "./wl-radio";

describe("wl-radio", () => {
	const {expect} = chai;
	let $radios: WlRadio[];
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<wl-radio name="food" value="salad"></wl-radio>
			<wl-radio name="food" value="burger"></wl-radio>
			<wl-radio name="food" value="pizza"></wl-radio>`;

		await waitForElements(["wl-radio"]);
		$radios = Array.from($container.querySelectorAll<WlRadio>("wl-radio"));
	});
	after(() => removeContainer($container));

	it("should have a radio role", () => {
		for (const $radio of $radios) {
			expect($radio.getAttribute("role")).to.equal("radio");
		}
	});
});

