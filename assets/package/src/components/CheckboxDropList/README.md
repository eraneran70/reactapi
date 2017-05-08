#  Overview

`CheckboxDropList` component is used to create a droplist of input[type="checkbox"].

## Props

#### name `required`

The name under which the CheckboxDropList will be.

#### options `required`

Array of objects describing the checkbox inputs inside the group.

- **label** `required` Text for the label
- **value** `required` Value for the input
- **isDisabled** `optional` Disables a single checkbox input
- **className** `optional` Custom classes for the label

#### label `required`

The label for the checkbox group.

#### selectedLabel `required`

The dynamic label that shows preceding the number of selected items.
This is for i18n.

#### value `optional`

Default value for the CheckboxDropList. Should be an array and match the value of one or more of the options. Defaults to empty array.

#### isDisabled `optional`

Disables every checkbox input in the group. Defaults to `false`.

#### onChange `optional`

Custom callback on input change event.

#### className `optional`

Custom classes for the CheckboxDropList.

Check [formsy-react API](https://github.com/christianalfoni/formsy-react/blob/master/API.md) for `validations`, `validationError`, `validationErrors`, and other props.

## Usage

```jsx
<CheckboxDropList
    name="options"
    label="Please select some"
    selectedLabel="Selected"
    options={options}
    validations="minLength:1",
    validationError="Select at least one option" />
```
