
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#dialog-element)

## ➤ dialog-element

Highly interruptive messages.
### Properties

| Property           | Attribute          | Description                                      | Type              | Default                          |
|--------------------|--------------------|--------------------------------------------------|-------------------|----------------------------------|
| `$backdrop`        | `$backdrop`        | Backdrop element.                                | `BackdropElement` | `required`                       |
| `$dialog`          | `$dialog`          | Dialog element.                                  | `HTMLElement`     | `required`                       |
| `$focusTrap`       | `$focusTrap`       | Focus trap element.                              | `FocusTrap`       | `required`                       |
| `backdrop`         | `backdrop`         | Whether the backdrop is visible or not.          | `boolean`         | false                            |
| `blockScrolling`   | `blockScrolling`   | Whether the overlay blocks the scrolling on the scroll container. | `boolean`         | false                            |
| `disableFocusTrap` | `disableFocusTrap` | Whether the focus trap be disabled.              | `boolean`         | false                            |
| `duration`         | `duration`         | The duration of the animations.                  | `number`          | 200                              |
| `fixed`            | `fixed`            | Whether the overlay is fixed or not.             | `boolean`         | false                            |
| `open`             | `open`             | Whether the overlay is open or not.              | `boolean`         | false                            |
| `persistent`       | `persistent`       | Whether the overlay is persistent or not. When the overlay is persistent, ESCAPE and backdrop clicks won't close it. | `boolean`         | false                            |
| `role`             | `role`             | Role of the dialog.                              | `AriaRole`        | "dialog"                         |
| `scrollContainer`  | `scrollContainer`  | The container the overlay lives in.              | `EventTarget`     | DEFAULT_OVERLAY_SCROLL_CONTAINER |
| `scrollable`       | `scrollable`       | Makes the dialog scrollable.                     | `boolean`         | false                            |
| `size`             | `size`             | Size of the dialog.                              | `DialogSize`      | `required`                       |

### Slots

| Slot    | Description      |
|---------|------------------|
|         | Default content. |
| content | Body content.    |
| footer  | Footer content.  |
| header  | Header content.  |

### Events

| Event   | Description                                   |
|---------|-----------------------------------------------|
| didhide | Dispatches after the overlay has been hidden. |
| didshow | Dispatches after the overlay has been shown.  |

### CSS Custom Properties

| Property                           | Description                                 |
|------------------------------------|---------------------------------------------|
| --dialog-bg                        | Background.                                 |
| --dialog-border-radius             | Border radius.                              |
| --dialog-color                     | Color.                                      |
| --dialog-content-padding           | Padding of the content slot.                |
| --dialog-elevation                 | Box shadow.                                 |
| --dialog-footer-padding            | Padding of the footer slot.                 |
| --dialog-header-padding            | Padding of the header slot.                 |
| --dialog-header-padding-scrollable | Padding of the header slot when scrollable. |
| --dialog-height                    | Default height.                             |
| --dialog-height-auto               | Auto height.                                |
| --dialog-height-fullscreen         | Fullscreen height                           |
| --dialog-height-l                  | Large height                                |
| --dialog-height-m                  | Medium height                               |
| --dialog-height-s                  | Small height                                |
| --dialog-max-height                | Max height.                                 |
| --dialog-max-width                 | Max width.                                  |
| --dialog-min-height                | Min height.                                 |
| --dialog-min-width                 | Min width.                                  |
| --dialog-scrollable-border         | Border when scrollable.                     |
| --dialog-width                     | Default width.                              |
| --dialog-width-auto                | Auto width.                                 |
| --dialog-width-fullscreen          | Fullscreen width.                           |
| --dialog-width-l                   | Large width.                                |
| --dialog-width-m                   | Medium width.                               |
| --dialog-width-s                   | Small width.                                |
| --dialog-will-change               | Will change.                                |
| --dialog-z-index                   | z-index.                                    |



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#usage)

## ➤ Usage

Go [here](https://weightless.dev/elements/dialog) to try the demo.

<a href="https://weightless.dev/elements/dialog" align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/elements/master/screenshots/dialog-element.png?token=AF-iBdDsRo4rR9ss5Ix_SW9kpZMXCfILks5chEh-wA%3D%3D" width="700" />
</a>


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributors)

## ➤ Contributors
	
|[<img alt="Andreas Mehlsen" src="https://avatars1.githubusercontent.com/u/6267397?s=460&v=4" width="100">](https://twitter.com/andreasmehlsen) | [<img alt="You?" src="https://joeschmoe.io/api/v1/random" width="100">](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md)|
|:---: | :---:|
|[Andreas Mehlsen](https://twitter.com/andreasmehlsen) | [You?](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md)|

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).
