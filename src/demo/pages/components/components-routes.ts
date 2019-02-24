import { IRoute } from "@appnest/web-router";

function iconPath (name: string): string {
	return `assets/icon/${name}.svg`;
}

export interface IRouteData {title: string, desc: string, img: string};
export const COMPONENTS_ROUTES: IRoute<IRouteData>[] = [
	{
		path: "button",
		component: () => import("./elements/button-page"),
		data: {
			title: "Button",
			desc: "Trigger actions by clicking or tapping buttons.",
			img: iconPath("button")
		}
	},
	{
		path: "card",
		component: () => import("./elements/card-page"),
		data: {
			title: "Card",
			desc: "Various card layout styles",
			img: iconPath("card")
		}
	},
	{
		path: "icon",
		component: () => import("./elements/icon-page"),
		data: {
			title: "Icon",
			desc: "Use icons of various shapes and sizes",
			img: iconPath("icon")
		}
	},
	{
		path: "textfield",
		component: () => import("./elements/textfield-page"),
		data: {
			title: "Textfield",
			desc: "Singleline text fields",
			img: iconPath("textfield")
		}
	},
	{
		path: "textarea",
		component: () => import("./elements/textarea-page"),
		data: {
			title: "Textarea",
			desc: "Multiline text fields",
			img: iconPath("textarea")
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
		path: "checkbox",
		component: () => import("./elements/checkbox-page"),
		data: {
			title: "Checkbox",
			desc: "Turn an option on or off.",
			img: iconPath("checkbox")
		}
	},
	{
		path: "radio",
		component: () => import("./elements/radio-page"),
		data: {
			title: "Radio",
			desc: "Single selection controls",
			img: iconPath("radio_button")
		}
	},
	{
		path: "ripple",
		component: () => import("./elements/ripple-page"),
		data: {
			title: "Ripple",
			desc: "Indicate touch actions",
			img: iconPath("ripple")
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
		path: "dialog",
		component: () => import("./elements/dialog-page"),
		data: {
			title: "Dialog",
			desc: "Highly interruptive messages",
			img: iconPath("dialog")
		}
	},
	{
		path: "progress-spinner",
		component: () => import("./elements/progress-spinner-page"),
		data: {
			title: "Progress Spinner",
			desc: "Fills a circle from 0% to 100%",
			img: iconPath("progress_spinner")
		}
	},
	{
		path: "progress-bar",
		component: () => import("./elements/progress-bar-page"),
		data: {
			title: "Progress Bar",
			desc: "Fills a bar from 0% to 100%",
			img: iconPath("progress_bar")
		}
	},
	{
		path: "divider",
		component: () => import("./elements/divider-page"),
		data: {
			title: "Divider",
			desc: "Thin line that groups content in lists and layouts",
			img: iconPath("divider")
		}
	},
	{
		path: "banner",
		component: () => import("./elements/banner-page"),
		data: {
			title: "Banner",
			desc: "Non-interruptive messages",
			img: iconPath("banner")
		}
	},
	{
		path: "menu",
		component: () => import("./elements/menu-page"),
		data: {
			title: "Menu",
			desc: "Coming soon",
			img: iconPath("menu")
		}
	},
	{
		path: "label",
		component: () => import("./elements/label-page"),
		data: {
			title: "Label",
			desc: "Make form elements accessible",
			img: iconPath("label")
		}
	},
	{
		path: "theme",
		component: () => import("./elements/theme-page"),
		data: {
			title: "Theme",
			desc: "Swap out the colors",
			img: iconPath("theme")
		}
	},
	{
		path: "**",
		redirectTo: "button"
	}
];
