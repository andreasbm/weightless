import { IRoute } from "@appnest/web-router";

function iconPath (name: string): string {
	return `assets/icon/${name}.svg`;
}

export interface IRouteData {title: string, desc: string, img: string};
export const COMPONENTS_ROUTES: IRoute<IRouteData>[] = [
	{
		path: "button",
		component: () => import("./components/button-page"),
		data: {
			title: "Button",
			desc: "Trigger actions by clicking or tapping buttons.",
			img: iconPath("button")
		}
	},
	{
		path: "card",
		component: () => import("./components/card-page"),
		data: {
			title: "Card",
			desc: "Various card layout styles",
			img: iconPath("card")
		}
	},
	{
		path: "icon",
		component: () => import("./components/icon-page"),
		data: {
			title: "Icon",
			desc: "Use icons of various shapes and sizes",
			img: iconPath("icon")
		}
	},
	{
		path: "textfield",
		component: () => import("./components/textfield-page"),
		data: {
			title: "Textfield",
			desc: "Singleline text fields",
			img: iconPath("textfield")
		}
	},
	{
		path: "textarea",
		component: () => import("./components/textarea-page"),
		data: {
			title: "Textarea",
			desc: "Multiline text fields",
			img: iconPath("textarea")
		}
	},
	{
		path: "select",
		component: () => import("./components/select-page"),
		data: {
			title: "Select",
			desc: "Select one or more values from a set of options.",
			img: iconPath("select")
		}
	},
	{
		path: "checkbox",
		component: () => import("./components/checkbox-page"),
		data: {
			title: "Checkbox",
			desc: "Turn an option on or off.",
			img: iconPath("checkbox")
		}
	},
	{
		path: "radio",
		component: () => import("./components/radio-page"),
		data: {
			title: "Radio",
			desc: "Single selection controls",
			img: iconPath("radio_button")
		}
	},
	{
		path: "ripple",
		component: () => import("./components/ripple-page"),
		data: {
			title: "Ripple",
			desc: "Indicate touch actions",
			img: iconPath("ripple")
		}
	},
	{
		path: "title",
		component: () => import("./components/title-page"),
		data: {
			title: "Title",
			desc: "Indicate the start of a new section.",
			img: iconPath("typography")
		}
	},
	{
		path: "dialog",
		component: () => import("./components/dialog-page"),
		data: {
			title: "Dialog",
			desc: "Highly interruptive messages",
			img: iconPath("dialog")
		}
	},
	{
		path: "progress-spinner",
		component: () => import("./components/progress-spinner-page"),
		data: {
			title: "Progress Spinner",
			desc: "Fills a circle from 0% to 100%",
			img: iconPath("progress_spinner")
		}
	},
	{
		path: "progress-bar",
		component: () => import("./components/progress-bar-page"),
		data: {
			title: "Progress Bar",
			desc: "Fills a bar from 0% to 100%",
			img: iconPath("progress_bar")
		}
	},
	{
		path: "divider",
		component: () => import("./components/divider-page"),
		data: {
			title: "Divider",
			desc: "Thin line that groups content in lists and layouts",
			img: iconPath("divider")
		}
	},
	{
		path: "banner",
		component: () => import("./components/banner-page"),
		data: {
			title: "Banner",
			desc: "Non-interruptive messages",
			img: iconPath("banner")
		}
	},
	{
		path: "menu",
		component: () => import("./components/menu-page"),
		data: {
			title: "Menu",
			desc: "Coming soon",
			img: iconPath("menu")
		}
	},
	{
		path: "label",
		component: () => import("./components/label-page"),
		data: {
			title: "Label",
			desc: "Make form elements accessible",
			img: iconPath("label")
		}
	},
	{
		path: "theme",
		component: () => import("./components/theme-page"),
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
