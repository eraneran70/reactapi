/* eslint-disable max-len */

import React from 'react';
import classnames from 'classnames';
import Image from '../Image/Image';

import './ProgressiveMedia.scss';

/**
 * The `ProgressiveMedia` class provides a React component for Progressive Image
 * Loading. It loads a low resolution version of an image blurred before
 * replacing it with a large, high-resolution image after it was loaded
 * completely.
 *
 * Inspired by a blog article on Medium's progressive image loading by José Manuel Pérez:
 * https://jmperezperez.com/medium-image-progressive-loading-placeholder/
 *
 * The `ProgressiveMedia` component can be wrapped within a `LazyLoad`
 * component to prevent it from loading the large, high-resolution static image
 * until the component is visible on the screen. Otherwise, it will load it
 * immediately after it is mounted on the DOM.
 *
 * @class ProgressiveMedia
 * @augments {React.Component}
 */
const ProgressiveMedia = React.createClass(/** @lends ProgressiveMedia.prototype */{

    displayName: 'ProgressiveMedia',

    propTypes: {
        /**
         * The text that's read by the screen reader when the user interacts
         * with the image.
         */
        accessibilityLabel: React.PropTypes.string.isRequired,
        /**
         * A CSS class to apply to the component's DOM node.
         */
        className: React.PropTypes.string,
        /**
         * A URI string representing the resource identifier for the small,
         * low-resolution static image to display while loading the image source.
         */
        defaultSource: React.PropTypes.string.isRequired,
        /**
         * The natural height of the image. If provided, it will be used to
         * calculate the intrinsic ratio of the image. Otherwise, it will be
         * computed after the image is loaded, which may cause reflows.
         */
        intrinsicHeight: React.PropTypes.number,
        /**
         * The natural width of the image. If provided, it will be use to
         * calculate the intrinsic ratio of the image. Otherwise, it will be
         * computed after the image is loaded, which may cause reflows.
         */
        intrinsicWidth: React.PropTypes.number,
        /**
         * Indicates whether the component is being lazy loaded.
         */
        isLazyLoaded: React.PropTypes.bool,
        /**
         * Indicates whether the component is visible within the viewport.
         */
        isVisible: React.PropTypes.bool,
        /**
         * A URI string representing the resource identifier for the large,
         * high-resolution static image.
         */
        source: React.PropTypes.string.isRequired
    },

    getDefaultProps() {
        return {
            isLazyLoaded: false,
            isVisible: false
        };
    },

    getInitialState() {
        return {
            intrinsicRatio: this.calculateIntrinsicRatio(this.props.intrinsicWidth, this.props.intrinsicHeight),
            isDefaultImageLoaded: false,
            isImageLoaded: false
        };
    },

    getDefaultImageProps() {
        const props = {
            source: this.props.defaultSource,
            accessibilityLabel: this.props.accessibilityLabel,
            onLoad: this.handleDefaultImageLoaded,
            className: classnames({
                'progressive-media__image': true,
                'progressive-media__image--default': true,
                'progressive-media__image--loaded': this.state.isDefaultImageLoaded
            })
        };

        return props;
    },

    getImageProps() {
        const props = {
            source: this.props.source,
            accessibilityLabel: this.props.accessibilityLabel,
            onLoad: this.handleImageLoaded,
            onError: this.handleImageError,
            className: classnames({
                'progressive-media__image': true,
                'progressive-media__image--loaded': this.state.isImageLoaded,
                'progressive-media__image--error': this.state.isImageError
            })
        };

        return props;
    },

    calculateIntrinsicRatio(width, height) {
        return (width && height) ? height / (width / 100) : 0;
    },

    handleDefaultImageLoaded(image) {
        const nextState = { isDefaultImageLoaded: true };

        if (!this.state.intrinsicRatio) {
            nextState.intrinsicRatio = this.calculateIntrinsicRatio(image.width, image.height);
        }

        this.setState(nextState);
    },

    handleImageLoaded(image) {
        const nextState = { isImageLoaded: true };

        if (!this.state.intrinsicRatio) {
            nextState.intrinsicRatio = this.calculateIntrinsicRatio(image.width, image.height);
        }

        this.setState(nextState);
    },

    handleImageError() {
        this.setState({ isImageError: true });
    },

    /**
     * Renders the small, low-resolution image.
     * @return {ReactElement}
     */
    renderDefaultImage() {
        return (<Image {...this.getDefaultImageProps()} />);
    },

    /**
     * Renders the large, high-resolution image within a `<noscript>` element
     * as fallback for browsers with JS disabled.
     * @return {ReactElement}
     */
    renderFallbackImage() {
        const markup = `<img src="${this.props.source}" alt="${this.props.accessibilityLabel}" class="progressive-media__no-script" />`;
        return (<noscript dangerouslySetInnerHTML={{ __html: markup }} />);
    },

    /**
     * Renders the large, high-resolution image, unless the the component is
     * wrapped within a `LazyLoad` component, in which case it will be loaded
     * when the component is scrolled into view.
     * @return {ReactElement}
     */
    renderImage() {
        if (!this.props.isLazyLoaded || this.props.isVisible) {
            return (<Image {...this.getImageProps()} />);
        }
        return null;
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div
                className={classnames('progressive-media', this.props.className)}
                style={{ paddingTop: `${this.state.intrinsicRatio}%` }}>
                {this.renderDefaultImage()}
                {this.renderImage()}
                {this.renderFallbackImage()}
            </div>
        );
    }
});

export default ProgressiveMedia;
