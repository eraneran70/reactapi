'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./Card.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Card = (0, _react.createClass)({

    displayName: 'Card',

    propTypes: {
        bodyContent: _react.PropTypes.string,
        children: _react.PropTypes.node,
        className: _react.PropTypes.string,
        size: _react.PropTypes.oneOf(['default', 'tall']),
        title: _react.PropTypes.string.isRequired
    },

    getDefaultProps: function getDefaultProps() {
        return {
            size: 'default'
        };
    },
    _renderContent: function _renderContent() {
        if (this.props.bodyContent) {
            return _react2['default'].createElement('div', {
                className: 'card__body-copy',
                dangerouslySetInnerHTML: { __html: this.props.bodyContent } });
        }

        return _react2['default'].createElement(
            'div',
            { className: 'card__body-copy' },
            this.props.children
        );
    },
    render: function render() {
        var classNames = (0, _classnames2['default'])('card', 'card--' + this.props.size, this.props.className);

        return _react2['default'].createElement(
            'div',
            { className: classNames },
            _react2['default'].createElement(
                'div',
                { className: 'card__inner' },
                _react2['default'].createElement(
                    'h2',
                    { className: 'card__title' },
                    this.props.title
                ),
                this._renderContent()
            )
        );
    }
});

exports['default'] = Card;