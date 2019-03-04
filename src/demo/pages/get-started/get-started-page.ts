import { customElement, html, LitElement } from "lit-element";
import { cssResult } from "../../../lib/util/css";
import { sharedStyles } from "../../style/shared";
import "../../elements/container/container-element";
import "../../../lib/title/title-element";

import styles from "./get-started-page.scss";

@customElement("get-started-page")
export default class GetStartedPage extends LitElement {

	static styles = [sharedStyles, cssResult(styles)];

	protected render () {
		return html`
			<container-element id="main-container">
				<title-element class="title">Get Started</title-element>
				<p>asdpoaksdpoaksdpoaskd</p>
			</container-element>
		`;
	}
}