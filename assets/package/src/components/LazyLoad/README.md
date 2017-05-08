# LazyLoad

> The `LazyLoad` class provides a higher order component that injects into its child component properties regarding its visibility on the viewport:

- The `isVisible` property indicates whether component is visible within the viewport.
- The `isFirstTimeVisible` property indicates whether it is the first time the component has become visible.
- The `isLazyLoaded` property indicates whether a child component is being lazy loaded. Useful when you are trying to promote wider reusability across your components by allowing them to behave differently when not wrapped within a `LazyLoad` component.

The `LazyLoad` class will automatically handle scenarios where child components are wrapped within an overflown element.

## Usage

In this example we are going to defer downloading a large image until the component is scrolled into view, but serve a small image for the purpose of SEO indexing.

```js
const Macaque = React.createClass({

    getImagePath() {
        if (this.props.isVisible) {
            return '/path/to/large/image';
        } else {
            return '/path/to/small/image';
        }
    }

    render() {
        return (
            <figure>
                <img src={this.getImagePath()} alt={'Macaque in the trees'} />
                <figcaption>A cheeky macaque, Lower Kintaganban River, Borneo. Original by <a href={'http://www.flickr.com/photos/rclark/'}>Richard Clark</a></figcaption>
            </figure>
        );
    }
});

const App = React.createClass({
    render() {
        <LazyLoad once>
            <Macaque />
        </LazyLoad>,
    };
});

React.render(App, document.getElementById('container'));
```

You could leverage the injected properties to modify the implementation to meet your needs. Perhaps, you'd prefer to avoid rendering an image until the component is scrolled into view.

## Properties

- `offset` - Defines how far below, above, to the left, and to the right of the viewport you want to begin displaying your content. If you specify `0`, your content will be displayed as soon as it is visible in the viewport, if you want to load `1000` pixels below or above the viewport, use `1000`.
- `once` - Once the lazy loaded component is loaded, do not detect scroll/resize event anymore. Useful for images or simple components.
- `scroll` - Indicates whether it should respond to `scroll` events.
- `resize` - Indicates whether it should respond to `resize` events. **If you tend to support legacy IE, set this property carefully, refer to [this question](http://stackoverflow.com/questions/1852751/window-resize-event-firing-in-internet-explorer) for further reading**.
