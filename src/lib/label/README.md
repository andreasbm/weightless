<h1 align="center">label-element</h1>
<p align="center">Make form elements more accessible.. Go <a href="http://elem.dev/demo/label">here</a> to try the demo.</p>


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#usage)

## ➤ Usage

```html
<checkbox-element id="cb"></checkbox-element>
<label-element for="cb">This is a label</label-element>
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#attributes)

## ➤ Attributes

| Name | Type | Description | Default value |
| ------- | ------- | ------- | ------- |
| `required` | boolean | Styles the label as required. | `false` |
| `nowrap` | boolean | Caps the label element with ellipsis if overflowing. | `false` |
| `for` | string | Query of the form element click events are re-fired upon. | `''` |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#css-variables)

## ➤ CSS variables

| Name | Description |
| ------- | ------- |
| `--label-color` | Color. |
| `--label-color-required` | Color of the asterisk (*) when required attributed is present. |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#slots)

## ➤ Slots

| Name | Description |
| ------- | ------- |
| `unnamed` | Default content. If the first element is a form element, clicks on the entire label will be re-fired upon that element. |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributors)

## ➤ Contributors
	
|[<img alt="Andreas Mehlsen" src="https://avatars1.githubusercontent.com/u/6267397?s=460&v=4" width="100">](https://twitter.com/andreasmehlsen) | [<img alt="You?" src="https://joeschmoe.io/api/v1/random" width="100">](https://github.com/andreasbm/elements/blob/master/CONTRIBUTING.md)|
|:---: | :---:|
|[Andreas Mehlsen](https://twitter.com/andreasmehlsen) | [You?](https://github.com/andreasbm/elements/blob/master/CONTRIBUTING.md)|

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).