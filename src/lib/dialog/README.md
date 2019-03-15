
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#wl-dialog)

# ➤ wl-dialog

Highly interruptive messages.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#properties)

## ➤ Properties

| Property           | Attribute          | Type          | Default  | Description                                      |
|--------------------|--------------------|---------------|----------|--------------------------------------------------|
| `backdrop`         | `backdrop`         | `boolean`     | false    | Whether the backdrop is visible or not.          |
| `blockScrolling`   | `blockScrolling`   | `boolean`     | false    | Whether the overlay blocks the scrolling on the scroll container. |
| `disableFocusTrap` | `disableFocusTrap` | `boolean`     | false    | Whether the focus trap be disabled.              |
| `duration`         | `duration`         | `number`      | 200      | The duration of the animations.                  |
| `fixed`            | `fixed`            | `boolean`     | false    | Whether the overlay is fixed or not.             |
| `open`             | `open`             | `boolean`     | false    | Whether the overlay is open or not.              |
| `persistent`       | `persistent`       | `boolean`     | false    | Whether the overlay is persistent or not. When the overlay is persistent, ESCAPE and backdrop clicks won't close it. |
| `role`             | `role`             | `AriaRole`    | "dialog" | Role of the dialog.                              |
| `scrollContainer`  | `scrollContainer`  | `EventTarget` |          | The container the overlay lives in.              |
| `scrollable`       | `scrollable`       | `boolean`     | false    | Makes the dialog scrollable.                     |
| `size`             | `size`             | `DialogSize`  |          | Size of the dialog.                              |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#events)

## ➤ Events

| Event     | Description                                   |
|-----------|-----------------------------------------------|
| `didhide` | Dispatches after the overlay has been hidden. |
| `didshow` | Dispatches after the overlay has been shown.  |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#css-custom-properties)

## ➤ CSS Custom Properties

| Property                             | Description                                 |
|--------------------------------------|---------------------------------------------|
| `--dialog-bg`                        | Background.                                 |
| `--dialog-border-radius`             | Border radius.                              |
| `--dialog-color`                     | Color.                                      |
| `--dialog-content-padding`           | Padding of the content slot.                |
| `--dialog-elevation`                 | Box shadow.                                 |
| `--dialog-footer-padding`            | Padding of the footer slot.                 |
| `--dialog-header-padding`            | Padding of the header slot.                 |
| `--dialog-header-padding-scrollable` | Padding of the header slot when scrollable. |
| `--dialog-height`                    | Default height.                             |
| `--dialog-height-auto`               | Auto height.                                |
| `--dialog-height-fullscreen`         | Fullscreen height                           |
| `--dialog-height-l`                  | Large height                                |
| `--dialog-height-m`                  | Medium height                               |
| `--dialog-height-s`                  | Small height                                |
| `--dialog-max-height`                | Max height.                                 |
| `--dialog-max-width`                 | Max width.                                  |
| `--dialog-min-height`                | Min height.                                 |
| `--dialog-min-width`                 | Min width.                                  |
| `--dialog-scrollable-border`         | Border when scrollable.                     |
| `--dialog-width`                     | Default width.                              |
| `--dialog-width-auto`                | Auto width.                                 |
| `--dialog-width-fullscreen`          | Fullscreen width.                           |
| `--dialog-width-l`                   | Large width.                                |
| `--dialog-width-m`                   | Medium width.                               |
| `--dialog-width-s`                   | Small width.                                |
| `--dialog-will-change`               | Will change.                                |
| `--dialog-z-index`                   | z-index.                                    |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#slots)

## ➤ Slots

| Name      | Description      |
|-----------|------------------|
|           | Default content. |
| `content` | Body content.    |
| `footer`  | Footer content.  |
| `header`  | Header content.  |



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#usage)

## ➤ Usage

Go [here](https://weightless.dev/elements/dialog) to try the demo.

<a href="https://weightless.dev/elements/dialog" align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/elements/master/screenshots/wl-dialog.png" width="700" />
</a>


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributors)

## ➤ Contributors
	

| [<img alt="Andreas Mehlsen" src="https://avatars1.githubusercontent.com/u/6267397?s=460&v=4" width="100">](https://twitter.com/andreasmehlsen) | [<img alt="You?" src="https://joeschmoe.io/api/v1/random" width="100">](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md) |
|:--------------------------------------------------:|:--------------------------------------------------:|
| [Andreas Mehlsen](https://twitter.com/andreasmehlsen) | [You?](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md) |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).
