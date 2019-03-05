export const GITHUB_URL = `https://github.com/andreasbm/weightless`;
export const NPM_URL = `https://www.npmjs.com/package/@weightless/all`;

export interface IBullet {
	title: string;
	text: string;
	img: string;
}

export const BULLETS: IBullet[] = [
	{
		title: "Themable",
		text: "Every element is highly customizable. Change the theme with a few lines of code to fit your branding.",
		img: "themable"
	},
	{
		title: "Up-to-date",
		text: "Based on the newest web standards which makes every element future prove.",
		img: "up-to-date"
	},
	{
		title: "Easy to consume",
		text: "Requires no configuration. Drop any element into the DOM and have it working without doing anything else.",
		img: "consume"
	},
	{
		title: "Encapsulated",
		text: "Built without any global styles. You can expect all elements to look the same no matter where they are used.",
		img: "encapsulated"
	},
	{
		title: "Framework-agnostic",
		text: "Built as web components which ensures JavaScript framework cross-compatibility.",
		img: "framework-agnostic"
	},
	{
		title: "Well-tested",
		text: "Every element have a set of automated tests which are run every time the code changes.",
		img: "well-tested"
	},
	{
		title: "Documented",
		text: "Comes with in-depth documentation and guides.",
		img: "documented"
	},
	{
		title: "Free forever",
		text: "The code is open sourced and completely free for you to use.",
		img: "free-forever"
	},
	{
		title: "Lightweight",
		text: "Every element comes with a minimal footprint. You won't have to load unncessary code here.",
		img: "lightweight"
	},
	{
		title: "Accessible",
		text: "All elements must follow the best practices when it comes to accessibility.",
		img: "accessible"
	},
	{
		title: "Performant",
		text: "Every element is optimized for performance.",
		img: "performant"
	},
];