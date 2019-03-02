import { ScreenshotOptions } from "puppeteer";

const path = require("path");
const puppeteer = require("puppeteer");

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
const VIEWPORT = {width: 1000, height: 1000, deviceScaleFactor: 2};
const SCREENSHOT_OPTIONS: ScreenshotOptions = {omitBackground: true, type: "png"};

const ELEMENTS = [
	"button",
	"dialog",
	"card",
	"popover"
];

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
 * @param elem
 */
function getDemoUrl (elem: string): string {
	return `${ORIGIN}/demo/${elem}`;
}

/**
 * Returns the page handle.
 * @param elem
 */
function getHandle (elem: string): string {
	return `document.querySelector('#router-slot > elements-page').shadowRoot.querySelector('#router > router-slot > ${elem}-page').shadowRoot.querySelector('demo-element:nth-child(1)')`;
}

/**
 * Runs through the instructions and take screenshots.
 */
const start = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setViewport(VIEWPORT);

	// Go through all of the instructions
	for (const elem of ELEMENTS) {
		await page.goto(getDemoUrl(elem), {waitUntil: "networkidle2"});

		const $elem = await page.evaluateHandle(getHandle(elem));

		const options = {
			...SCREENSHOT_OPTIONS,
		};

		await $elem.asElement()!.screenshot({
			...options,
			path: path.resolve(__dirname, `${elem}-element.${options.type}`)
		});
	}

	await browser.close();
};


start().then();