# Icon

> An Icon component class displays a graphic that takes up a small portion of screen real estate and provides a quick, intuitive representation of an action, a status, or an application.

## Usage

```js
<Icon name="facebook" />
```

This example shows the simplest way to use an `Icon`. It renders the Facebook logo provided by the font icons.

```js
<Icon name="facebook" className="custom-class-name" />
```

In this example we are specifying a custom class name that should be added to the `class` attribute when the component is rendered.

```js
<Icon name="facebook" onClick={this.handleIconClick} />
```

You can also respond to click events that occur on the rendered component.

## Properties

- `className` - A non-empty string that will be added to `class` attribute of the DOM element rendered by the `Icon` component.

- `name` - A non-empty string that represents the name of the icon to be rendered.

## Events

- `onClick` - An event handler that will be called when customer clicks on the rendered icon. It will receive the `DOMEvent` object as its first parameter.
