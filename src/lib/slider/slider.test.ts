import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "./slider";
import { Slider } from "./slider";

describe("wl-slider", () => {
	const { expect } = chai;
	let $slider: Slider;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<wl-slider></wl-slider>
		`;

		await waitForElements(["wl-slider"]);
		$slider = $container.querySelector<Slider>("wl-slider")!;
	});
	after(() => removeContainer($container));

	it("should have a slider role", () => {
		expect($slider.getAttribute("role")).to.equal("slider");
	});
});
