# TextArea

> `TextArea` component uses [Formsy.Mixin](https://github.com/christianalfoni/formsy-react/blob/master/API.md#formsymixin) to extend functionalities. When it is used, it should be wrapped by a [Formsy](https://github.com/christianalfoni/formsy-react) form.

## Props

#### cols

Specifies the visible width of a text area.

#### rows

Specifies the visible number of lines in a text area.

#### name `required`

The name under which the text field will be.

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

#### evaluateOnBlur `optional`

A boolean value set to enable field validation on blur event. Default value is true.

#### evaluateOnChange `optional`

A boolean value set to enable field validation on change event. Default value is false.

## Usage

```jsx
<TextArea
    cols="3"
    rows="3"
    id="Id"
    name='notes'
    label='Notes'
    required />
```
