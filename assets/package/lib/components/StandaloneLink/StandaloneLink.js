'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./StandaloneLink.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function StandaloneLink(props) {
    var classes = (0, _classnames2['default'])({
        'standalone-link': true,
        'standalone-link--non-underlined': props.hideInitialUnderline
    }, props.className);

    return _react2['default'].createElement(
        'a',
        { className: classes, style: props.style, onClick: props.onClick, href: props.href },
        props.children
    );
}

StandaloneLink.propTypes = {
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    hideInitialUnderline: _react.PropTypes.bool,
    href: _react.PropTypes.string,
    onClick: _react.PropTypes.func,
    style: _react.PropTypes.object
};

exports['default'] = StandaloneLink;