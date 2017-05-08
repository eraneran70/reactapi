# DropDownList

> A `DropDownList` provides a means of presenting a list of options to the user in a way that takes up the minimum amount of screen space.

## Usage

```js
export default React.createClass({

    render() {
        return (

            const props = {
                options: [{
                    value: '1',
                    label: 'january',
                    selected: true
                }, {
                    value: '2',
                    label: 'february',
                    selected: false
                }]
            };

            <DropDownList {...props} />
        );
    }
})
```

## Properties

- `className` One or more space-separated classes to be added to the class
  attribute of the component node.
- `errorMessage` Specifies a message that describes the condition that caused an
  error, typically after processing the selected value.
- `initialValue`
- `isDisabled` Whether the component should be disabled. By default, this
  property is false.
- `name` Specifies the name of the DOM element
- `options` Selectable options to be displayed in the dropdown menu.
- `placeholder` Specifies a short hint that describes the expected value of the
   select field.

## Events

- `onChange` Event emitted when the value of the component is changed.

## Version One Story

- B-10490 / AEM UI - Droplist field

## Specs

- https://www15.v1host.com/Saks5a/attachment.img/75891/S5A_STYLEGUIDE_FORMFIELDS.jpg
