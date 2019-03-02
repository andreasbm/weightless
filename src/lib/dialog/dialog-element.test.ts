import { assignedNodesMap, createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../button";
import "../dialog";
import "../title";
import { DialogElement } from "./dialog-element";

describe("dialog-element", () => {
	const {expect} = chai;
	let $dialog: DialogElement;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<dialog-element open>
				<title-element level="3" slot="header">This is a header</title-element>
				<div slot="content">
					<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
				</div>
				<div slot="footer">
					<button-element inverted flat>Cancel</button-element>
					<button-element>Okay</button-element>
				</div>
			</dialog-element>`;

		await waitForElements(["dialog-element", "button-element", "title-element"]);
		$dialog = $container.querySelector<DialogElement>("dialog-element")!;
	});
	after(() => removeContainer($container));

	it("should have dialog role", async () => {
		expect($dialog.getAttribute("role")).to.be.equal("dialog");
	});

	it("should render the slots", async () => {
		const assignedNodes = assignedNodesMap($dialog.shadowRoot!);

		expect(assignedNodes["header"].length).to.be.above(0);
		expect(assignedNodes["content"].length).to.be.above(0);
		expect(assignedNodes["footer"].length).to.be.above(0);
	});

	// TODO: Add more tests for the dialog
});

