# Modal

> A `Modal` component renders an overlay that is a child to the parent window and usurps the parent's control.

## Usage
```js
import React from 'react';
import { Modal } from 'hbc-core-components';

export default React.createClass({

    getInitialState() {
        return { isModalOpened: false };
    }

    toggleModal() {
        this.setState({ isModalOpened: !this.state.isModalOpened })
    }

    render() {
        return (
            <Button onClick={this.toggleModal}>Toggle Modal</Button>
            <Modal isOpen={this.state.isModalOpened} onRequestClose={this.toggleModal}>
                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.</p>
            </Modal>
        )
    }
});
```

## Options
- className: React.PropTypes.string,
- closeLabel: React.PropTypes.string,
- closeOnClickAway: React.PropTypes.bool, // trigger close event when click occurs outside content area
- hasBackdrop: React.PropTypes.bool,
- isDismissible: React.PropTypes.bool,
- isOpen: React.PropTypes.bool,
- onRequestClose: React.PropTypes.func
- width: React.PropTypes.oneOf(['default', 'full']) // pass in 'full' to render a full width dialog

## Unit testing with a Modal
Due to the nature of `Portal`, whenever you are testing a component that implements `Modal`, you will need to render your component into a container and call `unmountComponentAtNode` so the `componentWillUnmount` lifecycle method in `Portal` is called and cleans up the DOM.

Because of the complexity of `Modal` and its default state of `isOpen: false`, you will need to utilize `waitFor` and use 'component.refs.modal.state.isOpen' as your predicate (see TestUtils).

Sample code:
```js
let component;

before(() => {
    const mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
    ...
    component = render(element, mountPoint);
});

afterEach(() => {
    unmountComponentAtNode(mountPoint);
});
```

#### VersionOne
- [[B-10192][]] - AEM Sites - Tech - Create modal component
[B-10192]: https://www15.v1host.com/Saks5a/story.mvc/Summary?oidToken=Story:74108
