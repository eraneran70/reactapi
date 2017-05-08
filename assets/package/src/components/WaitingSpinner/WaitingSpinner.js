import './WaitingSpinner.scss';

import React, { PropTypes } from 'react';
import cx from 'classnames';

export const SpinnerConstants = {
    Types: {
        DEFAULT: 'default',
        PRIMARY: 'primary',
        INVERTED: 'inverted'
    },
    Sizes: {
        SMALL: 'small',
        MEDIUM: 'medium',
        LARGE: 'large'
    }
};

/**
 * A {@link WaitingSpinner} is a custom component for showing a "waiting" or
 * "loading" spinner icon in applications.
 * @class WaitingSpinner
 * @augments React.Component
 */
export default React.createClass(/** @lends WaitingSpinner.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'WaitingSpinner',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        className: PropTypes.string,
        size: PropTypes.oneOf([
            SpinnerConstants.Sizes.SMALL,
            SpinnerConstants.Sizes.MEDIUM,
            SpinnerConstants.Sizes.LARGE
        ]),
        type: PropTypes.oneOf([
            SpinnerConstants.Types.DEFAULT,
            SpinnerConstants.Types.PRIMARY,
            SpinnerConstants.Types.INVERTED
        ])
    },

    getDefaultProps() {
        return {
            type: SpinnerConstants.Types.DEFAULT,
            size: SpinnerConstants.Sizes.SMALL
        };
    },

    getClassSet() {
        return cx('waiting-spinner', {
            'waiting-spinner--default': this.props.type === SpinnerConstants.Types.DEFAULT,
            'waiting-spinner--primary': this.props.type === SpinnerConstants.Types.PRIMARY,
            'waiting-spinner--inverted': this.props.type === SpinnerConstants.Types.INVERTED,
            'waiting-spinner--small': this.props.size === SpinnerConstants.Sizes.SMALL,
            'waiting-spinner--medium': this.props.size === SpinnerConstants.Sizes.MEDIUM,
            'waiting-spinner--large': this.props.size === SpinnerConstants.Sizes.LARGE
        }, this.props.className);
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div className={this.getClassSet()}>
                <div className="waiting-spinner__dot" />
                <div className="waiting-spinner__dot" />
                <div className="waiting-spinner__dot" />
            </div>
        );
    }
});
