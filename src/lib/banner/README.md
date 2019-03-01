<h1 align="center">banner-element</h1>
<p align="center">Display a non-interruptive message and related optional actions. Go <a href="http://elem.dev/demo/banner">here</a> to try the demo.</p>


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#usage)

## ➤ Usage

```html
<banner-element>
  <icon-element slot="icon">account_box</icon-element>
  <span slot="text">Your password was updated on your other device. Please sign in again.</span>
  <button-element slot="action" flat inverted>Continue as guest</button-element>
  <button-element slot="action" flat inverted>Sign in</button-element>
</banner-element>
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#attributes)

## ➤ Attributes

| Name | Type | Description | Default value |
| ------- | ------- | ------- | ------- |
| `role` | string | Role of the banner. | `'banner'` |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#css-variables)

## ➤ CSS variables

| Name | Description |
| ------- | ------- |
| `--banner-icon-margin` | Margin of the icon slot. |
| `--banner-icon-color` | Color of the icon. |
| `--banner-padding` | Padding. |
| `--banner-color` | Color. |
| `--banner-bg` | Background. |
| `--banner-content-padding` | Padding of the content slot. |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#slots)

## ➤ Slots

| Name | Description |
| ------- | ------- |
| `icon` | Icon content. |
| `text` | Text content. |
| `action` | Action content (you can have multiple slots named action). |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributors)

## ➤ Contributors
	
|[<img alt="Andreas Mehlsen" src="https://avatars1.githubusercontent.com/u/6267397?s=460&v=4" width="100">](https://twitter.com/andreasmehlsen) | [<img alt="You?" src="https://joeschmoe.io/api/v1/random" width="100">](https://github.com/andreasbm/elements/blob/master/CONTRIBUTING.md)|
|:---: | :---:|
|[Andreas Mehlsen](https://twitter.com/andreasmehlsen) | [You?](https://github.com/andreasbm/elements/blob/master/CONTRIBUTING.md)|

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).
