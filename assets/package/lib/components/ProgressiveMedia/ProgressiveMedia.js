'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Image = require('../Image/Image');

var _Image2 = _interopRequireDefault(_Image);

require('./ProgressiveMedia.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
/* eslint-disable max-len */

var ProgressiveMedia = _react2['default'].createClass( /** @lends ProgressiveMedia.prototype */{

    displayName: 'ProgressiveMedia',

    propTypes: {
        /**
         * The text that's read by the screen reader when the user interacts
         * with the image.
         */
        accessibilityLabel: _react2['default'].PropTypes.string.isRequired,
        /**
         * A CSS class to apply to the component's DOM node.
         */
        className: _react2['default'].PropTypes.string,
        /**
         * A URI string representing the resource identifier for the small,
         * low-resolution static image to display while loading the image source.
         */
        defaultSource: _react2['default'].PropTypes.string.isRequired,
        /**
         * The natural height of the image. If provided, it will be used to
         * calculate the intrinsic ratio of the image. Otherwise, it will be
         * computed after the image is loaded, which may cause reflows.
         */
        intrinsicHeight: _react2['default'].PropTypes.number,
        /**
         * The natural width of the image. If provided, it will be use to
         * calculate the intrinsic ratio of the image. Otherwise, it will be
         * computed after the image is loaded, which may cause reflows.
         */
        intrinsicWidth: _react2['default'].PropTypes.number,
        /**
         * Indicates whether the component is being lazy loaded.
         */
        isLazyLoaded: _react2['default'].PropTypes.bool,
        /**
         * Indicates whether the component is visible within the viewport.
         */
        isVisible: _react2['default'].PropTypes.bool,
        /**
         * A URI string representing the resource identifier for the large,
         * high-resolution static image.
         */
        source: _react2['default'].PropTypes.string.isRequired
    },

    getDefaultProps: function getDefaultProps() {
        return {
            isLazyLoaded: false,
            isVisible: false
        };
    },
    getInitialState: function getInitialState() {
        return {
            intrinsicRatio: this.calculateIntrinsicRatio(this.props.intrinsicWidth, this.props.intrinsicHeight),
            isDefaultImageLoaded: false,
            isImageLoaded: false
        };
    },
    getDefaultImageProps: function getDefaultImageProps() {
        var props = {
            source: this.props.defaultSource,
            accessibilityLabel: this.props.accessibilityLabel,
            onLoad: this.handleDefaultImageLoaded,
            className: (0, _classnames2['default'])({
                'progressive-media__image': true,
                'progressive-media__image--default': true,
                'progressive-media__image--loaded': this.state.isDefaultImageLoaded
            })
        };

        return props;
    },
    getImageProps: function getImageProps() {
        var props = {
            source: this.props.source,
            accessibilityLabel: this.props.accessibilityLabel,
            onLoad: this.handleImageLoaded,
            onError: this.handleImageError,
            className: (0, _classnames2['default'])({
                'progressive-media__image': true,
                'progressive-media__image--loaded': this.state.isImageLoaded,
                'progressive-media__image--error': this.state.isImageError
            })
        };

        return props;
    },
    calculateIntrinsicRatio: function calculateIntrinsicRatio(width, height) {
        return width && height ? height / (width / 100) : 0;
    },
    handleDefaultImageLoaded: function handleDefaultImageLoaded(image) {
        var nextState = { isDefaultImageLoaded: true };

        if (!this.state.intrinsicRatio) {
            nextState.intrinsicRatio = this.calculateIntrinsicRatio(image.width, image.height);
        }

        this.setState(nextState);
    },
    handleImageLoaded: function handleImageLoaded(image) {
        var nextState = { isImageLoaded: true };

        if (!this.state.intrinsicRatio) {
            nextState.intrinsicRatio = this.calculateIntrinsicRatio(image.width, image.height);
        }

        this.setState(nextState);
    },
    handleImageError: function handleImageError() {
        this.setState({ isImageError: true });
    },


    /**
     * Renders the small, low-resolution image.
     * @return {ReactElement}
     */
    renderDefaultImage: function renderDefaultImage() {
        return _react2['default'].createElement(_Image2['default'], this.getDefaultImageProps());
    },


    /**
     * Renders the large, high-resolution image within a `<noscript>` element
     * as fallback for browsers with JS disabled.
     * @return {ReactElement}
     */
    renderFallbackImage: function renderFallbackImage() {
        var markup = '<img src="' + this.props.source + '" alt="' + this.props.accessibilityLabel + '" class="progressive-media__no-script" />';
        return _react2['default'].createElement('noscript', { dangerouslySetInnerHTML: { __html: markup } });
    },


    /**
     * Renders the large, high-resolution image, unless the the component is
     * wrapped within a `LazyLoad` component, in which case it will be loaded
     * when the component is scrolled into view.
     * @return {ReactElement}
     */
    renderImage: function renderImage() {
        if (!this.props.isLazyLoaded || this.props.isVisible) {
            return _react2['default'].createElement(_Image2['default'], this.getImageProps());
        }
        return null;
    },


    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render: function render() {
        return _react2['default'].createElement(
            'div',
            {
                className: (0, _classnames2['default'])('progressive-media', this.props.className),
                style: { paddingTop: this.state.intrinsicRatio + '%' } },
            this.renderDefaultImage(),
            this.renderImage(),
            this.renderFallbackImage()
        );
    }
});

exports['default'] = ProgressiveMedia;