import "../nav";
import "../button";
import { assignedNodesMap, createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import { NavElement } from "./nav-element";

describe("banner-element", () => {
	const {expect} = chai;
	let $nav: NavElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<nav-element shadow fixed>
			  <div slot="left">
				<img src="/my-logo.svg" alt="logo" />
			  </div>
			  <span slot="title">My app</span>
			  <div slot="right">
				<button-element>Sign in</button-element>
			  </div>
			</nav-element>`;

		await waitForElement("nav-element");
		$nav = $container.querySelector<NavElement>("nav-element")!;
	});
	after(() => removeContainer($container));

	it("should render the slots", async () => {
		const assignedNodes = assignedNodesMap($nav.shadowRoot!);

		expect(assignedNodes["left"].length).to.be.above(0);
		expect(assignedNodes["right"].length).to.be.above(0);
		expect(assignedNodes["title"].length).to.be.above(0);
	});

	it("should have a navigation role", () => {
		expect($nav.getAttribute("role")).to.equal("navigation");
	});
});

