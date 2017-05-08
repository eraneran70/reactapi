'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpinnerConstants = undefined;

require('./WaitingSpinner.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SpinnerConstants = exports.SpinnerConstants = {
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
exports['default'] = _react2['default'].createClass( /** @lends WaitingSpinner.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'WaitingSpinner',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        className: _react.PropTypes.string,
        size: _react.PropTypes.oneOf([SpinnerConstants.Sizes.SMALL, SpinnerConstants.Sizes.MEDIUM, SpinnerConstants.Sizes.LARGE]),
        type: _react.PropTypes.oneOf([SpinnerConstants.Types.DEFAULT, SpinnerConstants.Types.PRIMARY, SpinnerConstants.Types.INVERTED])
    },

    getDefaultProps: function getDefaultProps() {
        return {
            type: SpinnerConstants.Types.DEFAULT,
            size: SpinnerConstants.Sizes.SMALL
        };
    },
    getClassSet: function getClassSet() {
        return (0, _classnames2['default'])('waiting-spinner', {
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
    render: function render() {
        return _react2['default'].createElement(
            'div',
            { className: this.getClassSet() },
            _react2['default'].createElement('div', { className: 'waiting-spinner__dot' }),
            _react2['default'].createElement('div', { className: 'waiting-spinner__dot' }),
            _react2['default'].createElement('div', { className: 'waiting-spinner__dot' })
        );
    }
});