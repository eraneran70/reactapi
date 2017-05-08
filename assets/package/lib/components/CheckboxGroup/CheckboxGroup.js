'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./CheckboxGroup.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Checkbox class.
 * @class Checkbox
 * @augments React.Component
 */
var CheckboxGroup = _react2['default'].createClass( /** @lends Checkbox.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'CheckboxGroup',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        className: _react2['default'].PropTypes.string,
        isDisabled: _react2['default'].PropTypes.bool,
        label: _react2['default'].PropTypes.string.isRequired,
        name: _react2['default'].PropTypes.string.isRequired,
        onChange: _react2['default'].PropTypes.func,
        options: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
            className: _react2['default'].PropTypes.string,
            isDisabled: _react2['default'].PropTypes.bool,
            label: _react2['default'].PropTypes.string.isRequired,
            value: _react2['default'].PropTypes.string.isRequired
        }).isRequired).isRequired,
        type: _react2['default'].PropTypes.oneOf(['inline', 'stacked']),
        value: _react2['default'].PropTypes.array
    },

    mixins: [_formsyReact2['default'].Mixin],

    getDefaultProps: function getDefaultProps() {
        return {
            type: 'stacked',
            value: []
        };
    },
    getCheckboxesClassSet: function getCheckboxesClassSet() {
        var _cx;

        return (0, _classnames2['default'])((_cx = {}, (0, _defineProperty3['default'])(_cx, 'checkbox-group checkbox-group--' + this.props.type, true), (0, _defineProperty3['default'])(_cx, 'checkbox-group--with-error', this.isFieldInvalid()), (0, _defineProperty3['default'])(_cx, 'checkbox-group--disabled', this.isFieldDisabled()), _cx), this.props.className);
    },
    isFieldDisabled: function isFieldDisabled() {
        return this.isFormDisabled() || this.props.isDisabled;
    },
    isFieldInvalid: function isFieldInvalid() {
        return !this.isValid() && !this.isPristine();
    },
    maybeRenderLegend: function maybeRenderLegend() {
        if (this.props.label === '') {
            return null;
        }

        return _react2['default'].createElement(
            'legend',
            { className: 'checkbox-group__label' },
            this.props.label
        );
    },
    maybeRenderErrorMessage: function maybeRenderErrorMessage() {
        var errorMessage = void 0;

        if (!this.isPristine()) {
            errorMessage = this.getErrorMessage();
        }

        if (!errorMessage) return null;

        return _react2['default'].createElement(
            'span',
            { className: 'checkbox-group__error-message', ref: 'errorMessage' },
            errorMessage
        );
    },
    handleValueChange: function handleValueChange(event) {
        var _this = this;

        var value = [];

        this.props.options.forEach(function (option, key) {
            if (_this.refs[key].checked) {
                value.push(option.value);
            }
        });

        this.setValue(value);

        if (this.props.onChange) {
            this.props.onChange(event);
        }
    },
    renderCheckboxElements: function renderCheckboxElements() {
        var _this2 = this;

        return (0, _map3['default'])(this.props.options, function (checkbox, key) {
            var isChecked = _this2.getValue().indexOf(checkbox.value) !== -1;
            var isDisabled = _this2.isFieldDisabled() || checkbox.isDisabled;
            var className = (0, _classnames2['default'])({
                'checkbox-group__checkbox': true,
                'checkbox-group__checkbox--disabled': isDisabled
            }, checkbox.className);

            return _react2['default'].createElement(
                'label',
                { className: className, key: key },
                _react2['default'].createElement('input', {
                    'aria-label': true,
                    ref: key,
                    type: 'checkbox',
                    className: 'checkbox-group__checkbox-input',
                    name: _this2.props.name,
                    checked: isChecked,
                    value: checkbox.value,
                    onChange: _this2.handleValueChange,
                    disabled: isDisabled }),
                _react2['default'].createElement(
                    'span',
                    { className: 'checkbox-group__checkbox-label' },
                    checkbox.label
                )
            );
        });
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
            { className: this.getCheckboxesClassSet() },
            _react2['default'].createElement(
                'fieldset',
                { className: 'checkbox-group__fieldset' },
                this.maybeRenderLegend(),
                this.renderCheckboxElements(),
                this.maybeRenderErrorMessage()
            )
        );
    }
});

exports['default'] = CheckboxGroup;