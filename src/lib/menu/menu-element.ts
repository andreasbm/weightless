import { FocusTrap } from "@appnest/focus-trap";
import { customElement, html, query, TemplateResult } from "lit-element";
import { BackdropElement } from "../backdrop/backdrop-element";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { MenuBehavior } from "./menu-behavior";

import styles from "./menu-element.scss";

@customElement("menu-element")
export class MenuElement<R> extends MenuBehavior<R> {
	static styles = [sharedStyles, cssResult(styles)];
	protected role = "menu";

	@query("#container") $focusTrap: FocusTrap;
	@query("#container") $container: HTMLElement;
	@query("#bounding-box") $boundingBox: HTMLElement;
	@query("#content") $content: HTMLElement;
	@query("#backdrop") $backdrop: BackdropElement;

	/**
	 * Renders the content.
	 */
	protected renderContent (): TemplateResult {
		return html`<slot></slot>`;
	}

	/**
	 * Returns the template for the component.
	 */
	protected render (): TemplateResult {
		return html`
			<div id="bounding-box">
				<focus-trap id="container" ?aria-expanded="${this.open}">
					<div id="content" inactive="${!this.open}">
						${this.renderContent()}
					</div>
				</focus-trap>
			</div>
			<backdrop-element id="backdrop" @click="${() => this.backdropClick()}"></backdrop-element>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"menu-element": MenuElement<any>;
	}
}
