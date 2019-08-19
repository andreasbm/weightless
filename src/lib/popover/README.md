
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#wl-popover)

# ➤ wl-popover

Contextual anchored elements.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#properties)

## ➤ Properties

| Property            | Attribute           | Type                | Default | Description                                      |
|---------------------|---------------------|---------------------|---------|--------------------------------------------------|
| `anchor`            | `anchor`            | `string \| Element` |         | Anchor element or query.                         |
| `anchorCloseEvents` | `anchorCloseEvents` | `string[]`          |         | Events on the anchor that makes the popover close itself. |
| `anchorOpenEvents`  | `anchorOpenEvents`  | `string[]`          |         | Events on the anchor that makes the popover open itself. |
| `anchorOriginX`     | `anchorOriginX`     | `OriginX`           | "left"  | X origin of the anchored point.                  |
| `anchorOriginY`     | `anchorOriginY`     | `OriginY`           | "top"   | Y origin of the anchored point.                  |
| `backdrop`          | `backdrop`          | `boolean`           | false   | Whether the backdrop is visible or not.          |
| `blockScrolling`    | `blockScrolling`    | `boolean`           | false   | Whether the overlay blocks the scrolling on the scroll container. |
| `closeOnClick`      | `closeOnClick`      | `boolean`           | false   | Makes the popover close when it is clicked upon. |
| `disableFocusTrap`  | `disableFocusTrap`  | `boolean`           | false   | Whether the focus trap be disabled.              |
| `duration`          | `duration`          | `number`            | 200     | The duration of the animations.                  |
| `fixed`             | `fixed`             | `boolean`           | false   | Whether the overlay is fixed or not.             |
| `noFallback`        | `noFallback`        | `boolean`           | false   | Whether a fallback strategy for the positioning should be used when there are no room for the popover. |
| `open`              | `open`              | `boolean`           | false   | Whether the overlay is open or not.              |
| `persistent`        | `persistent`        | `boolean`           | false   | Whether the overlay is persistent or not. When the overlay is persistent, ESCAPE and backdrop clicks won't close it. |
| `role`              | `role`              | `AriaRole`          | "menu"  | Role of the popover.                             |
| `scrollContainer`   | `scrollContainer`   | `EventTarget`       |         | The container the overlay lives in.              |
| `transformOriginX`  | `transformOriginX`  | `OriginX`           | "left"  | X origin of the transform.                       |
| `transformOriginY`  | `transformOriginY`  | `OriginY`           | "top"   | Y origin of the transform.                       |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#events)

## ➤ Events

| Event     | Description                                   |
|-----------|-----------------------------------------------|
| `didHide` | Dispatches after the overlay has been hidden. |
| `didShow` | Dispatches after the overlay has been shown.  |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#css-custom-properties)

## ➤ CSS Custom Properties

| Property            | Description |
|---------------------|-------------|
| `--popover-z-index` | z-index.    |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#slots)

## ➤ Slots

| Name | Description      |
|------|------------------|
|      | Default content. |



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#usage)

## ➤ Usage

Go [here](https://weightless.dev/elements/popover) to try the demo.

<a href="https://weightless.dev/elements/popover" align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/elements/documentation/screenshots/wl-popover.png" width="700" />
</a>


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributors)

## ➤ Contributors
	

| [<img alt="Andreas Mehlsen" src="https://avatars1.githubusercontent.com/u/6267397?s=460&v=4" width="100">](https://twitter.com/andreasmehlsen) | [<img alt="You?" src="https://joeschmoe.io/api/v1/random" width="100">](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md) |
|:--------------------------------------------------:|:--------------------------------------------------:|
| [Andreas Mehlsen](https://twitter.com/andreasmehlsen) | [You?](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md) |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).