#  Overview

`CheckboxGroup` component is used to create a group of `<input type="checkbox">`.
[B-12182](https://www15.v1host.com/Saks5a/story.mvc/summary?oidToken=Story%3A89729#/) TECH: Accounts - CheckboxGroup

## Props

#### name `required`

The name under which the checkboxgroup will be.

#### options `required`

Array of objects describing the checkbox inputs inside the group.

- **label** `required` Text for the label
- **value** `required` Value for the input
- **isDisabled** `optional` Disables a single checkbox input
- **className** `optional` Custom classes for the label

#### label `required`

The label for the checkbox group.

#### type `optional`

Either `inline` or `stacked`. Defaults to `stacked`.

#### value `optional`

Default value for the checkboxgroup. Should be an array and match the value of one or more of the options. Defaults to empty array.

#### isDisabled `optional`

Disables every checkbox input in the group. Defaults to `false`.

#### onChange `optional`

Custom callback on input change event.

#### className `optional`

Custom classes for the checkboxgroup.

Check [formsy-react API](https://github.com/christianalfoni/formsy-react/blob/master/API.md) for `validations`, `validationError`, `validationErrors`, and other props.

## Usage

```jsx
<CheckboxGroup
    name="options"
    type="inline"
    label="Please select from below"
    options={options}
    validations="minLength:1",
    validationError="Select at least one option" />
```
