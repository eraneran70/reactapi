# Card

> `Card` component is used to display a title and body content inside of a card.

## Usage
There are two ways to pass content into a Card, either as stringified HTML in the `bodyContent` prop, or as children.

```js
render() {
    return (
        <Card title="Your card title">
            <p>Some body content</p>
            <p>Some more body content</p>
            <p>A <a href="/thing">linked</a> body content</p>
        </Card>
    )
}
```

Or

```js
render() {
    const cardContent = "<p>This is some content</p><p>some other content</p>"
    return (
        <Card title="Your card title" bodyContent={cardContent} />
    )
}
```

## Options
- bodyContent: React.PropTypes.string,
- title: React.PropTypes.string
- size: React.PropTypes.oneOf(['default', 'tall'])
