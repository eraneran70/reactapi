The `Portal` class provides a component that renders its children into a new "subtree" outside of the current component hierarchy. You can think of it as a declarative `appendChild()`.

The children of `Portal` will be appended to the `container` specified. By default, the children are appended to the document body, which is easier than managing the `z-index` of everything on the page. It's also better for accessibility and makes stacking a snap, since components will stack in mount order.

The implementation is heavily inspired by [khan/layered-component-mixin].

Note: You can't use a ref to identify the wrapped child, since this component will be stealing the ref from the owner. You should use the component API to obtain a reference to the wrapped child instead.

## Usage

```jsx
<Portal>
    <div class="overlay">
        <figure>
            <img src="path/to/cats.jpg" />
            <figcaption>A developer's best friend is a cat.<figcaption>
        </figure>
    </div>
</Portal>
```

[khan/layer-component-mixin]: https://github.com/Khan/react-components/blob/master/js/layered-component-mixin.jsx

## Properties

- `container` - A Node, Component instance, or function that returns either. The `container` will have the `Portal` children appended to it.
