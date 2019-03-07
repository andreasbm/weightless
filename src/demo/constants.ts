export const GITHUB_URL = `https://github.com/andreasbm/weightless`;
export const NPM_URL = `https://www.npmjs.com/package/@weightless/all`;
export const TWITTER_URL = `https://twitter.com/andreasmehlsen`;
export interface IBullet {
	title: string;
	text: string;
	img: string;
}

export interface IBrowserSupport {
	text: string;
	img: string;
}

export const BULLETS: IBullet[] = [
	{
		title: "Up-to-date",
		text: "Based on the newest web standards which makes every element future prove.",
		img: "crystal"
	},
	{
		title: "Easy to consume",
		text: "Drop any element into the DOM and have it working without doing anything else.",
		img: "pacman"
	},
	{
		title: "Encapsulated",
		text: "You can expect all elements to look the same no matter where they are used.",
		img: "shield"
	},
	{
		title: "Themable",
		text: "Every element is highly customizable. Change the theme with a few lines of code to fit your branding.",
		img: "palette"
	},
	{
		title: "Well-tested",
		text: "Every element have a set of automated tests which are run every time the code changes.",
		img: "testing"
	},
	{
		title: "Framework-agnostic",
		text: "Built as web components which ensures JavaScript framework cross-compatibility.",
		img: "frameworks"
	},
	{
		title: "Accessible",
		text: "All elements follow the best practices when it comes to accessibility.",
		img: "key"
	},
	{
		title: "Documented",
		text: "Comes with in-depth documentation and guides.",
		img: "document"
	},
	{
		title: "Free forever",
		text: "The code is open sourced and completely free for you to use.",
		img: "party"
	},
	{
		title: "Lightweight",
		text: "Every element comes with a minimal footprint.",
		img: "feather"
	},
	{
		title: "Performant",
		text: "Every element is optimized for performance.",
		img: "speed"
	},
	{
		title: "Maintained",
		text: "The library is actively maintained and is evolving.",
		img: "laptop"
	}
];

export const BROWSER_SUPPORT: IBrowserSupport[] = [
	{
		img: "chrome",
		text: "Chrome"
	},
	{
		img: "opera",
		text: "Opera"
	},
	{
		img: "safari",
		text: "Safari"
	},
	{
		img: "firefox",
		text: "Firefox"
	},
	{
		img: "edge",
		text: "Edge / IE11+"
	}
];