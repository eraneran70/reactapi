# TextField

> `TextField` component uses [Formsy.Mixin](https://github.com/christianalfoni/formsy-react/blob/master/API.md#formsymixin) to extend functionalities. When it is used, it should be wrapped by a [Formsy](https://github.com/christianalfoni/formsy-react) form.

## Props

#### name `required`

The name under which the text field will be.

#### id `required`

The id of the <input> html element.

#### label `required`

The label for the text field.

#### value `optional`

Default value for text field.

#### autoFocus `optional`

Focuses the field when page loads.

#### maxLength `optional`

Set the max length of this field.

#### isDisabled `optional`

Disables text field input. Defaults to `false`.

#### onChange `optional`

Custom callback on input change event.

#### onBlur `optional`

Custom callback on input blur event

#### className `optional`

Custom classes for the input.

#### type `optional`

Accept different type attribute values, such as `email` and `password`, etc. Default value is `text`

#### evaluateOnBlur `optional`

A boolean value set to enable field validation on blur event. Default value is true.

#### evaluateOnChange `optional`

A boolean value set to enable field validation on change event. Default value is false.

Check [formsy-react API](https://github.com/christianalfoni/formsy-react/blob/master/API.md) for `validations`, `validationError`, `validationErrors`, and other props.

Formsy handles `TextField` component validations. Use the validation properties in [Formsy validation error documentation](https://github.com/christianalfoni/formsy-react/blob/master/API.md#validationerror) to set [validation rules]() and error messages. Formsy introduces a new property `isDefaultRequiredValue` to be used for required field validation message. Check [formsy-react API](https://github.com/christianalfoni/formsy-react/blob/master/API.md#required) for more information.

## Usage

```jsx
<TextField
    name='email'
    label='Email'
    validations='isEmai'
    validationErrors={{
        isDefaultRequiredValue: 'This field is required',
        isEmail: 'You have to type valid email'
    }}
    required />
```
