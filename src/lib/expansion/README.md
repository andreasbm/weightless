
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#wl-expansion)

# ➤ wl-expansion

Provide an expandable details-summary view.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#properties)

## ➤ Properties

| Property            | Attribute       | Type          | Default       | Description                                      |
|---------------------|-----------------|---------------|---------------|--------------------------------------------------|
| `$content`          |                 | `HTMLElement` | **required**  | Reference to the content element.                |
| `$contentContainer` |                 | `HTMLElement` | **required**  | Reference to the content container element.      |
| `$header`           |                 | `HTMLElement` | **required**  | Reference to the header element.                 |
| `$ripple`           |                 | `WlRipple`    | **required**  | Reference to the ripple element.                 |
| `ariaChecked`       | `aria-expanded` | `string`      |               | Aria expanded attribute.                         |
| `checked`           | `open`          | `boolean`     | false         | Opens the expansion.                             |
| `disabled`          | `disabled`      | `boolean`     | false         | Disables the element.                            |
| `duration`          | `duration`      | `number`      | 180           | The duration of the animations.                  |
| `icon`              | `icon`          | `string`      | "expand_more" | Icon name.                                       |
| `name`              | `name`          | `string`      | **required**  | Name of the native form element.                 |
| `noRipple`          | `noRipple`      | `boolean`     | false         | Deactivates the ripple.                          |
| `readonly`          | `readonly`      | `boolean`     | false         | Makes the element readonly (disabled but tabbable) |
| `required`          | `required`      | `boolean`     | false         | Makes the element required in a form context.    |
| `role`              | `role`          | `AriaRole`    | "radio"       | Role of the radio behavior.                      |
| `space`             | `space`         | `boolean`     | false         | Adds space beneath the expansion.                |
| `value`             | `value`         | `string`      | false         | Value of the form element.                       |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#css-custom-properties)

## ➤ CSS Custom Properties

| Property                               | Description                        |
|----------------------------------------|------------------------------------|
| `--expansion-bg`                       | Background.                        |
| `--expansion-color`                    | Color.                             |
| `--expansion-content-padding`          | Padding of the default slot.       |
| `--expansion-elevation`                | Box shadow.                        |
| `--expansion-elevation-open`           | Box shadow when open.              |
| `--expansion-header-bg-hover`          | Background of the header on hover. |
| `--expansion-header-description-color` | Color of the description slot.     |
| `--expansion-header-height`            | Default height of the header.      |
| `--expansion-header-height-open`       | Height of the header when opened.  |
| `--expansion-header-padding`           | Padding of the header.             |
| `--expansion-header-title-margin`      | Margin of the title slot.          |
| `--expansion-header-transition`        | Transition of the header.          |
| `--expansion-icon-transition`          | Transition of the icon.            |
| `--expansion-margin-open`              | Margin when open.                  |
| `--expansion-transition`               | Transition.                        |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#slots)

## ➤ Slots

| Name          | Description                            |
|---------------|----------------------------------------|
|               | Default content.                       |
| `description` | Description to the left on the header. |
| `indicator`   | Content to the right on the header.    |
| `title`       | Title to the left on the header.       |



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#usage)

## ➤ Usage

Go [here](https://weightless.dev/elements/expansion) to try the demo.

<a href="https://weightless.dev/elements/expansion" align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/elements/master/screenshots/wl-expansion.png" width="700" />
</a>


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributors)

## ➤ Contributors
	
|[<img alt="Andreas Mehlsen" src="https://avatars1.githubusercontent.com/u/6267397?s=460&v=4" width="100">](https://twitter.com/andreasmehlsen) | [<img alt="You?" src="https://joeschmoe.io/api/v1/random" width="100">](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md)|
|:---: | :---:|
|[Andreas Mehlsen](https://twitter.com/andreasmehlsen) | [You?](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md)|

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).