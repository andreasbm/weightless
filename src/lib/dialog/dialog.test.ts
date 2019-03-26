import { assignedNodesMap, createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../button";
import "../dialog";
import "../title";
import { Dialog } from "./dialog";

describe("wl-dialog", () => {
	const {expect} = chai;
	let $dialog: Dialog;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<wl-dialog open>
				<wl-title level="3" slot="header">This is a header</wl-title>
				<div slot="content">
					<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
				</div>
				<div slot="footer">
					<wl-button inverted flat>Cancel</wl-button>
					<wl-button>Okay</wl-button>
				</div>
			</wl-dialog>`;

		await waitForElements(["wl-dialog", "wl-button", "wl-title"]);
		$dialog = $container.querySelector<Dialog>("wl-dialog")!;
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

