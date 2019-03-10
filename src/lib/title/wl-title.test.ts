import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../title";
import { WlTitle, TitleLevel } from "./wl-title";

describe("wl-title", () => {
	const {expect} = chai;
	let $title: WlTitle;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<wl-title></wl-title>
		`;

		await waitForElements(["wl-title"]);
		$title = $container.querySelector<WlTitle>("wl-title")!;
	});
	after(() => removeContainer($container));

	it("should have a heading role", () => {
		expect($title.getAttribute("role")).to.equal("heading");
	});


	it("should reflect aria-level", async () => {

		// Asserts that the aria attribute is set
		async function assertAriaLevel ($title: WlTitle, level: TitleLevel) {
			$title.level = level;
			await $title.updateComplete;
			expect($title.getAttribute("aria-level")).to.equal(level.toString());
		}

		await assertAriaLevel($title, 1);
		await assertAriaLevel($title, 2);
		await assertAriaLevel($title, 3);
		await assertAriaLevel($title, 4);
		await assertAriaLevel($title, 5);
		await assertAriaLevel($title, 6);
	});
});

