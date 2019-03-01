import { ScreenshotOptions } from "puppeteer";

const path = require("path");
const puppeteer = require("puppeteer");
const fse = require("fs-extra");

interface Group {
	path: string;
	screenshots: Screenshot[];
}

interface Screenshot {
	name: string;
	handle: string;
	options?: ScreenshotOptions;
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
		screenshots: [
			{
				name: "default",
				handle: `shadowRoot.querySelector('demo-element:nth-child(1) > code-example-element > button-element')`
			},
			{
				name: "inverted",
				handle: `shadowRoot.querySelector('demo-element:nth-child(3) > code-example-element > button-element:nth-child(1)')`
			},
			{
				name: "outlined",
				handle: `shadowRoot.querySelector('demo-element:nth-child(3) > code-example-element > button-element:nth-child(2)')`
			},
			{
				name: "flat-inverted",
				handle: `shadowRoot.querySelector('demo-element:nth-child(3) > code-example-element > button-element:nth-child(3)')`
			},
			{
				name: "flat-inverted-outlined",
				handle: `shadowRoot.querySelector('demo-element:nth-child(3) > code-example-element > button-element:nth-child(4)')`
			}
		]
	},
	{
		path: "card",
		screenshots: [
			{
				name: "default",
				handle: `shadowRoot.querySelector('demo-element:nth-child(1) > code-example-element > card-element')`
			}
		]
	},
	{
		path: "popover",
		screenshots: [
			{
				name: "default",
				handle: `shadowRoot.querySelector('demo-element:nth-child(1) > code-example-element > popover-element')`
			}
		]
	},
	{
		path: "dialog",
		screenshots: [
			{
				name: "default",
				handle: `shadowRoot.querySelector('demo-element:nth-child(1) > code-example-element > dialog-element')`
			}
		]
	}
];

/**
 * Returns an url for the demo path.
 * @param path
 */
function getDemoUrl (path: string): string {
	return `${ORIGIN}/demo/${path}`;
}

function getPageHandle (name: string): string {
	return `document.querySelector('#router-slot > elements-page').shadowRoot.querySelector('#router > router-slot > ${name}-page')`;
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
			const handle = `${getPageHandle(instruction.path)}.${screenshot.handle}`;
			const $elem = await page.evaluateHandle(handle);

			await $elem.asElement()!.screenshot({
				...SCREENSHOT_OPTIONS,
				...(screenshot.options || {}),
				path: path.resolve(instructionFolder, `${screenshot.name}.png`)
			});
		}
	}

	await browser.close();
};


start().then();