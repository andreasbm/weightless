
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#tooltip-element)

## ➤ tooltip-element

Informative context related text.
### Properties

| Property            | Attribute           | Description                                      | Type               | Default                          |
|---------------------|---------------------|--------------------------------------------------|--------------------|----------------------------------|
| `$backdrop`         | `$backdrop`         | Backdrop element.                                | `BackdropElement`  | `required`                       |
| `$container`        | `$container`        | Container element.                               | `HTMLElement`      | `required`                       |
| `$content`          | `$content`          | Content of the popover.                          | `FocusTrap`        | `required`                       |
| `anchor`            | `anchor`            | Anchor element or query.                         | `string | Element` | `required`                       |
| `anchorCloseEvents` | `anchorCloseEvents` | Events on the anchor that makes the popover close itself. | `string[]`         | `required`                       |
| `anchorOpenEvents`  | `anchorOpenEvents`  | Events on the anchor that makes the popover open itself. | `string[]`         | `required`                       |
| `anchorOriginX`     | `anchorOriginX`     | X origin of the anchored point.                  | `OriginX`          | OriginX.LEFT                     |
| `anchorOriginY`     | `anchorOriginY`     | Y origin of the anchored point.                  | `OriginY`          | OriginY.TOP                      |
| `backdrop`          | `backdrop`          | Whether the backdrop is visible or not.          | `boolean`          | false                            |
| `blockScrolling`    | `blockScrolling`    | Whether the overlay blocks the scrolling on the scroll container. | `boolean`          | false                            |
| `closeOnClick`      | `closeOnClick`      | Makes the popover close when it is clicked upon. | `boolean`          | false                            |
| `disableFocusTrap`  | `disableFocusTrap`  | Whether the focus trap be disabled.              | `boolean`          | false                            |
| `duration`          | `duration`          | The duration of the animations.                  | `number`           | 200                              |
| `fixed`             | `fixed`             | Whether the overlay is fixed or not.             | `boolean`          | false                            |
| `noFallback`        | `noFallback`        | Whether a fallback strategy for the positioning should be used when there are no room for the popover. | `boolean`          | false                            |
| `open`              | `open`              | Whether the overlay is open or not.              | `boolean`          | false                            |
| `persistent`        | `persistent`        | Whether the overlay is persistent or not. When the overlay is persistent, ESCAPE and backdrop clicks won't close it. | `boolean`          | false                            |
| `role`              | `role`              | Role of the popover.                             | `AriaRole`         | "menu"                           |
| `scrollContainer`   | `scrollContainer`   | The container the overlay lives in.              | `EventTarget`      | DEFAULT_OVERLAY_SCROLL_CONTAINER |
| `transformOriginX`  | `transformOriginX`  | X origin of the transform.                       | `OriginX`          | OriginX.LEFT                     |
| `transformOriginY`  | `transformOriginY`  | Y origin of the transform.                       | `OriginY`          | OriginY.TOP                      |

### Slots

| Description      |
|------------------|
| Default content. |

### Events

| Event   | Description                                   |
|---------|-----------------------------------------------|
| didhide | Dispatches after the overlay has been hidden. |
| didshow | Dispatches after the overlay has been shown.  |

### CSS Custom Properties

| Property          | Description |
|-------------------|-------------|
| --popover-z-index | z-index.    |
| --tooltip-bg      | Background. |
| --tooltip-color   | Color.      |
| --tooltip-padding | Padding.    |



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#usage)

## ➤ Usage

Go [here](https://weightless.dev/elements/tooltip) to try the demo.

<a href="https://weightless.dev/elements/tooltip" align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/elements/master/screenshots/tooltip-element.png?token=AF-iBYKqW5Hm2x5ac_PMHEQ6wGDqACyVks5chEsqwA%3D%3D" width="700" />
</a>


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributors)

## ➤ Contributors
	
|[<img alt="Andreas Mehlsen" src="https://avatars1.githubusercontent.com/u/6267397?s=460&v=4" width="100">](https://twitter.com/andreasmehlsen) | [<img alt="You?" src="https://joeschmoe.io/api/v1/random" width="100">](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md)|
|:---: | :---:|
|[Andreas Mehlsen](https://twitter.com/andreasmehlsen) | [You?](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md)|

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).