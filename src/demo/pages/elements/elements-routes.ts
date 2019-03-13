import { IRoute } from "@appnest/web-router";

function iconPath (name: string): string {
	return `assets/element/${name}.svg`;
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
			img: iconPath("banner")
		}
	},
	{
		path: "button",
		component: () => import("./elements/button-page"),
		data: {
			title: "Button",
			desc: "Allow users to take actions, and make choices, with a single tap.",
			img: iconPath("button")
		}
	},
	{
		path: "card",
		component: () => import("./elements/card-page"),
		data: {
			title: "Card",
			desc: "Group related content and action.",
			img: iconPath("card")
		}
	},
	{
		path: "checkbox",
		component: () => import("./elements/checkbox-page"),
		data: {
			title: "Checkbox",
			desc: "Turn an option on or off.",
			img: iconPath("checkbox")
		}
	},
	{
		path: "dialog",
		component: () => import("./elements/dialog-page"),
		data: {
			title: "Dialog",
			desc: "Highly interruptive messages.",
			img: iconPath("dialog")
		}
	},
	{
		path: "divider",
		component: () => import("./elements/divider-page"),
		data: {
			title: "Divider",
			desc: "Thin line that groups content in lists and layouts.",
			img: iconPath("divider")
		}
	},
	{
		path: "expansion",
		component: () => import("./elements/expansion-page"),
		data: {
			title: "Expansion",
			desc: "Provide an expandable details-summary view",
			img: iconPath("expansion")
		}
	},
	{
		path: "icon",
		component: () => import("./elements/icon-page"),
		data: {
			title: "Icon",
			desc: "Symbols for common actions and items.",
			img: iconPath("icon")
		}
	},
	{
		path: "label",
		component: () => import("./elements/label-page"),
		data: {
			title: "Label",
			desc: "Make form elements more accessible.",
			img: iconPath("label")
		}
	},
	{
		path: "list-item",
		component: () => import("./elements/list-item-page"),
		data: {
			title: "List Item",
			desc: "Display an item in a list.",
			img: iconPath("list")
		}
	},
	// Nav here
	{
		path: "popover",
		component: () => import("./elements/popover-page"),
		data: {
			title: "Popover",
			desc: "Contextual anchored elements.",
			img: iconPath("menu")
		}
	},
	{
		path: "progress-bar",
		component: () => import("./elements/progress-bar-page"),
		data: {
			title: "Progress Bar",
			desc: "Fills a bar from 0% to 100%.",
			img: iconPath("progress_bar")
		}
	},
	{
		path: "progress-spinner",
		component: () => import("./elements/progress-spinner-page"),
		data: {
			title: "Progress Spinner",
			desc: "Fills a circle from 0% to 100%.",
			img: iconPath("progress_spinner")
		}
	},
	{
		path: "radio",
		component: () => import("./elements/radio-page"),
		data: {
			title: "Radio",
			desc: "Select one option from a set.",
			img: iconPath("radio_button")
		}
	},
	{
		path: "ripple",
		component: () => import("./elements/ripple-page"),
		data: {
			title: "Ripple",
			desc: "Indicate touch actions.",
			img: iconPath("ripple")
		}
	},
	{
		path: "select",
		component: () => import("./elements/select-page"),
		data: {
			title: "Select",
			desc: "Select one or more values from a set of options.",
			img: iconPath("select")
		}
	},
	{
		path: "textarea",
		component: () => import("./elements/textarea-page"),
		data: {
			title: "Textarea",
			desc: "Multiline text fields.",
			img: iconPath("textarea")
		}
	},
	{
		path: "textfield",
		component: () => import("./elements/textfield-page"),
		data: {
			title: "Textfield",
			desc: "Singleline text fields.",
			img: iconPath("textfield")
		}
	},
	{
		path: "theme",
		component: () => import("./elements/theme-page"),
		data: {
			title: "Theme",
			desc: "Customize every element to fit your brand",
			img: iconPath("theme"),
			docs: "style"
		}
	},
	{
		path: "title",
		component: () => import("./elements/title-page"),
		data: {
			title: "Title",
			desc: "Indicate the start of a new section.",
			img: iconPath("typography")
		}
	},
	{
		path: "tooltip",
		component: () => import("./elements/tooltip-page"),
		data: {
			title: "Tooltip",
			desc: "Informative context related text",
			img: iconPath("tooltip")
		}
	},
	{
		path: "**",
		redirectTo: "button"
	}
];
