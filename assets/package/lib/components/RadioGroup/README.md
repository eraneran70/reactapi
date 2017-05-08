#  Overview

`RadioGroup` component is used to create a group of `<input type="radio">`.
[B-12137](https://www15.v1host.com/Saks5a/story.mvc/Summary?oidToken=Story:89075) TECH: Accounts - RadioGroup Component

## Props

#### name `required`

The name under which the radiogroup will be.

#### label `required`

The label for the radiogroup.

#### options `required`

Array of objects describing the radio inputs inside the group.

- **label** `required` Text for the label
- **value** `required` Value for the input, accepts types: `String`, `Number`, `Boolean`
- **isDisabled** `optional` Disables a single radio input
- **className** `optional` Custom classes for the label

#### type `optional`

Either `inline` or `stacked`. Defaults to `stacked`.

#### value `optional`

Default value for the radiogroup. Should match the value of one of the options. Accepts types: `String`, `Number`, `Boolean`.

#### isDisabled `optional`

Disables every radio input in the group. Defaults to `false`.

#### onChange `optional`

Custom callback on input change event.

#### className `optional`

Custom classes for the radiogroup.

Check [formsy-react API](https://github.com/christianalfoni/formsy-react/blob/master/API.md) for `validations`, `validationError`, `validationErrors`, and other props.

## Usage

```jsx
<RadioGroup
    name="swatches"
    type="inline"
    label="Please select an option"
    options={options}
    validationErrors={{
        'isDefaultRequiredValue': 'Validation error message'
    }}
    required />
```
