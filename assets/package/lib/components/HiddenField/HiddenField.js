'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = _react2['default'].createClass({

    displayName: 'HiddenField',

    propTypes: {
        name: _react2['default'].PropTypes.string.isRequired,
        value: _react2['default'].PropTypes.string.isRequired
    },

    mixins: [_formsyReact2['default'].Mixin],

    render: function render() {
        return _react2['default'].createElement('input', { type: 'hidden', name: this.props.name, value: this.props.value });
    }
});