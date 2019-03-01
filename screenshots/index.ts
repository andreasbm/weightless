const path = require("path");
const puppeteer = require("puppeteer");
const fse = require("fs-extra");

interface Group {
	path: string;
	screenshots: Screenshot[];
	handle: string;
}

interface Screenshot {
	name: string;
	handle: string;
}

const ORIGIN = `https://pwa-test-10072.firebaseapp.com`;
const VIEWPORT = {width: 1000, height: 600, deviceScaleFactor: 2};
const SCREENSHOT_OPTIONS = {omitBackground: true};

/**
 * Screenshot instructions.
 */
const INSTRUCTIONS: Group[] = [
	{
		path: "button",
		handle: `document.querySelector('#router-slot > elements-page').shadowRoot.querySelector('#router > router-slot > button-page')`,
		screenshots: [
			{
				name: "default",
				handle: `shadowRoot.querySelector('demo-element:nth-child(1) > code-example-element > button-element')`
			}
		]
	}
];

/**
 * Returns an url for the demo path.
 * @param path
 */
function getDemoUrl (path: string) {
	return `${ORIGIN}/demo/${path}`;
}

/**
 * Runs through the instructions and take screenshots.
 */
const start = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setViewport(VIEWPORT);

	// Go through all of the instructions
	for (const instruction of INSTRUCTIONS) {
		await page.goto(getDemoUrl(instruction.path), {waitUntil: "networkidle2"});

		// Ensure that the screenshot path exists
		const instructionFolder = path.resolve(__dirname, instruction.path);
		await fse.ensureDir(instructionFolder);

		// Take a screenshot of all the elements
		for (const screenshot of instruction.screenshots) {
			const handle = `${instruction.handle}.${screenshot.handle}`;
			const $elem = await page.evaluateHandle(handle);

			await $elem.asElement()!.screenshot({
				...SCREENSHOT_OPTIONS,
				path: path.resolve(instructionFolder, `${screenshot.name}.png`)
			});
		}
	}

	await browser.close();
};


start().then();