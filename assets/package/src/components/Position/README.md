The `Position` component calculates the coordinates for its child, to position it relative to another component or DOM element. Useful for creating callouts and tooltips, the `Position` component injects a `position` property with `left` and `top` values for the position that should be set on its child and a `feedback` property that provides feedback about the position and dimensions of both elements, as well as calculations to their relative position. Both `anchor` and `target` have these properties: `element`, `left`, `top`, `width`, `height`. In addition, there's `horizontal`, `vertical` and `important`, giving you twelve potential directions like `{ horizontal: "center", vertical: "left", important: "horizontal" }`.

When the `autoStyle` property is set to `true`, the `Position` component injects a `style` property with `left` and `top` values to automatically position its child component.

When the `autoPosition` property is set to `true` and the positioned element overflows the viewport in some direction, the calculated position will make itself fit on screen. The `Position` component will use the `collision` strategy specified to determine how to reposition its child.

**Implementation is heavily based on jQuery UI position utility.**

## Usage

```jsx
<Button ref={'anchor'} />
<Position
    anchorElement={() => this.refs.anchor}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom'}}
    targetOrigin={{ horizontal: 'left', vertical: 'top' }}>
    <div className={'overlay'} style={{ position: 'absolute' }}>
        {this.props.children}
    </div>
</Position>
```

## Properties

- `anchorElement` - The element to position against.
- `anchorOrigin` - Defines which position on the anchor element to align the positioned element against. Accepts an object with `horizontal` and `vertical` values. For example, if you wanted to align the `bottom` `right` corner of the `anchorElement` to the `targetElement` you can pass `{ horizontal: "right", vertical: "bottom" }` as the value.
- `anchorOffset` - Defines the offset to apply to `anchorOrigin`. Similar to `targetOrigin` and `anchorOrigin`, this accepts an object for horizontal/vertical values.
- `autoPosition` - If `true`, the calculation (potentially) ignores `targetOrigin`, `targetOffset`, `anchorOrigin`, and `anchorOffset` to make itself fit on screen, which is useful for mobile devices. The `collision` strategy specified will be used to determine how to reposition the positioned element.
- `children` - Use this property to set the component to position.
- `collision` - When the positioned element overflows the viewport in some direction, move it to an alternative position. Similar to `targetOrigin` and `anchorOrigin`, this accepts an object for horizontal/vertical values. The following strategies are supported:
    - `"flip"`: Flips the element to the opposite side of the anchor and the collision detection is run again to see if it will fit. Whichever side allows more of the element to be visible will be used.
    - `"fit"`: Shift the element away from the edge of the window.
    - `"flipfit"`: First applies the flip logic, placing the element on whichever side allows more of the element to be visible. Then the fit logic is applied to ensure as much of the element is visible as possible.
- `targetOrigin` - Defines which position on the element being positioned to align with the `anchorElement`. Accepts an object with `horizontal` and `vertical` values.
- `targetOffset` - Defines the offset to apply to `targetOrigin`. Similar to `targetOrigin` and `anchorOrigin`, this accepts an object for horizontal/vertical values.
- `withinElement` - The element to position within, affecting collision detection.
