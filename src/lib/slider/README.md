
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#wl-slider)

# ➤ wl-slider

Make selections from a range of values.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#properties)

## ➤ Properties

| Property        | Attribute       | Type            | Default  | Description                                      |
|-----------------|-----------------|-----------------|----------|--------------------------------------------------|
| `autocomplete`  | `autocomplete`  | `"on" \| "off"` |          | Whether autocomplete is on or off.               |
| `bufferMax`     | `bufferMax`     | `number`        | 100      | The maximum buffer value allowed.                |
| `bufferMin`     | `bufferMin`     | `number`        | 0        | The minimum buffer value allowed.                |
| `bufferValue`   | `bufferValue`   | `number`        |          | The buffer value.                                |
| `disabled`      | `disabled`      | `boolean`       | false    | Disables the element.                            |
| `filled`        | `filled`        | `boolean`       | false    | Fills the input with a solid color.              |
| `label`         | `label`         | `string`        |          | Label text.                                      |
| `max`           | `max`           | `number`        | 100      | The maximum value allowed.                       |
| `min`           | `min`           | `number`        | 0        | The minimum value allowed.                       |
| `name`          | `name`          | `string`        |          | Name of the native form element.                 |
| `outlined`      | `outlined`      | `boolean`       | false    | Makes the input outlined.                        |
| `readonly`      | `readonly`      | `boolean`       | false    | Makes the element readonly (disabled but tabbable) |
| `required`      | `required`      | `boolean`       | false    | Makes the element required in a form context.    |
| `role`          | `role`          | `AriaRole`      | "slider" | Role of the slider.                              |
| `step`          | `step`          | `number`        |          | The legal number intervals                       |
| `thumbLabel`    | `thumbLabel`    | `boolean`       | false    | Label above the thumb that shows the value.      |
| `value`         | `value`         | `string`        |          | Value of the form element.                       |
| `valueAsNumber` | `valueAsNumber` | `number`        |          | Value of the slider.                             |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#events)

## ➤ Events

| Event    | Description                                      |
|----------|--------------------------------------------------|
| `submit` | Dispatched when the enter key is hit while pressing ctrl or the meta-key. |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#css-custom-properties)

## ➤ CSS Custom Properties

| Property                              | Description                                      |
|---------------------------------------|--------------------------------------------------|
| `--input-before-after-color`          | Color of the before and after slots.             |
| `--input-bg`                          | Default background.                              |
| `--input-bg-filled`                   | Background when filled.                          |
| `--input-bg-filled-hover`             | Background on :hover.                            |
| `--input-border-radius-filled`        | Border radius when filled.                       |
| `--input-border-radius-outlined`      | Border radius when outlined.                     |
| `--input-border-width`                | Width of the border.                             |
| `--input-color`                       | Default color.                                   |
| `--input-color-disabled`              | Color when disabled.                             |
| `--input-font-family`                 | Font family.                                     |
| `--input-font-size`                   | Font size.                                       |
| `--input-label-color`                 | Color of the label.                              |
| `--input-label-color-disabled`        | Color of the label when disabled.                |
| `--input-label-font-size`             | Font size of the label.                          |
| `--input-label-space`                 | Space between label and input content.           |
| `--input-label-transition`            | Transition of the label.                         |
| `--input-padding-left-right`          | Padding for the left and right.                  |
| `--input-padding-left-right-outlined` | Padding for the left and right when outlined.    |
| `--input-padding-top-bottom`          | Padding for the top and bottom.                  |
| `--input-state-color-active`          | State color when active.                         |
| `--input-state-color-disabled`        | State color when disabled.                       |
| `--input-state-color-hover`           | State color on :hover.                           |
| `--input-state-color-inactive`        | State color when inactive.                       |
| `--input-state-color-invalid`         | State color when invalid.                        |
| `--input-transition`                  | Transition.                                      |
| `--slider-thumb-bg`                   | Background of the thumb.                         |
| `--slider-thumb-bg-disabled`          | Background of the thumb when disabled.           |
| `--slider-thumb-border-radius`        | Border radius of the thumb.                      |
| `--slider-thumb-focus-ring-bg`        | Background of the thumb focus ring.              |
| `--slider-thumb-focus-ring-size`      | Size of the thumb focus ring.                    |
| `--slider-thumb-label-bg`             | Background of the thumb label.                   |
| `--slider-thumb-label-border-radius`  | Border radius of the thumb label.                |
| `--slider-thumb-label-color`          | Color of the thumb label.                        |
| `--slider-thumb-label-font-size`      | Font size of the thumb label.                    |
| `--slider-thumb-label-size`           | Size of the thumb label.                         |
| `--slider-thumb-label-transition`     | Transition of the thumb label.                   |
| `--slider-thumb-size`                 | Size of the thumb.                               |
| `--slider-thumb-transform-focus`      | Transform of the thumb when focused.             |
| `--slider-thumb-transition`           | Transition of the thumb.                         |
| `--slider-track-bg`                   | Background of the slider track.                  |
| `--slider-track-bg-active`            | Background color of the active part of the slider track. |
| `--slider-track-bg-active-disabled`   | Background color of the active part of the slider track when disabled. |
| `--slider-track-bg-buffer`            | Background color of the buffer track.            |
| `--slider-track-bg-buffer-disabled`   | Background color of the buffer track when disabled. |
| `--slider-track-bg-disabled`          | Background color of the slider track when disabled. |
| `--slider-track-height`               | Height of the slider track.                      |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#slots)

## ➤ Slots

| Name          | Description                        |
|---------------|------------------------------------|
| `after`       | Content after the input.           |
| `before`      | Content before the input.          |
| `thumb-label` | Optional slot for the thumb label. |



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#usage)

## ➤ Usage

Go [here](https://weightless.dev/elements/slider) to try the demo.

<a href="https://weightless.dev/elements/slider" align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/elements/master/screenshots/wl-slider.png" width="700" />
</a>


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributors)

## ➤ Contributors
	

| [<img alt="Andreas Mehlsen" src="https://avatars1.githubusercontent.com/u/6267397?s=460&v=4" width="100">](https://twitter.com/andreasmehlsen) | [<img alt="You?" src="https://joeschmoe.io/api/v1/random" width="100">](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md) |
|:--------------------------------------------------:|:--------------------------------------------------:|
| [Andreas Mehlsen](https://twitter.com/andreasmehlsen) | [You?](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md) |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).