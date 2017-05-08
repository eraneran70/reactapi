# StandaloneLink

> `StandaloneLink` allows the user to define an anchor tag with the appropriate banner styles applied. This component is for links that appear alone, rather than inline with text.

Adding the `hideInitialUnderline` prop will cause the initial underline to be rendered transparent and appear only on hover.

The `onClick` prop will invoke the function passed as a value on click. This causes the component to behave like a button rather than a link.

# Usage

## As a link

```js
<StandaloneLink href="#">I am a Link</StandaloneLink>
```

## As a button
```js
<StandaloneLink onClick={alert('hello World!')}>I look like a link, but behave like a button!</StandaloneLink>
```
