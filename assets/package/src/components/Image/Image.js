import React, { PropTypes } from 'react';
import { each, omit, keys } from 'lodash';
import * as AssetUtils from '../../utilities/AssetUtils';

/**
 * The `Image` class provides a React component for displaying images.
 * @class Image
 * @augments React.Component
 */
const Image = React.createClass({

    displayName: 'Image',

    propTypes: {
        /**
         * The text that's read by the screen reader when the user interacts with the image.
         */
        accessibilityLabel: PropTypes.string.isRequired,
        /**
         * Invoked when load is aborted.
         */
        onAbort: PropTypes.func,
        /**
         * Invoked when load is not completed successfully.
         */
        onError: PropTypes.func,
        /**
         * Invoked when load completes successfully.
         */
        onLoad: PropTypes.func,
        /**
         * Invoked when either load succeeds or fails.
         */
        onLoadEnd: PropTypes.func,
        /**
         * Invoked on load start.
         */
        onLoadStart: PropTypes.func,
        /**
         * A URI string representing the resource identifier for the static image.
         */
        source: PropTypes.string.isRequired
    },

    componentDidMount() {
        this.loadImage();
    },

    componentWillReceiveProps(nextProps) {
        if (this.props.source !== nextProps.source) {
            this.loadImage();
        }
    },

    emitEvent(eventName, ...eventArgs) {
        if (this.props[eventName]) {
            this.props[eventName].apply(null, eventArgs);
        }
    },

    loadImage() {
        this.emitEvent('onLoadStart');

        const image = AssetUtils.getImage(this.props.source, {
            onAbort: () => each(['onAbort', 'onLoadEnd'], (event) => this.emitEvent(event, image)),
            onError: () => each(['onError', 'onLoadEnd'], (event) => this.emitEvent(event, image)),
            onLoad: () => each(['onLoad', 'onLoadEnd'], (event) => this.emitEvent(event, image))
        });
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        const otherProps = omit(this.props, keys(Image.propTypes));

        return (
            <img src={this.props.source} alt={this.props.accessibilityLabel} {...otherProps} />
        );
    }
});

export default Image;
