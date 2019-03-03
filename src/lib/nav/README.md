<h1 align="center">nav-element</h1>
<p align="center">Provide access to destinations in your app. Go <a href="https://weightless.dev/demo/nav">here</a> to try the demo.</p>


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#usage)

## ➤ Usage

```html
<nav-element shadow fixed>
  <div slot="left">
    <img src="/my-logo.svg" alt="logo" />
  </div>
  <span slot="title">My app</span>
  <div slot="right">
    <button-element>Sign in</button-element>
  </div>
</nav-element>
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#attributes)

## ➤ Attributes

| Name | Type | Description | Default value |
| ------- | ------- | ------- | ------- |
| `shadow` | boolean | Gives the nav a shadow. | `false` |
| `fixed` | boolean | Fixes the nav to the top of the page. | `false` |
| `role` | string | Role of the nav. | `navigation` |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#css-variables)

## ➤ CSS variables

| Name | Description |
| ------- | ------- |
| `--nav-bg` | Background. |
| `--nav-color` | Color. |
| `--tolbar-z-index` | z-index. |
| `--nav-padding` | Padding. |
| `--nav-height` | Height. |
| `--nav-elevation` | Box shadow. |
| `--nav-transition` | Transition. |
| `--nav-title-font-size` | Font size of the title. |
| `--nav-title-font-weight` | Font weight of the title. |
| `--nav-title-margin` | Margin of the title. |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#slots)

## ➤ Slots

| Name | Description |
| ------- | ------- |
| `left` | Content positioned to the left. |
| `right` | Content positioned to the right. |
| `title` | Title. |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributors)

## ➤ Contributors
	
|[<img alt="Andreas Mehlsen" src="https://avatars1.githubusercontent.com/u/6267397?s=460&v=4" width="100">](https://twitter.com/andreasmehlsen) | [<img alt="You?" src="https://joeschmoe.io/api/v1/random" width="100">](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md)|
|:---: | :---:|
|[Andreas Mehlsen](https://twitter.com/andreasmehlsen) | [You?](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md)|

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).