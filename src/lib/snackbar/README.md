
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#wl-snackbar)

# ➤ wl-snackbar

Provide brief messages at the bottom of the screen.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#properties)

## ➤ Properties

| Property           | Attribute          | Type          | Default  | Description                                      |
|--------------------|--------------------|---------------|----------|--------------------------------------------------|
| `backdrop`         | `backdrop`         | `boolean`     | false    | Whether the backdrop is visible or not.          |
| `blockScrolling`   | `blockScrolling`   | `boolean`     | false    | Whether the overlay blocks the scrolling on the scroll container. |
| `disableFocusTrap` | `disableFocusTrap` | `boolean`     | false    | Whether the focus trap be disabled.              |
| `duration`         | `duration`         | `number`      | 200      | The duration of the animations.                  |
| `fixed`            | `fixed`            | `boolean`     | false    | Whether the overlay is fixed or not.             |
| `hideDelay`        | `hideDelay`        | `number`      | 5000     | Time in ms before the snackbar is hidden automatically. |
| `open`             | `open`             | `boolean`     | false    | Whether the overlay is open or not.              |
| `persistent`       | `persistent`       | `boolean`     | false    | Whether the overlay is persistent or not. When the overlay is persistent, ESCAPE and backdrop clicks won't close it. |
| `role`             | `role`             | `AriaRole`    | "banner" | Role of the snackbar.                            |
| `scrollContainer`  | `scrollContainer`  | `EventTarget` |          | The container the overlay lives in.              |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#events)

## ➤ Events

| Event     | Description                                   |
|-----------|-----------------------------------------------|
| `didhide` | Dispatches after the overlay has been hidden. |
| `didshow` | Dispatches after the overlay has been shown.  |



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#usage)

## ➤ Usage

Go [here](https://weightless.dev/elements/snackbar) to try the demo.

<a href="https://weightless.dev/elements/snackbar" align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/elements/master/screenshots/wl-snackbar.png" width="700" />
</a>


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributors)

## ➤ Contributors
	

| [<img alt="Andreas Mehlsen" src="https://avatars1.githubusercontent.com/u/6267397?s=460&v=4" width="100">](https://twitter.com/andreasmehlsen) | [<img alt="You?" src="https://joeschmoe.io/api/v1/random" width="100">](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md) |
|:--------------------------------------------------:|:--------------------------------------------------:|
| [Andreas Mehlsen](https://twitter.com/andreasmehlsen) | [You?](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md) |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).