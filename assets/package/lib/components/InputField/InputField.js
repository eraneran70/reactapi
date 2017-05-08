'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./InputField.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * An {@link InputField} provides a component that is used to edit and display
 * a single line of plain text.
 * @class InputField
 * @extends ReactComponent
 */
var InputField = _react2['default'].createClass( /** @lends InputField.prototype */{

    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'InputField',

    /**
     * @property {Object} propTypes - An object used to validate props being
     * passed into the components
     */
    propTypes: {
        className: _react2['default'].PropTypes.string,
        defaultValue: _react2['default'].PropTypes.string,
        errorMessage: _react2['default'].PropTypes.string,
        hideLabel: _react2['default'].PropTypes.bool,
        id: _react2['default'].PropTypes.string,
        isDisabled: _react2['default'].PropTypes.bool,
        label: _react2['default'].PropTypes.string.isRequired,
        name: _react2['default'].PropTypes.string.isRequired,
        onBlur: _react2['default'].PropTypes.func,
        onChange: _react2['default'].PropTypes.func,
        onFocus: _react2['default'].PropTypes.func,
        type: _react2['default'].PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return { type: 'text', hideLabel: false };
    },
    getInitialState: function getInitialState() {
        var defaultValue = this.props.defaultValue;


        return {
            value: defaultValue,
            showPlaceholderAsHeader: !(0, _isEmpty3['default'])(defaultValue)
        };
    },
    getInputFieldClassSet: function getInputFieldClassSet() {
        return (0, _classnames2['default'])({
            'input-field': true,
            'input-field--with-error': this.hasErrorMessage()
        }, this.props.className);
    },
    hasErrorMessage: function hasErrorMessage() {
        return !(0, _isEmpty3['default'])(this.props.errorMessage);
    },
    handleValueChange: function handleValueChange(event) {
        var value = event.target.value;


        this.setState({ value: value });

        if (this.props.onChange) {
            this.props.onChange(event, value);
        }
    },
    handleOnFocus: function handleOnFocus() {
        if (!this.props.hideLabel) {
            this.setState({ showPlaceholderAsHeader: true });
        }
    },
    handleOnBlur: function handleOnBlur(event) {
        var value = this.state.value;


        this.setState({ showPlaceholderAsHeader: !(0, _isEmpty3['default'])(value) });

        if (this.props.onBlur) {
            this.props.onBlur(event, value);
        }
    },
    renderInputElement: function renderInputElement() {
        var disabled = this.props.isDisabled ? 'disabled' : false;
        var placeholderClassNames = (0, _classnames2['default'])({
            'input-field__placeholder': true,
            'input-field__placeholder--as-header': this.state.showPlaceholderAsHeader,
            'input-field__placeholder--as-adalabel': this.props.hideLabel
        });

        return _react2['default'].createElement(
            'label',
            { className: 'input-field__label', htmlFor: this.props.id, ref: 'placeholder' },
            _react2['default'].createElement('input', { ref: 'input',
                className: 'input-field__input-element',
                id: this.props.id,
                name: this.props.name,
                type: this.props.type, disabled: disabled,
                value: this.state.value,
                onChange: this.handleValueChange,
                onFocus: this.handleOnFocus,
                onBlur: this.handleOnBlur }),
            _react2['default'].createElement(
                'span',
                { className: placeholderClassNames },
                this.props.label
            )
        );
    },
    renderErrorMessageIfPresent: function renderErrorMessageIfPresent() {
        if (!this.hasErrorMessage()) {
            return null;
        }
        return _react2['default'].createElement(
            'span',
            { className: 'input-field__error-message', ref: 'errorMessage' },
            this.props.errorMessage
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
            { className: this.getInputFieldClassSet() },
            this.renderInputElement(),
            this.renderErrorMessageIfPresent()
        );
    }
});

exports['default'] = InputField;