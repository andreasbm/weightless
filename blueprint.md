{{ template:logo }}
{{ template:title }}
{{ template:badges }}
{{ template:description }}
{{ bullets }}
{{ template:toc }}

## Elements
{{ elements }}

## Design philosophy

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

{{ template:contributors }}
{{ template:license }}"
