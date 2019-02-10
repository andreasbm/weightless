import { FocusTrap } from "@appnest/focus-trap";
import "@appnest/focus-trap";
import { customElement, html, query, TemplateResult } from "lit-element";
import { sharedStyles } from "../style/shared";
import { cssResult } from "../util/css";
import { DialogBehavior, IDialogBehaviorProperties } from "./dialog-behavior";
import styles from "./dialog-element.scss";
import "../backdrop";

@customElement("dialog-element")
export class DialogElement<R = any> extends DialogBehavior<R, Partial<IDialogBehaviorProperties>> {

	static styles = [cssResult(styles), sharedStyles];
	protected role = "dialog";

	@query("#dialog") $focusTrap: FocusTrap;
	@query("#dialog") $dialog: HTMLElement;
	@query("#backdrop") $backdrop: HTMLElement;

	render (): TemplateResult {
		return html`
			<focus-trap id="dialog" ?inactive="${!this.open}">
				<slot name="header"></slot>
				<slot name="content"></slot>
				<slot></slot>
				<slot name="footer"></slot>
			</focus-trap>
			<backdrop-element id="backdrop" @click="${() => this.backdropClick()}"></backdrop-element>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"dialog-element": DialogElement<any>;
	}
}