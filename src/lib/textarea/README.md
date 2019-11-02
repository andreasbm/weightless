
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#wl-textarea)

# ➤ wl-textarea

Multiline text fields.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#properties)

## ➤ Properties

| Property        | Attribute       | Type                         | Default   | Description                                      |
|-----------------|-----------------|------------------------------|-----------|--------------------------------------------------|
| `autocomplete`  | `autocomplete`  | `"on" \| "off" \| undefined` |           | Whether autocomplete is on or off.               |
| `disabled`      | `disabled`      | `boolean`                    |           | Disables the element.                            |
| `filled`        | `filled`        | `boolean`                    |           | Fills the input with a solid color.              |
| `label`         | `label`         | `string \| undefined`        |           | Label text.                                      |
| `maxLength`     | `maxLength`     | `number \| undefined`        |           | Max value length.                                |
| `minLength`     | `minLength`     | `number \| undefined`        |           | Min value length.                                |
| `name`          | `name`          | `string \| undefined`        |           | Name of the native form element.                 |
| `outlined`      | `outlined`      | `boolean`                    |           | Makes the input outlined.                        |
| `pattern`       | `pattern`       | `string \| undefined`        |           | Value pattern.                                   |
| `readonly`      | `readonly`      | `boolean`                    |           | Makes the element readonly (disabled but tabbable) |
| `required`      | `required`      | `boolean`                    |           | Makes the element required in a form context.    |
| `role`          | `role`          | `AriaRole`                   | "textbox" | Role of the input.                               |
| `value`         | `value`         | `string`                     |           | Value of the form element.                       |
| `valueAsNumber` | `valueAsNumber` | `number`                     |           | Value of the slider.                             |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#events)

## ➤ Events

| Event     | Description                                      |
|-----------|--------------------------------------------------|
| `input`   | Dispatches from the native input event each time the input changes. |
| `invalid` | Dispatched when the input becomes invalid.       |
| `submit`  | Dispatched when the enter key is hit while pressing ctrl or the meta-key. |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#css-custom-properties)

## ➤ CSS Custom Properties

| Property                              | Description                          |
|---------------------------------------|--------------------------------------|
| `--input-before-after-color`          | Color of the before and after slots  |
| `--input-bg`                          | Default background                   |
| `--input-bg-filled`                   | Background when filled               |
| `--input-bg-filled-hover`             | Background when filled and hover     |
| `--input-border-radius-filled`        | Border radius when filled            |
| `--input-border-radius-outlined`      | Border radius when outlined          |
| `--input-border-style`                | Border style                         |
| `--input-border-style-disabled`       | Border style when disabled           |
| `--input-border-width`                | Border width                         |
| `--input-color`                       | Default color                        |
| `--input-color-disabled`              | Color when disabled                  |
| `--input-font-family`                 | Font family                          |
| `--input-font-size`                   | Font size                            |
| `--input-label-color`                 | Color of the label                   |
| `--input-label-color-disabled`        | Color of the label when disabled     |
| `--input-label-font-size`             | Font size of the label               |
| `--input-label-space`                 | Space between label and input        |
| `--input-label-transition`            | Transition of the label              |
| `--input-padding-left-right`          | Left and right padding               |
| `--input-padding-left-right-outlined` | Left and right padding when outlined |
| `--input-padding-top-bottom`          | Top and bottom padding               |
| `--input-state-color-active`          | Active state color                   |
| `--input-state-color-disabled`        | Disabled state color                 |
| `--input-state-color-hover`           | Hover state color                    |
| `--input-state-color-inactive`        | Inactive state color                 |
| `--input-state-color-invalid`         | Invalid state color                  |
| `--input-transition`                  | Transition                           |
| `--textarea-height`                   | Height                               |
| `--textarea-max-height`               | Max height                           |
| `--textarea-min-height`               | Min height                           |
| `--textarea-resize`                   | Resize strategy                      |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#slots)

## ➤ Slots

| Name     | Description               |
|----------|---------------------------|
| `after`  | Content after the input.  |
| `before` | Content before the input. |



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#usage)

## ➤ Usage

Go [here](https://weightless.dev/elements/textarea) to try the demo.

<a href="https://weightless.dev/elements/textarea" align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/elements/master/screenshots/wl-textarea.png" width="700" />
</a>


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributors)

## ➤ Contributors
	

| [<img alt="Andreas Mehlsen" src="https://avatars1.githubusercontent.com/u/6267397?s=460&v=4" width="100">](https://twitter.com/andreasmehlsen) | [<img alt="You?" src="https://joeschmoe.io/api/v1/random" width="100">](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md) |
|:--------------------------------------------------:|:--------------------------------------------------:|
| [Andreas Mehlsen](https://twitter.com/andreasmehlsen) | [You?](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md) |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).