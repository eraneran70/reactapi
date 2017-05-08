# Tooltip

> `Tooltip` class provides a component that allows you to render tool tips (balloon help) anchored to any component.

## Usage

```
React.createClass({

    getInitialState() {
        return { isOpen: false };
    },

    handleButtonClick(event) {
        this.setState({ isOpen: true, anchorElement: event.target });
    },

    render() {
        <Button onClick={this.handleButtonClick}>Show Cheeky Macaque</Button>
        <Tooltip
            isOpen={this.state.isOpen}
            anchorElement={this.state.anchorElement}
            onRequestClose={() => this.setState({ isOpen: false })}>
            <figure>
                <img src="/macaque.jpg" alt="Macaque in the trees">
                <figcaption>A cheeky macaque, Lower Kintaganban River, Borneo. Original by <a href="http://www.flickr.com/photos/rclark/">Richard Clark</a></figcaption>
            </figure>
        </Tooltip>
    }
});
```

## Properties

The `Tooltip` component inherits all properties available to the `Position` component.

- `autoCloseWhenOffScreen` - If `true`, the tooltip will hide when the anchor element scrolls off the screen.
- `className` - A CSS class or classes for the root element.
- `isOpen` - Controls the visibility of the tooltip.
- `showCloseButton` - If `true`, the tooltip will have an `X` in the top right to close the tooltip.

## Events

- `onRequestClose` - A callback that fires when the tooltip thinks it should close.
