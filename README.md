<p align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/elements/master/assets/brand/logo-text-dark.png" alt="Logo" width="400" height="auto" />
</p>
<p align="center">
		<a href="https://npmcharts.com/compare/weightless?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/weightless.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/weightless"><img alt="NPM Version" src="https://img.shields.io/npm/v/weightless.svg" height="20"/></a>
<a href="https://david-dm.org/andreasbm/weightless"><img alt="Dependencies" src="https://img.shields.io/david/andreasbm/weightless.svg" height="20"/></a>
<a href="https://github.com/andreasbm/weightless/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/andreasbm/weightless.svg" height="20"/></a>
<a href="https://www.webcomponents.org/element/weightless"><img alt="Published on webcomponents.org" src="https://img.shields.io/badge/webcomponents.org-published-blue.svg" height="20"/></a>
	</p>

<p align="center">
  <b>High-quality Web Components with a small footprint</b></br>
  <sub>Thank you so much for showing interest in this project! If you want to help us feed our Octocat you should definitely become a <a href='https://github.com/andreasbm/weightless/stargazers' target='_blank'>stargazer</a>. These web components are built to be used. They are lightweight, have a simple API and are easy to extend and compose. Go here to see a demo <a href="https://weightless.dev/elements">https://weightless.dev/elements</a>.<sub>
</p>

<br />

* **High-quality:** Centered around the best practices.
* **Testable:** Hundreds of test-cases makes sure the library is stable.
* **Easy-to-use:** But with a simple and understandable API.
* **Accessible:** All components has been build with accessibility in mind.
* **Single-responsibility:** Each component does one thing really well. This makes them really easy to extend and compose.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

## ➤ Table of Contents

