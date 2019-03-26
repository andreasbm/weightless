{{ doc:src/lib/popover-card/popover-card.ts }}

## Usage

Go [here]({{ demo }}) to try the demo.

<a href="{{ demo }}" align="center">
  <img src="{{ img }}" width="700" />
</a>

## ⚠️ Use the element within a popover context

To figure out where the arrow should be pointing, the `{{ tag }}` uses `:host-context`. Make sure the card is within a context where the attributes `transformOriginX="left | center | right"` and `transformOriginY="top | center | bottom"` are defined.

{{ template:contributors }}
{{ template:license }}