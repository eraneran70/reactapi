'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _first2 = require('lodash/first');

var _first3 = _interopRequireDefault(_first2);

var _filter2 = require('lodash/filter');

var _filter3 = _interopRequireDefault(_filter2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./DropDownList.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DEFAULT_VALUE = '';
var OPTION_PREFIX = 'dropdownlist_';

/**
 * A {@link DropDownList} provides a means of presenting a list of options to
 * the user in a way that takes up the minimum amount of screen space.
 *
 * A `DropDownList` is a selection component that displays the current item, and
 * can pop up a list of selectable items.
 *
 * @class DropDownList
 * @augments Component
 */
var DropDownList = (0, _react.createClass)( /** @lends DropDownList.prototype */{

    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'DropDownList',

    /**
     * @property {Object} propTypes - An object used to validate props being
     * passed into the components
     * @property {String} [propTypes.className] - One or more space-separated
     * classes to be added to the class attribute of the component node.
     * @property {String} [propTypes.errorMessage] - Specifies a message that
     * describes the condition that caused an error, typically after processing
     * the selected value.
     * @property {String} [propTypes.initialValue]
     * @property {Boolean} [propTypes.isDisabled] - Whether the component should
     * be disabled. By default, this property is false.
     * @property {String} [propTypes.name] - Specifies the name of the DOM element
     * @property {Function} [propTypes.onChange] - Event handler emitted when the
     * value of the component is changed.
     * @property {Array<Object>} propTypes.options - Selectable options to be
     * displayed in the dropdown menu.
     * @property {String} [propTypes.placeholder] - Specifies a short hint that
     * describes the expected value of the select field.
     */
    propTypes: {
        className: _react.PropTypes.string,
        errorMessage: _react.PropTypes.string,
        initialValue: _react.PropTypes.string,
        isDisabled: _react.PropTypes.bool,
        name: _react.PropTypes.string,
        onChange: _react.PropTypes.func,
        options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
            label: _react.PropTypes.string.isRequired,
            disabled: _react.PropTypes.bool
        }).isRequired).isRequired,
        placeholder: _react.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            initialValue: DEFAULT_VALUE,
            isDisabled: false
        };
    },
    getInitialState: function getInitialState() {
        var _props = this.props,
            options = _props.options,
            placeholder = _props.placeholder,
            initialValue = _props.initialValue;

        var value = void 0;

        if (initialValue && (0, _isEmpty3['default'])(placeholder)) {
            value = initialValue;
        } else {
            value = placeholder ? initialValue : (0, _first3['default'])(options).value;
        }

        return { value: value };
    },
    getComponentClassSet: function getComponentClassSet() {
        return (0, _classnames2['default'])({
            'drop-down-list': true,
            'drop-down-list--disabled': this.props.isDisabled,
            'drop-down-list--error': this.hasErrorMessage()
        }, this.props.className);
    },
    getSelectElementClassSet: function getSelectElementClassSet() {
        return (0, _classnames2['default'])({
            'drop-down-list__select': true,
            'drop-down-list__select--default': this.isDefaultValueSelected()
        });
    },
    isDefaultValueSelected: function isDefaultValueSelected() {
        return this.state.value === DEFAULT_VALUE;
    },
    emitEvent: function emitEvent(eventName) {
        if (this.props[eventName]) {
            for (var _len = arguments.length, eventArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                eventArgs[_key - 1] = arguments[_key];
            }

            this.props[eventName].apply(null, eventArgs);
        }
    },
    hasErrorMessage: function hasErrorMessage() {
        return !(0, _isEmpty3['default'])(this.props.errorMessage);
    },
    handleChange: function handleChange(event) {
        var _this = this;

        var value = event.target.value;

        this.setState({ value: value }, function () {
            return _this.emitEvent('onChange', value);
        });
    },
    renderOptions: function renderOptions() {
        return (0, _map3['default'])((0, _filter3['default'])(this.props.options, undefined), function (option, index) {
            var value = option.value,
                label = option.label,
                disabled = option.disabled;


            return _react2['default'].createElement('option', { ref: '' + OPTION_PREFIX + index, key: index, value: value, disabled: disabled,
                dangerouslySetInnerHTML: { __html: label } });
        });
    },
    renderDefaultOption: function renderDefaultOption() {
        if (this.props.placeholder) {
            return _react2['default'].createElement(
                'option',
                { ref: 'defaultLabel', value: DEFAULT_VALUE, disabled: true },
                this.props.placeholder
            );
        }
        return null;
    },
    renderErrorMessage: function renderErrorMessage() {
        var errorMessage = this.props.errorMessage;


        if (this.hasErrorMessage()) {
            return _react2['default'].createElement(
                'span',
                { className: 'drop-down-list__error-message' },
                errorMessage
            );
        }
        return null;
    },
    renderDropDownElement: function renderDropDownElement() {
        return _react2['default'].createElement(
            'select',
            { ref: 'selectElement',
                name: this.props.name,
                disabled: this.props.isDisabled,
                className: this.getSelectElementClassSet(),
                value: this.state.value,
                onChange: this.handleChange },
            this.renderDefaultOption(),
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
            this.renderDropDownElement(),
            _react2['default'].createElement(_Icon2['default'], { name: 'caret-down' }),
            this.renderErrorMessage()
        );
    }
});

exports['default'] = DropDownList;