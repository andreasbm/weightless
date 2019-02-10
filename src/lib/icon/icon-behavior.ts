import { LitElement } from "lit-element";

export interface IIconBehaviorProperties {
}

export abstract class IconBehavior extends LitElement implements IIconBehaviorProperties {

	protected abstract role: string;

	/**
	 * Hooks up the component.
	 */
	connectedCallback () {
		super.connectedCallback();
		this.setAttribute("role", this.role);
	}
}