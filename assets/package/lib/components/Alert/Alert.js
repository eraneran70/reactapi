'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./Alert.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var STYLES = ['default', 'success', 'info', 'warning', 'danger'];

/**
 * An {@link Alert} component provides contextual feedback messages for typical
 * user actions with the handful of available and flexible alert messages.
 * @class Alert
 * @extends {React.Component}
 */
var Alert = _react2['default'].createClass({

    displayName: 'Alert',

    propTypes: {
        children: _react2['default'].PropTypes.node,
        className: _react2['default'].PropTypes.string,
        closeLabel: _react2['default'].PropTypes.string,
        dismissAfter: _react2['default'].PropTypes.number, // In seconds
        onDismiss: _react2['default'].PropTypes.func,
        style: _react2['default'].PropTypes.oneOf(STYLES)
    },

    getDefaultProps: function getDefaultProps() {
        return {
            style: 'default',
            closeLabel: 'Close Alert'
        };
    },
    componentDidMount: function componentDidMount() {
        if (this.props.dismissAfter && this.isDismissable()) {
            this.dismissTimer = setTimeout(this.props.onDismiss, this.props.dismissAfter * 1000);
        }
    },
    componentWillUnmount: function componentWillUnmount() {
        clearTimeout(this.dismissTimer);
    },
    getClassSet: function getClassSet() {
        var _classes;

        var block = 'alert';
        var classes = (_classes = {}, (0, _defineProperty3['default'])(_classes, block, true), (0, _defineProperty3['default'])(_classes, block + '--dismissable', this.isDismissable()), (0, _defineProperty3['default'])(_classes, this.props.className, Boolean(this.props.className)), (0, _defineProperty3['default'])(_classes, block + '--' + this.props.style, (0, _includes3['default'])(STYLES, this.props.style)), _classes);

        return (0, _classnames2['default'])(classes);
    },
    isDismissable: function isDismissable() {
        return Boolean(this.props.onDismiss);
    },
    maybeRenderDismissButton: function maybeRenderDismissButton() {
        if (this.isDismissable()) {
            return _react2['default'].createElement(
                'button',
                { type: 'button',
                    className: 'alert__close',
                    'aria-label': this.props.closeLabel,
                    onClick: this.props.onDismiss },
                _react2['default'].createElement(
                    'span',
                    { 'aria-hidden': 'true' },
                    '\xD7'
                )
            );
        }
        return null;
    },
    render: function render() {
        return _react2['default'].createElement(
            'div',
            { className: this.getClassSet(), role: 'alert' },
            this.maybeRenderDismissButton(),
            this.props.children
        );
    }
});

exports['default'] = Alert;