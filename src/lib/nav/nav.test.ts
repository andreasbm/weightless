import "../nav";
import "../button";
import { assignedNodesMap, createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import { Nav } from "./nav";

describe("wl-banner", () => {
	const { expect } = chai;
	let $nav: Nav;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<wl-nav shadow fixed>
			  <div slot="left">
				<img src="/my-logo.svg" alt="logo" />
			  </div>
			  <span slot="title">My app</span>
			  <div slot="right">
				<wl-button>Sign in</wl-button>
			  </div>
			</wl-nav>`;

		await waitForElement("wl-nav");
		$nav = $container.querySelector<Nav>("wl-nav")!;
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
