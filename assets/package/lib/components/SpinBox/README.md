# SpinBox

> `SpinBox` allows the user to choose a value by clicking the up/down buttons or pressing up/down on the keyboard to increase/decrease the value currently displayed. The user can also type the value in manually. The spin box supports only integer values, therefore it will disallow non-numeric values from being entered.

Every time the value changes `SpinBox` calls the `onValueChanged` event handler passed as a prop from its parent component. The current value will be passed as a parameter to the event handler.

Clicking the up/down buttons or using the keyboard accelerator's up and down arrows will increase or decrease the current value in steps of size `singleStep`. The minimum and maximum value and the step size can be set using the `minValue`, `maxValue` and `singleStep` props.

Most spin boxes are directional, but `SpinBox` can also operate as a circular spin box, i.e. if the range is 0-99 and the current value is 99, clicking "up" will give 0 if `wrapping` is set to true. Set the `wrapping` prop type to true if you want circular behavior.

The displayed value can be prepended and appended with arbitrary strings indicating, for example, currency or the unit of measurement. Use the `prefix` and `suffix` properties to prepend or append a string to the spin box value, respectively. The text in the spin box is retrieved with getText() (which includes any prefix and suffix), or with cleanText() (which has no prefix, no suffix and no leading or trailing whitespace).

# Usage

```js
<SpinBox minValue={-20} maxValue={20} value={0} singleStep={1} />
```

This example shows the simplest way to use `SpinBox`. It accepts values from `-20` to `20`, the current value can be increased or decreased by `1` with either the arrow buttons or Up and Down keys, and the default value is `0`.

```js
<SpinBox prefix={'$'} />
```

For simplicity, we show a spin box with a prefix and no suffix. It is also possible to use both at the same time.
