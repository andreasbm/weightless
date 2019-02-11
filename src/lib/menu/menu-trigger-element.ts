import { customElement, html, LitElement, property, TemplateResult } from "lit-element";

export interface IMenuTriggerElementProperties {
	query: string;
	open: boolean;
}

@customElement("menu-trigger-element")
export class MenuTriggerElement extends LitElement {
	@property({type: String}) target: string;
	@property({type: Boolean, reflect: true}) open = false;

	updated (props: Map<keyof IMenuTriggerElementProperties, unknown>) {
		super.updated(props);

		if (props.has("open")) {
			const $target = this.queryTarget(this.target);
			console.log($target);
		}
	}

	protected queryTarget (query: string) {
		const $parent = this.parentElement!;
		return $parent.querySelector(query);
	}

	render (): TemplateResult {
		return html`<slot></slot>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"menu-trigger-element": MenuTriggerElement;
	}
}