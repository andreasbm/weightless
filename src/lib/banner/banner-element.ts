import { customElement, html } from "lit-element";
import { TemplateResult } from "lit-html";

import "../divider";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { BannerBehavior } from "./banner-behavior";

import styles from "./banner-element.scss";

@customElement("banner-element")
export class BannerElement extends BannerBehavior {

	static styles = [cssResult(styles), sharedStyles];

	protected render (): TemplateResult {
		return html`
		<div id="content">
			<slot name="icon"></slot>
			<slot name="text"></slot>
		</div>
		<div id="actions">
			<slot name="action"></slot>
		</div>
		<divider-element id="divider"></divider-element>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"banner-element": BannerElement;
	}
}
