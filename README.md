<p align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/elements/master/assets/logo-text.png?token=AF-iBbtFwTGmTCr-w-ZKDUg3jJVXROsJks5ceq82wA%3D%3D" alt="Logo" width="400" height="auto" />
</p>
<h1 align="center">@appnest/elements</h1>
<p align="center">
		<a href="https://npmcharts.com/compare/@appnest/elements?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@appnest/elements.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/@appnest/elements"><img alt="NPM Version" src="https://img.shields.io/npm/v/@appnest/elements.svg" height="20"/></a>
<a href="https://david-dm.org/andreasbm/elements"><img alt="Dependencies" src="https://img.shields.io/david/andreasbm/elements.svg" height="20"/></a>
<a href="https://github.com/andreasbm/elements/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/andreasbm/elements.svg" height="20"/></a>
	</p>

<p align="center">
  <b>High-quality Web Components</b></br>
  <sub>Web Components built to be used. They are lightweight, have a simple API and are easy to extend and compose.<sub>
</p>

<br />

* **High-quality:** Centered around the best practices.
* **Testable:** Hundreds of test-cases makes sure the library is stable.
* **Easy-to-use:** But with a simple and understandable API.
* **Accessible:** All components has been build with accessibility in mind.
* **Single-responsibility:** Each component does one thing really well. This makes them really easy to extend and compose.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/grass.png)](#table-of-contents)

## ➤ Table of Contents

* [➤ Elements](#-elements)
* [➤ Design philosophy](#-design-philosophy)
	* [⚙️ No configuration](#-no-configuration)
	* [🛡 Encapsulated](#-encapsulated)
	* [🎨 Themeable](#-themeable)
	* [🧮 Testable](#-testable)
	* [📃 Documented](#-documented)
	* [🔦 Accessible](#-accessible)
	* [➡️ Learn more](#-learn-more)
* [➤ Contributors](#-contributors)
* [➤ License](#-license)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/grass.png)](#elements)

## ➤ Elements
| Tag | Description | Documentation |
| ------- | ------- | ------- |
| `backdrop-element` | Dark layer to use behind overlayed elements. | [Documentation](/src/lib/backdrop) |
| `banner-element` | Display a non-interruptive message and related optional actions. | [Documentation](/src/lib/banner) |
| `button-element` | Allow users to take actions, and make choices, with a single tap. | [Documentation](/src/lib/button) |
| `card-element` | Group related content and action. | [Documentation](/src/lib/card) |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/grass.png)](#design-philosophy)

## ➤ Design philosophy

### ⚙️ No configuration

The page authors must be able to drop any element into the DOM and have it working without doing anything else. This means that no attributes, CSS variables or anything else, other than importing the element, are required.

### 🛡 Encapsulated

The page author can expect all elements to look the same no matter where they are used.

### 🎨 Themeable

All elements must be themeable. In practice this means that all CSS variables in the library must be based on some fundamental base CSS variables. This allows the page author to change the theme of all elements at once. As an example the page author can set `--size-multiplier: 2px` and change all sizes of the elements or set `--primary-500: 212, 90, 120` and change the primary color of all elements. It also means that when building the library elements all CSS variables need to have default values they can fallback to if nothing else explicitly has been defined.

### 🧮 Testable

All elements must have automated tests. These tests are run at every commit.

### 📃 Documented

All elements must have sufficient up-to-date documentation.

### 🔦 Accessible

All elements must follow the [best practices](https://www.w3.org/TR/using-aria) when it comes to accessibility.

### ➡️ Learn more

If you are interested in learning more you can check out [Custom Element Best Practices](https://developers.google.com/web/fundamentals/web-components/best-practices) and [Inclusive Components](https://inclusive-components.design/#components).


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/grass.png)](#contributors)

## ➤ Contributors
	
|[<img alt="Andreas Mehlsen" src="https://avatars1.githubusercontent.com/u/6267397?s=460&v=4" width="100">](https://twitter.com/andreasmehlsen) | [<img alt="You?" src="https://joeschmoe.io/api/v1/random" width="100">](https://github.com/andreasbm/elements/blob/master/CONTRIBUTING.md)|
|:---: | :---:|
|[Andreas Mehlsen](https://twitter.com/andreasmehlsen) | [You?](https://github.com/andreasbm/elements/blob/master/CONTRIBUTING.md)|

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/grass.png)](#license)

## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT)."
