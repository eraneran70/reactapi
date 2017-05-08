'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./Checkbox.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Checkbox class.
 * @class Checkbox
 * @augments React.Component
 */
var Checkbox = _react2['default'].createClass( /** @lends Checkbox.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'Checkbox',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        className: _react2['default'].PropTypes.string,
        isDisabled: _react2['default'].PropTypes.bool,
        label: _react2['default'].PropTypes.string.isRequired,
        name: _react2['default'].PropTypes.string.isRequired,
        onChange: _react2['default'].PropTypes.func,
        value: _react2['default'].PropTypes.bool
    },

    mixins: [_formsyReact2['default'].Mixin],

    getCheckboxClassSet: function getCheckboxClassSet() {
        return (0, _classnames2['default'])({
            'checkbox': true,
            'checkbox--with-error': this.isFieldInvalid(),
            'checkbox--disabled': this.isFieldDisabled()
        }, this.props.className);
    },
    isFieldDisabled: function isFieldDisabled() {
        return this.isFormDisabled() || this.props.isDisabled;
    },
    isFieldInvalid: function isFieldInvalid() {
        return !this.isValid() && !this.isPristine();
    },
    maybeRenderErrorMessage: function maybeRenderErrorMessage() {
        var errorMessage = void 0;

        if (!this.isPristine()) {
            errorMessage = this.getErrorMessage();
        }

        if (errorMessage) {
            return _react2['default'].createElement(
                'span',
                { className: 'checkbox__error-message', ref: 'errorMessage' },
                errorMessage
            );
        }

        return null;
    },
    handleValueChange: function handleValueChange(event) {
        var value = event.currentTarget.checked;

        this.setValue(value);

        if (this.props.onChange) {
            this.props.onChange(event);
        }
    },
    renderCheckboxElement: function renderCheckboxElement() {
        return _react2['default'].createElement(
            'label',
            { className: 'checkbox__label' },
            _react2['default'].createElement('input', {
                className: 'checkbox__checkbox-input',
                ref: 'checkbox',
                type: 'checkbox',
                disabled: this.isFieldDisabled(),
                name: this.props.name,
                checked: this.getValue() === true,
                onChange: this.handleValueChange }),
            _react2['default'].createElement(
                'span',
                { className: 'checkbox__checkbox-label' },
                this.props.label
            )
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
            { className: this.getCheckboxClassSet() },
            this.renderCheckboxElement(),
            this.maybeRenderErrorMessage()
        );
    }
});

exports['default'] = Checkbox;