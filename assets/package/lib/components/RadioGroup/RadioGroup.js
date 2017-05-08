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

require('./RadioGroup.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * RadioGroup class.
 * @class RadioGroup
 * @augments React.Component
 */
/* eslint-disable react/jsx-no-bind */

var RadioGroup = _react2['default'].createClass( /** @lends RadioGroup.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'RadioGroup',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        className: _react.PropTypes.string,
        isDisabled: _react.PropTypes.bool,
        label: _react.PropTypes.string.isRequired,
        name: _react.PropTypes.string.isRequired,
        onChange: _react.PropTypes.func,
        options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            label: _react.PropTypes.node.isRequired,
            value: _react.PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number, _react2['default'].PropTypes.bool]).isRequired,
            isDisabled: _react.PropTypes.bool,
            className: _react.PropTypes.string
        }).isRequired).isRequired,
        type: _react.PropTypes.oneOf(['inline', 'stacked']),
        value: _react.PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number, _react2['default'].PropTypes.bool])
    },

    mixins: [_formsyReact2['default'].Mixin],

    getDefaultProps: function getDefaultProps() {
        return { type: 'stacked' };
    },
    getRadioGroupClassSet: function getRadioGroupClassSet() {
        var _cx;

        return (0, _classnames2['default'])((_cx = {}, (0, _defineProperty3['default'])(_cx, 'radiogroup radiogroup--' + this.props.type, true), (0, _defineProperty3['default'])(_cx, 'radiogroup--with-error', this.isFieldInvalid()), (0, _defineProperty3['default'])(_cx, 'radiogroup--disabled', this.isFieldDisabled()), _cx), this.props.className);
    },
    isFieldDisabled: function isFieldDisabled() {
        return this.isFormDisabled() || this.props.isDisabled;
    },
    isFieldInvalid: function isFieldInvalid() {
        return !this.isValid() && !this.isPristine();
    },
    handleRadioChange: function handleRadioChange(event, value) {
        this.setValue(value);

        if (this.props.onChange) {
            this.props.onChange(event);
        }
    },
    maybeRenderErrorMessage: function maybeRenderErrorMessage() {
        var errorMessage = void 0;

        if (!this.isPristine()) {
            errorMessage = this.getErrorMessage();
        }

        if (!errorMessage) return null;

        return _react2['default'].createElement(
            'span',
            { className: 'radiogroup__error-message', ref: 'errorMessage' },
            errorMessage
        );
    },
    renderRadioGroup: function renderRadioGroup() {
        var _this = this;

        return (0, _map3['default'])(this.props.options, function (radio, i) {
            var isChecked = _this.getValue() === radio.value;
            var isDisabled = _this.isFieldDisabled() || radio.isDisabled;
            var className = (0, _classnames2['default'])({
                'radiogroup__radio': true,
                'radiogroup__radio--disabled': isDisabled
            }, radio.className);

            return _react2['default'].createElement(
                'label',
                { className: className, key: i },
                _react2['default'].createElement('input', {
                    type: 'radio',
                    className: 'radiogroup__radio-input',
                    name: _this.props.name,
                    checked: isChecked,
                    value: radio.value,
                    onChange: function onChange(e) {
                        return _this.handleRadioChange(e, radio.value);
                    },
                    disabled: isDisabled }),
                _react2['default'].createElement('span', { className: 'radiogroup__radio-button' }),
                _react2['default'].createElement(
                    'span',
                    { className: 'radiogroup__radio-label' },
                    radio.label
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
            { className: this.getRadioGroupClassSet() },
            _react2['default'].createElement(
                'fieldset',
                { className: 'radiogroup__fieldset' },
                _react2['default'].createElement(
                    'legend',
                    { className: 'radiogroup__label' },
                    this.props.label
                ),
                this.renderRadioGroup(),
                this.maybeRenderErrorMessage()
            )
        );
    }
});

exports['default'] = RadioGroup;