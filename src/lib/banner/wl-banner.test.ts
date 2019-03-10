import "../banner";
import "../button";
import "../icon";
import { assignedNodesMap, createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import { WlBanner } from "./wl-banner";

describe("wl-banner", () => {
	const {expect} = chai;
	let $banner: WlBanner;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<wl-banner>
			  <wl-icon slot="icon">account_box</wl-icon>
			  <span slot="text">Your password was updated on your other device. Please sign in again.</span>
			  <wl-button slot="action" flat inverted>Continue as guest</wl-button>
			  <wl-button slot="action" flat inverted>Sign in</wl-button>
			</wl-banner>`;

		await waitForElement("wl-banner");
		$banner = $container.querySelector<WlBanner>("wl-banner")!;
	});
	after(() => removeContainer($container));

	it("should render the slots", async () => {
		const assignedNodes = assignedNodesMap($banner.shadowRoot!);

		expect(assignedNodes["icon"].length).to.be.above(0);
		expect(assignedNodes["text"].length).to.be.above(0);
		expect(assignedNodes["action"].length).to.be.above(0);
	});

	/**
	 * ARIA TESTS: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Banner_role
	 */
	it("should have a banner role", () => {
		expect($banner.getAttribute("role")).to.equal("banner");
	});
});

