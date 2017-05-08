# DropDownMenu

> `DropDownMenu` component is used to create HTML `<select> ... </select>`.
[B-12138](https://www15.v1host.com/Saks5a/story.mvc/Summary?oidToken=Story:89076) TECH: Accounts - Select Component

## Props

#### name `required`

The name of the select element. Required for Formsy.

#### options `required`

Array of objects describing options in the select.

- **label** `required` Text for the option
- **value** `required` Value for the option
- **isDisabled** `optional` State of the option

#### label `required`

Text for the first option that will act as a placeholder.

#### value `optional`

Default value for the select. Should match the value of one of the options.

#### isDisabled `optional`

Disables the select element. Defaults to `false`.

#### onChange `optional`

Custom callback on select change event.

#### className `optional`

Custom classes for the select component.

Check [formsy-react API](https://github.com/christianalfoni/formsy-react/blob/master/API.md) for `validations`, `validationError`, `validationErrors`, and other props.

## Usage

```jsx
<DropDownMenu
    name="dob"
    label="Select age"
    options={options}
    validationError={'Please select age'}
    required />
```
