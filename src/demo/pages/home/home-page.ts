import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";

import styles from "./home-page.scss";

@customElement("home-page")
export default class HomePage extends LitElement {

	static styles = [sharedStyles, cssResult(styles)];

	protected render () {
		return html`
			<p>HOME</p>
		`;
	}
}