* [➤ Demo](#-demo)
* [➤ Installation](#-installation)
* [➤ Elements](#-elements)
* [➤ Roadmap](#-roadmap)
* [➤ Contributing guide](#-contributing-guide)
* [➤ Contributors](#-contributors)
* [➤ License](#-license)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#demo)

## ➤ Demo

Go [here](https://weightless.dev/elements) to try the demo.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#installation)

## ➤ Installation

```
$ npm i weightless
```

If you want to get started super quickly you can use the CLI.

```
$ npm init web-config my-project --lit
```

If you prefer to use the `umd` bundle you can import `https://unpkg.com/weightless/umd/weightless.min.js`.

```html
<script src="https://unpkg.com/weightless/umd/weightless.min.js"></script>
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#elements)

## ➤ Elements


| Name             | Tag                   | Description                                      | Documentation                              | Demo                                             |
|------------------|-----------------------|--------------------------------------------------|--------------------------------------------|--------------------------------------------------|
| Backdrop         | `wl-backdrop`         | Dark layer to use behind overlayed elements.     | [Documentation](/src/lib/backdrop)         | [Demo](https://weightless.dev/elements/dialog)   |
| Banner           | `wl-banner`           | Display a non-interruptive message and related optional actions. | [Documentation](/src/lib/banner)           | [Demo](https://weightless.dev/elements/banner)   |
| Button           | `wl-button`           | Allow users to take actions, and make choices, with a single tap. | [Documentation](/src/lib/button)           | [Demo](https://weightless.dev/elements/button)   |
| Card             | `wl-card`             | Group related content and action.                | [Documentation](/src/lib/card)             | [Demo](https://weightless.dev/elements/card)     |
| Checkbox         | `wl-checkbox`         | Turn an option on or off.                        | [Documentation](/src/lib/checkbox)         | [Demo](https://weightless.dev/elements/checkbox) |
| Dialog           | `wl-dialog`           | Highly interruptive messages.                    | [Documentation](/src/lib/dialog)           | [Demo](https://weightless.dev/elements/dialog)   |
| Divider          | `wl-divider`          | Thin line that groups content in lists and layouts. | [Documentation](/src/lib/divider)          | [Demo](https://weightless.dev/elements/divider)  |
| Expansion        | `wl-expansion`        | Provide an expandable details-summary view.      | [Documentation](/src/lib/expansion)        | [Demo](https://weightless.dev/elements/expansion) |
| Icon             | `wl-icon`             | Symbols for common actions and items.            | [Documentation](/src/lib/icon)             | [Demo](https://weightless.dev/elements/icon)     |
| Label            | `wl-label`            | Make form elements more accessible.              | [Documentation](/src/lib/label)            | [Demo](https://weightless.dev/elements/label)    |
| List Item        | `wl-list-item`        | Display an item in a list.                       | [Documentation](/src/lib/list-item)        | [Demo](https://weightless.dev/elements/list-item) |
| Nav              | `wl-nav`              | Provide access to destinations in your app.      | [Documentation](/src/lib/nav)              | [Demo](https://weightless.dev/elements/nav)      |
| Popover          | `wl-popover`          | Contextual anchored elements                     | [Documentation](/src/lib/popover)          | [Demo](https://weightless.dev/elements/popover)  |
| Popover Card     | `wl-popover-card`     | Give popovers a contextual flair.                | [Documentation](/src/lib/popover-card)     | [Demo](https://weightless.dev/elements/popover)  |
| Progress Bar     | `wl-progress-bar`     | Fills a bar from 0% to 100%.                     | [Documentation](/src/lib/progress-bar)     | [Demo](https://weightless.dev/elements/progress-bar) |
| Progress Spinner | `wl-progress-spinner` | Fills a circle from 0% to 100%.                  | [Documentation](/src/lib/progress-spinner) | [Demo](https://weightless.dev/elements/progress-spinner) |
| Radio            | `wl-radio`            | Select one option from a set.                    | [Documentation](/src/lib/radio)            | [Demo](https://weightless.dev/elements/radio)    |
| Ripple           | `wl-ripple`           | Indicate touch actions.                          | [Documentation](/src/lib/ripple)           | [Demo](https://weightless.dev/elements/ripple)   |
| Select           | `wl-select`           | Select one or more values from a set of options. | [Documentation](/src/lib/select)           | [Demo](https://weightless.dev/elements/select)   |
| Textarea         | `wl-textarea`         | Multiline text fields.                           | [Documentation](/src/lib/textarea)         | [Demo](https://weightless.dev/elements/textarea) |
| Textfield        | `wl-textfield`        | Singleline text fields.                          | [Documentation](/src/lib/textfield)        | [Demo](https://weightless.dev/elements/textfield) |
| Title            | `wl-title`            | Indicate the start of a new section.             | [Documentation](/src/lib/title)            | [Demo](https://weightless.dev/elements/title)    |
| Tooltip          | `wl-tooltip`          | Informative context related text.                | [Documentation](/src/lib/tooltip)          | [Demo](https://weightless.dev/elements/tooltip)  |



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#roadmap)

## ➤ Roadmap

There's lots of exciting things on the roadmap. Until v1.0.0 you can expect the API to be fairly stable but refactoring might still happen and break the backwards compatibility. You are very welcome to use the library, create pull requests or add issues.



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributing-guide)

## ➤ Contributing guide

You are more than welcome to contribute to this repository! Below are some instructions on how to setup the project for development.

1. Clone this repository by running `git clone https://github.com/andreasbm/weightless.git`.
2. Run `npm i` to install all dependencies.
3. Spin up the development server with `npm run s`. The browser should automatically be opened at the correct url.
5. Run tests with `npm run test`.
6. Compile the documentation by running `npm run docs`.

The elements are written in [Typescript](https://www.typescriptlang.org/) and the stylesheets are written in [SASS](https://sass-lang.com/). All of the web components uses [lit-element](https://lit-element.polymer-project.org/).

If you want to know more about how you can help you should definitely check out the [CONTRIBUTING.md](/CONTRIBUTING.md) file. All contributors will be added to the contributors section below.



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributors)

## ➤ Contributors
	

| [<img alt="Andreas Mehlsen" src="https://avatars1.githubusercontent.com/u/6267397?s=460&v=4" width="100">](https://twitter.com/andreasmehlsen) | [<img alt="You?" src="https://joeschmoe.io/api/v1/random" width="100">](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md) |
|:--------------------------------------------------:|:--------------------------------------------------:|
| [Andreas Mehlsen](https://twitter.com/andreasmehlsen) | [You?](https://github.com/andreasbm/weightless/blob/master/CONTRIBUTING.md) |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).
