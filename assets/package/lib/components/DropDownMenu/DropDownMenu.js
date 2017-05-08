'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./DropDownMenu.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DEFAULT_VALUE = '';

/**
 * DropDownMenu class.
 * @class DropDownMenu
 * @augments Component
 */
var DropDownMenu = _react2['default'].createClass( /** @lends DropDownMenu.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'DropDownMenu',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        className: _react.PropTypes.string,
        isDisabled: _react.PropTypes.bool,
        label: _react.PropTypes.string,
        name: _react.PropTypes.string.isRequired,
        onChange: _react.PropTypes.func,
        options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            value: _react.PropTypes.node.isRequired,
            label: _react.PropTypes.node.isRequired,
            isDisabled: _react.PropTypes.bool
        }).isRequired).isRequired,
        value: _react.PropTypes.any
    },

    mixins: [_formsyReact2['default'].Mixin],

    getDefaultProps: function getDefaultProps() {
        return {
            value: (0, _get3['default'])(this.props, 'value', DEFAULT_VALUE)
        };
    },
    getSelectElementClassSet: function getSelectElementClassSet() {
        return (0, _classnames2['default'])({
            'drop-down-menu__select': true,
            'drop-down-menu__select--default': !this.getValue()
        });
    },
    getComponentClassSet: function getComponentClassSet() {
        return (0, _classnames2['default'])({
            'drop-down-menu': true,
            'drop-down-menu--disabled': this.isFieldDisabled(),
            'drop-down-menu--with-error': this.isFieldInvalid()
        }, this.props.className);
    },
    isFieldInvalid: function isFieldInvalid() {
        return !this.isValid() && !this.isPristine();
    },
    isFieldDisabled: function isFieldDisabled() {
        return this.isFormDisabled() || this.props.isDisabled;
    },
    handleChange: function handleChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event);
        }

        var value = event.target.value;


        this.setValue(value);
    },
    maybeRenderDefaultOption: function maybeRenderDefaultOption() {
        if (this.props.label) {
            return _react2['default'].createElement(
                'option',
                { ref: 'defaultLabel', value: DEFAULT_VALUE, disabled: true },
                this.props.label
            );
        }
        return null;
    },
    maybeRenderErrorMessage: function maybeRenderErrorMessage() {
        var errorMessage = void 0;

        if (!this.isPristine()) {
            errorMessage = this.getErrorMessage();
        }

        if (errorMessage) {
            return _react2['default'].createElement(
                'div',
                { className: 'drop-down-menu__error-message', ref: 'errorMessage' },
                _react2['default'].createElement(
                    'span',
                    null,
                    errorMessage
                )
            );
        }

        return null;
    },
    renderOptions: function renderOptions() {
        return (0, _map3['default'])(this.props.options, function (option, index) {
            var value = option.value,
                label = option.label,
                isDisabled = option.isDisabled;


            return _react2['default'].createElement(
                'option',
                { key: index, value: value, disabled: isDisabled },
                label
            );
        });
    },
    renderSelectElement: function renderSelectElement() {
        return _react2['default'].createElement(
            'select',
            {
                ref: 'selectElement',
                name: this.props.name,
                disabled: this.isFieldDisabled(),
                className: this.getSelectElementClassSet(),
                value: this.getValue(),
                onChange: this.handleChange },
            this.maybeRenderDefaultOption(),
            this.renderOptions()
        );
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
            { className: this.getComponentClassSet() },
            _react2['default'].createElement(
                'div',
                { className: 'drop-down-menu__wrapper' },
                this.renderSelectElement(),
                _react2['default'].createElement(_Icon2['default'], { name: 'caret-down' })
            ),
            this.maybeRenderErrorMessage()
        );
    }
});

exports['default'] = DropDownMenu;