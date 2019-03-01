import { ScreenshotOptions } from "puppeteer";

const path = require("path");
const puppeteer = require("puppeteer");
const fse = require("fs-extra");

interface Group {
	page: string;
	folder?: string;
	screenshots?: Screenshot[];
}

interface Screenshot {
	tag: string;
	name?: string;
	handle?: string;
	options?: ScreenshotOptions;
}

const ORIGIN = `https://pwa-test-10072.firebaseapp.com`;
const VIEWPORT = {width: 1000, height: 600, deviceScaleFactor: 2};
const SCREENSHOT_OPTIONS: ScreenshotOptions = {omitBackground: true, type: "png"};

/**
 * Screenshot instructions.
 */
const INSTRUCTIONS: Group[] = [
	{
		page: "button"
	},
	{
		page: "card"
	},
	{
		page: "popover"
	},
	{
		page: "dialog"
	}
];

/**
 * Returns an url for the demo path.
 * @param path
 */
function getDemoUrl (path: string): string {
	return `${ORIGIN}/demo/${path}`;
}

/**
 * Returns the page handle.
 * @param page
 * @param tag
 */
function getHandle (page: string, tag: string): string {
	return `document.querySelector('#router-slot > elements-page').shadowRoot.querySelector('#router > router-slot > ${page}-page').shadowRoot.querySelector('demo-element:nth-child(1) > code-example-element > ${tag}')`;
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
		await page.goto(getDemoUrl(instruction.page), {waitUntil: "networkidle2"});

		// Ensure that the screenshot path exists
		const instructionFolder = path.resolve(__dirname, instruction.folder || "");
		await fse.ensureDir(instructionFolder);

		// Take a screenshot of all the elements
		const screenshots = instruction.screenshots != null ? instruction.screenshots : [{tag: `${instruction.page}-element`}];
		for (const screenshot of screenshots) {
			const handle = `${screenshot.handle ? screenshot.handle : getHandle(instruction.page, screenshot.tag)}`;
			const $elem = await page.evaluateHandle(handle);

			const options = {
				...SCREENSHOT_OPTIONS,
				...(screenshot.options || {}),
			};

			await $elem.asElement()!.screenshot({
				...options,
				path: path.resolve(instructionFolder, `${screenshot.name || screenshot.tag}.${options.type}`)
			});
		}
	}

	await browser.close();
};


start().then();