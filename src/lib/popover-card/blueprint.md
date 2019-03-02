<h1 align="center">{{ tag }}</h1>
<p align="center">{{ text }}. Go <a href="{{ demo }}">here</a> to try the demo.</p>

## Usage

<a href="{{ demo }}" align="center">
  <img src="{{ img }}" width="700" />
<a/

## ⚠️ Use the element within a popover context

To figure out where the arrow should be pointing, the `{{ tag }}` uses `:host-context`. Make sure the card is within a context where the attributes `transformOriginX="left | center | right"` and `transformOriginY="top | center | bottom"` are defined.

## CSS variables

{{ cssVariables }}

## Slots

{{ slots }}

{{ template:contributors }}
{{ template:license }}