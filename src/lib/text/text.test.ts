import { createContainer, removeContainer, waitForElements } from "../../test/testing-helpers";
import "../text";
import { Text } from "./text";

describe("wl-text", () => {
	const { expect } = chai;
	let $text: Text;
	let $container: HTMLElement;

	before(() => {
		$container = createContainer();
	});
	beforeEach(async () => {
		$container.innerHTML = `
			<wl-text></wl-text>
		`;

		await waitForElements(["wl-text"]);
		$text = $container.querySelector<Text>("wl-text")!;
	});
	after(() => removeContainer($container));
});
