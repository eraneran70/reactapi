# Button

A button is perhaps the most commonly used widget in any graphical user interface. Buttons are used for **actions**, like in forms, while textual hyperlinks are used for **destinations**, or moving from one page to another.

## Styles

A button comes in the full spectrum of the framework's default colors. You can specify the button style context using the `styleContext` prop.

```js
import Button from './src/components/Button/Button';
import React from 'react';
import ReactDOM from 'react';

const container = document.getElementById('#container');
const props = {
    // one of default|primary|success|info|warning|danger|link
    styleContext: 'warning'
};

ReactDOM.render(React.createElement(Button, props), container);
```

Using colors to add meaning to a button only provides a visual indication, which will not be conveyed to users of assistive technologies – such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (the visible text of the button), or is included through alternative means, such as additional hidden text.

## Icons

A button is rectangular and typically displays a text label describing its action, which can either contain or be replaced by an icon that conveys the same message.

Use the `icon` prop to specify the icon to be rendered. You may specify in which position the icon should be rendered by setting the `iconPosition` prop to one of `top`, `right`, `bottom`, or `left`.

```js
import Button from './src/components/Button/Button';
import React from 'react';
import ReactDOM from 'react';

const container = document.getElementById('#container');
const props = {
    icon: 'edit',
    // on of top|right|bottom|left
    iconPosition: 'left'
};

ReactDOM.render(React.createElement(Button, props), container);
```

## Tags

The DOM element tag is choosen automatically for you based on the props you supply. Passing a `href` will result in the button using a `<a />` element otherwise a `<button />` element will be used.

```js
import Button from './src/components/Button/Button';
import React from 'react';
import ReactDOM from 'react';

const container = document.getElementById('#container');
const props = { href: 'http://www.google.com' };

ReactDOM.render(React.createElement(Button, props), container);
```
