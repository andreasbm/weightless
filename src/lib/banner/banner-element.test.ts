import "../banner";
import "../button";
import "../icon";
import { assignedNodesMap, createContainer, removeContainer, waitForElement } from "../../test/testing-helpers";
import { BannerElement } from "./banner-element";

describe("banner-element", () => {
	const {expect} = chai;
	let $banner: BannerElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<banner-element>
			  <icon-element slot="icon">account_box</icon-element>
			  <span slot="text">Your password was updated on your other device. Please sign in again.</span>
			  <button-element slot="action" flat inverted>Continue as guest</button-element>
			  <button-element slot="action" flat inverted>Sign in</button-element>
			</banner-element>`;

		await waitForElement("banner-element");
		$banner = $container.querySelector<BannerElement>("banner-element")!;
	});
	after(() => removeContainer($container));

	it("should render the slots", async () => {
		const assignedNodes = assignedNodesMap($banner.shadowRoot!);

		expect(assignedNodes["icon"].length).to.equal(1);
		expect(assignedNodes["text"].length).to.equal(1);
		expect(assignedNodes["action"].length).to.equal(2);
	});

	/**
	 * ARIA TESTS: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Banner_role
	 */
	it("should have a button banner", () => {
		expect($banner.getAttribute("role")).to.equal("banner");
	});
});

