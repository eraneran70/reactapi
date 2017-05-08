# ProgressiveMedia

> The `ProgressiveMedia` class provides a React component for Progressive Image Loading. It loads a low resolution version of an image blurred before replacing it with a large, high-resolution image after it was loaded completely.

Inspired by a blog article on Medium's progressive image loading by José Manuel Pérez: https://jmperezperez.com/medium-image-progressive-loading-placeholder/

The `ProgressiveMedia` component can be wrapped within a `LazyLoad` component to prevent it from loading the large, high-resolution static image until the component is visible on the screen. Otherwise, it will load it immediately after it is mounted on the DOM.

## Usage

```es6
export default class ProductTile extends React.Component {
    render() {
        return (
            <article className={'product-tile'}>
                <section className={'product-tile__media'}>
                    <LazyLoad once offset={400}>
                        <ProgressiveMedia
                            defaultSource={'http://image.s5a.com/is/image/saksoff5th/0400088160556?wid=20'}
                            source={'http://image.s5a.com/is/image/saksoff5th/0400088160556?wid=484'}
                            accessibilityLabel={'Rose-Print Neoprene Sheath Dress'}
                            intrinsicWidth={242}
                            intrinsicHeight={323} />
                    </LazyLoad>
                </section>
                <section className={'product-tile__summary'}>
                    <h1>Alexia Admor</h1>
                    <p>Rose-Print Neoprene Sheath Dress</p>
                    <p>$79.99</p>
                </section>
            </article>
        );
    }
}
```

## Properties

- `accessibilityLabel` - The text that's read by the screen reader when the user interacts with the image.
- `className` - A CSS class to apply to the component's DOM node.
- `defaultSource` - A URI string representing the resource identifier for the small, low-resolution static image to display while loading the image source.
- `intrinsicHeight` - The natural height of the image. If provided, it will be use to calculate the intrinsic ratio of the image. Otherwise, it will be computed after the image is loaded, which may cause reflows.
- `intrinsicWidth` - The natural width of the image. If provided, it will be use to calculate the intrinsic ratio of the image. Otherwise, it will be computed after the image is loaded, which may cause reflows.
- `isLazyLoaded` - Indicates whether the component is being lazy loaded. Typically injected by the `LazyLoad` component.
- `isVisible` - Indicates whether the component is visible within the viewport. Typically injected by the `LazyLoad` component.
- `source` - A URI string representing the resource identifier for the large, high-resolution static image.
