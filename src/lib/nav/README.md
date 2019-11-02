
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#wl-nav)

# ➤ wl-nav

Provide access to destinations in your app.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#properties)

## ➤ Properties

| Property | Attribute | Type       | Default      | Description                           |
|----------|-----------|------------|--------------|---------------------------------------|
| `fixed`  | `fixed`   | `boolean`  | false        | Fixes the nav to the top of the page. |
| `role`   | `role`    | `AriaRole` | "navigation" | Role of the nav.                      |
| `shadow` | `shadow`  | `boolean`  | false        | Gives the nav a shadow.               |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#slots)

## ➤ Slots

| Name    | Description                      |
|---------|----------------------------------|
| `left`  | Content positioned to the left.  |
| `right` | Content positioned to the right. |
| `title` | Title.                           |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#css-custom-properties)

## ➤ CSS Custom Properties

| Property                  | Description                   |
|---------------------------|-------------------------------|
| `--nav-bg`                | Background                    |
| `--nav-color`             | Color                         |
| `--nav-elevation`         | Box shadow                    |
| `--nav-height`            | Height                        |
| `--nav-padding`           | Padding                       |
| `--nav-title-font-size`   | Font size of the title slot   |
| `--nav-title-font-weight` | Font weight of the title slot |
| `--nav-title-margin`      | Margin of the title slot      |
| `--nav-transition`        | Transition                    |



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#usage)

## ➤ Usage

Go [here](https://weightless.dev/elements/nav) to try the demo.

```html
<wl-nav shadow fixed>
  <div slot="left">
    <img src="/my-logo.svg" alt="logo" />
  </div>
  <span slot="title">My app</span>
  <div slot="right">
    <wl-button>Sign in</wl-button>
  </div>
</wl-nav>
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributors)

## ➤ Contributors
	

| [<img alt="Andreas Mehlsen" src="https://avatars1.githubusercontent.com/u/6267397?s=460&v=4" width="100">](https://twitter.com/andreasmehlsen) | [<img alt="You?" src="https://joeschmoe.io/api/v1/random" width="100">](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md) |
|:--------------------------------------------------:|:--------------------------------------------------:|
| [Andreas Mehlsen](https://twitter.com/andreasmehlsen) | [You?](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md) |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).