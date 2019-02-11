# card-component 

The `card-component` represents a simple hoverable card.  

## 🎁 Usage 

Use it in your web page:

```html
<card-component>Default card</card-component>
<card-component hoverable>Hoverable card</card-component>
```

## 🎉 Properties 

The behavior can be customized through the following properties.

| Attribute        | Type           | Description  | Default Value |
| ------------- |----| -----| -----| 
| **hoverable**      | boolean | Makes the card hoverable | false |

## 📝 CSS Properties

The styling can be customized through the following CSS properties.

| Property (default)   | Type           | Description  | Default Value |
| ------------- |----| -----| -----| 
| **--card-transition**      | transition | Default transition | var(--transition-ease-config) box-shadow |
| **--card-elevation**      | box-shadow | Default box shadow | var(--elevation-1) |
| **--card-elevation-hover**      | box-shadow | Hover box shadow | var(--elevation-8) |

