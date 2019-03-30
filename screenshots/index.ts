import { ScreenshotOptions } from "puppeteer";

const path = require("path");
const puppeteer = require("puppeteer");

const ORIGIN = `https://weightless.dev`;
const VIEWPORT = {width: 1000, height: 1000, deviceScaleFactor: 2};
const SCREENSHOT_OPTIONS: ScreenshotOptions = {omitBackground: true, type: "png"};

const ELEMENTS = [
	"banner",
	"button",
	"card",
	"checkbox",
	"dialog",
	"divider",
	"expansion",
	"icon",
	"label",
	"list-item",
	"nav",
	"popover",
	"progress-bar",
	"progress-spinner",
	"radio",
	"ripple",
	"select",
	"slider",
	"snackbar",
	"switch",
	"textarea",
	"textfield",
	"title",
	"tooltip"
];

/**
 * Returns an url for the demo path.
 * @param elem
 */
function getDemoUrl (elem: string): string {
	return `${ORIGIN}/elements/${elem}`;
}

/**
 * Returns the page handle.
 * @param elem
 */
function getHandle (elem: string): string {
	return `document.querySelector('#router-slot > elements-page').shadowRoot.querySelector('#router > router-slot > ${elem}-page').shadowRoot.querySelector('demo-element[default]')`;
}

/**
 * Waits.
 * @param ms
 */
async function wait (ms: number) {
	return new Promise(res => {
		setTimeout(res, ms);
	})
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
		console.log(`> "${elem}" screenshot...`);

		await page.goto(getDemoUrl(elem), {waitUntil: "networkidle2"});

		// Add 300ms timeout instead of customElements.whenDefined(..)
		await wait(300);

		const $elem = await page.evaluateHandle(getHandle(elem));

		const options = {
			...SCREENSHOT_OPTIONS,
		};

		await $elem.asElement()!.screenshot({
			...options,
			path: path.resolve(__dirname, `wl-${elem}.${options.type}`)
		});
	}

	await browser.close();
};


start().then();

