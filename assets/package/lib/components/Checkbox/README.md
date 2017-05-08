#  Overview

`Checkbox` component is used to create a form component `<input type="checkbox">`.

`Checkbox` component uses [Formsy.Mixin](https://github.com/christianalfoni/formsy-react/blob/master/API.md#formsymixin) to extend functionalities. When it is used, it should be wrapped by a [Formsy](https://github.com/christianalfoni/formsy-react) form.

This `Checkbox` component returns `true` or `false` value when submitted through the form. To return custom values please use `CheckboxGroup` component.

## Props

#### name `required`

The name under which the checkbox will be.

#### label `required`

The label for the checkbox.

#### value `optional`

Default boolean value for checkbox. If {true} then the box is checked initially. Otherwise it is unchecked initially.

#### isDisabled `optional`

Disables every checkbox input. Defaults to `false`.

#### onChange `optional`

Custom callback on input change event.

#### className `optional`

Custom classes for the checkbox.

Check [formsy-react API](https://github.com/christianalfoni/formsy-react/blob/master/API.md) for `validations`, `validationError`, `validationErrors`, and other props.

To validate if this checkbox is checked, use `validations="isTrue"` and `validationError="Error Message"` instead of `required`.

## Usage

```jsx
<Checkbox
    name="accept terms"
    label="Please accept terms"
    value= {true}
    validations={"isTrue"}
    validationError={"You have to accept terms"} />
```
