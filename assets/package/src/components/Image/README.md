# Image

> The `Image` class provides a React component for displaying images.

## Usage

```js
export default class ProductTile extends React.Component {
    render() {
        return (
            <article className={'product-tile'}>
                <section className={'product-tile__media'}>
                    <Image
                        source={'http://image.s5a.com/is/image/saksoff5th/0400088160556'}
                        accessibilityLabel={'Rose-Print Neoprene Sheath Dress'}
                        onLoad={() => this.setState({ isImageLoaded: true })} />
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
- `onAbort` - Invoked when load is aborted.
- `onError` - Invoked when load is not completed successfully.
- `onLoad` - Invoked when load completes successfully.
- `onLoadEnd` - Invoked when either load succeeds or fails.
- `onLoadStart` - Invoked on load start.
- `source` - A URI string representing the resource identifier for the static image.
