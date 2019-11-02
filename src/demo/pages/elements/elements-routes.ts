import { IRoute } from "@appnest/web-router";

function iconPath (name: string): string {
	return `assets/element/${name}.svg`;
}

function weightlessDocsURL (element: string): string {
	return `https://github.com/andreasbm/weightless/tree/master/src/lib/${element}`;
}

export interface IRouteData {
	title: string;
	desc: string;
	img: string;
	docs?: string;
}

export const COMPONENTS_ROUTES: IRoute<IRouteData>[] = [
	{
		path: "banner",
		component: () => import("./elements/banner-page"),
		data: {
			title: "Banner",
			desc: "Display a non-interruptive message and related optional actions.",
			img: iconPath("banner"),
			docs: weightlessDocsURL("banner")
		}
	},
	{
		path: "button",
		component: () => import("./elements/button-page"),
		data: {
			title: "Button",
			desc: "Allow users to take actions, and make choices, with a single tap.",
			img: iconPath("button"),
			docs: weightlessDocsURL("button")
		}
	},
	{
		path: "card",
		component: () => import("./elements/card-page"),
		data: {
			title: "Card",
			desc: "Group related content and action.",
			img: iconPath("card"),
			docs: weightlessDocsURL("card")
		}
	},
	{
		path: "checkbox",
		component: () => import("./elements/checkbox-page"),
		data: {
			title: "Checkbox",
			desc: "Turn an option on or off.",
			img: iconPath("checkbox"),
			docs: weightlessDocsURL("checkbox")
		}
	},
	{
		path: "dialog",
		component: () => import("./elements/dialog-page"),
		data: {
			title: "Dialog",
			desc: "Highly interruptive messages.",
			img: iconPath("dialog"),
			docs: weightlessDocsURL("dialog")
		}
	},
	{
		path: "divider",
		component: () => import("./elements/divider-page"),
		data: {
			title: "Divider",
			desc: "Thin line that groups content in lists and layouts.",
			img: iconPath("divider"),
			docs: weightlessDocsURL("divider")
		}
	},
	{
		path: "expansion",
		component: () => import("./elements/expansion-page"),
		data: {
			title: "Expansion",
			desc: "Provide an expandable details-summary view.",
			img: iconPath("expansion"),
			docs: weightlessDocsURL("expansion")
		}
	},
	{
		path: "form",
		component: () => import("./elements/form-page"),
		data: {
			title: "Form",
			desc: "Interact with the native <form> element to validate the inputs.",
			img: iconPath("form"),
			docs: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form"
		}
	},
	{
		path: "icon",
		component: () => import("./elements/icon-page"),
		data: {
			title: "Icon",
			desc: "Symbols for common actions and items.",
			img: iconPath("icon"),
			docs: weightlessDocsURL("icon")
		}
	},
	{
		path: "label",
		component: () => import("./elements/label-page"),
		data: {
			title: "Label",
			desc: "Make form elements more accessible.",
			img: iconPath("label"),
			docs: weightlessDocsURL("label")
		}
	},
	{
		path: "list-item",
		component: () => import("./elements/list-item-page"),
		data: {
			title: "List Item",
			desc: "Display an item in a list.",
			img: iconPath("list"),
			docs: weightlessDocsURL("list-item")
		}
	},
	{
		path: "nav",
		component: () => import("./elements/nav-page"),
		data: {
			title: "Navigation Bar",
			desc: "Provide access to destinations in your app.",
			img: iconPath("toolbar"),
			docs: weightlessDocsURL("nav")
		}
	},
	{
		path: "popover",
		component: () => import("./elements/popover-page"),
		data: {
			title: "Popover",
			desc: "Contextual anchored elements.",
			img: iconPath("menu"),
			docs: weightlessDocsURL("popover")
		}
	},
	{
		path: "progress-bar",
		component: () => import("./elements/progress-bar-page"),
		data: {
			title: "Progress Bar",
			desc: "Fills a bar from 0% to 100%.",
			img: iconPath("progress_bar"),
			docs: weightlessDocsURL("progress-bar")
		}
	},
	{
		path: "progress-spinner",
		component: () => import("./elements/progress-spinner-page"),
		data: {
			title: "Progress Spinner",
			desc: "Fills a circle from 0% to 100%.",
			img: iconPath("progress_spinner"),
			docs: weightlessDocsURL("progress-spinner")
		}
	},
	{
		path: "radio",
		component: () => import("./elements/radio-page"),
		data: {
			title: "Radio",
			desc: "Select one option from a set.",
			img: iconPath("radio_button"),
			docs: weightlessDocsURL("radio")
		}
	},
	{
		path: "ripple",
		component: () => import("./elements/ripple-page"),
		data: {
			title: "Ripple",
			desc: "Indicate touch actions.",
			img: iconPath("ripple"),
			docs: weightlessDocsURL("ripple")
		}
	},
	{
		path: "select",
		component: () => import("./elements/select-page"),
		data: {
			title: "Select",
			desc: "Select one or more values from a set of options.",
			img: iconPath("select"),
			docs: weightlessDocsURL("select")
		}
	},
	{
		path: "slider",
		component: () => import("./elements/slider-page"),
		data: {
			title: "Slider",
			desc: "Make selections from a range of values.",
			img: iconPath("slider"),
			docs: weightlessDocsURL("slider")
		}
	},
	{
		path: "snackbar",
		component: () => import("./elements/snackbar-page"),
		data: {
			title: "Snackbar",
			desc: "Provide brief messages at the bottom of the screen.",
			img: iconPath("snackbar"),
			docs: weightlessDocsURL("snackbar")
		}
	},
	{
		path: "switch",
		component: () => import("./elements/switch-page"),
		data: {
			title: "Switch",
			desc: "Turn an option on or off.",
			img: iconPath("switch"),
			docs: weightlessDocsURL("switch")
		}
	},
	{
		path: "tabs",
		component: () => import("./elements/tabs-page"),
		data: {
			title: "Tabs",
			desc: "Organize navigation between groups of content.",
			img: iconPath("tabs"),
			docs: weightlessDocsURL("tab")
		}
	},
	{
		path: "text",
		component: () => import("./elements/text-page"),
		data: {
			title: "Text",
			desc: "Group text into paragraphs.",
			img: iconPath("text"),
			docs: weightlessDocsURL("text")
		}
	},
	{
		path: "textarea",
		component: () => import("./elements/textarea-page"),
		data: {
			title: "Textarea",
			desc: "Multiline text fields.",
			img: iconPath("textarea"),
			docs: weightlessDocsURL("textarea")
		}
	},
	{
		path: "textfield",
		component: () => import("./elements/textfield-page"),
		data: {
			title: "Textfield",
			desc: "Singleline text fields.",
			img: iconPath("textfield"),
			docs: weightlessDocsURL("textfield")
		}
	},
	{
		path: "theme",
		component: () => import("./elements/theme-page"),
		data: {
			title: "Theme",
			desc: "Customize every element to fit your brand",
			img: iconPath("theme"),
			docs: weightlessDocsURL("style")
		}
	},
	{
		path: "title",
		component: () => import("./elements/title-page"),
		data: {
			title: "Title",
			desc: "Indicate the start of a new section.",
			img: iconPath("typography"),
			docs: weightlessDocsURL("title")
		}
	},
	{
		path: "tooltip",
		component: () => import("./elements/tooltip-page"),
		data: {
			title: "Tooltip",
			desc: "Informative context related text",
			img: iconPath("tooltip"),
			docs: weightlessDocsURL("tooltip")
		}
	},
	{
		path: "**",
		redirectTo: "button"
	}
];
