<h1 align="center">{{ tag }}</h1>
<p align="center">{{ text }}. Go <a href="{{ demo }}">here</a> to try the demo.</p>

## Usage

<a href="{{ demo }}" align="center">
  <img src="{{ img }}" width="700" />
</a>

## ⚠️ Load the icon font

Currently the `icon-element` has not been designed with no configuration in mind. If you don't provide your own icon font via the `--icon-font` CSS variable you need to load the default google font material icons. You can do that by inserting the following link in the `head` tag of your `index.html` file. Check out the available icons [here](https://material.io/tools/icons/).

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

## Attributes

{{ attributes }}

## CSS variables

{{ cssVariables }}

## Slots

{{ slots }}

{{ template:contributors }}
{{ template:license }}