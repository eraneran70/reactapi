'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _trim2 = require('lodash/trim');

var _trim3 = _interopRequireDefault(_trim2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

require('./SpinBox.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hbcBrowserConstants = require('hbc-browser-constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var numericRegex = /^[-+]?[0-9]+$/;
/**
 * The {@link SpinBox} component provides a spin box widget.
 *
 * SpinBox is designed to handle integer values.
 *
 * SpinBox allows the user to choose a value by clicking the up/down buttons or
 * pressing up/down on the keyboard to increase/decrease the value currently
 * displayed. The user can also type the value in manually. The spin box
 * supports only integer values, therefore it will disallow non-numeric values
 * from being entered.
 *
 * Every time the value changes SpinBox calls the onValueChanged() event
 * handler passed as a prop from its parent component. The current value will be
 * passed as a parameter to the event handler.
 *
 * Clicking the up/down buttons or using the keyboard accelerator's up and down
 * arrows will increase or decrease the current value in steps of size
 * `singleStep`. The minimum and maximum value and the step size can be set
 * using the `minValue`, `maxValue` and `singleStep` props.
 *
 * Most spin boxes are directional, but SpinBox can also operate as a circular
 * spin box, i.e. if the range is 0-99 and the current value is 99, clicking
 * "up" will give 0 if `wrapping` is set to true. Set the `wrapping` prop type
 * to true if you want circular behavior.
 *
 * The displayed value can be prepended and appended with arbitrary strings
 * indicating, for example, currency or the unit of measurement. Use the
 * `prefix` and `suffix` properties to prepend or append a string to the spin
 * box value, respectively. The text in the spin box is retrieved with getText()
 * (which includes any prefix and suffix), or with cleanText() (which has no
 * prefix, no suffix and no leading or trailing whitespace).
 *
 * @class SpinBox
 * @augments React.Component
 */
/* eslint-disable no-param-reassign */

var SpinBox = (0, _react.createClass)( /** @lends SpinBox.prototype */{

    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'SpinBox',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     * @property {Number} [propTypes.singleStep] - This property holds the step value.
     */
    propTypes: {
        label: _react.PropTypes.string,
        maxValue: _react.PropTypes.number,
        minValue: _react.PropTypes.number,
        onRangeOverflow: _react.PropTypes.func,
        onRangeUnderflow: _react.PropTypes.func,
        onValueChanged: _react.PropTypes.func,
        prefix: _react.PropTypes.string,
        singleStep: _react.PropTypes.number,
        suffix: _react.PropTypes.string,
        value: _react.PropTypes.number,
        // TODO: Circular behavior is not implemented yet.
        wrapping: _react.PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
        return {
            value: 1,
            maxValue: 99,
            minValue: 1,
            singleStep: 1,
            wrapping: false
        };
    },
    getInitialState: function getInitialState() {
        return this.getStateFromValue(this.props.value);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.value !== null) {
            this.setValue(nextProps.value);
        }
    },
    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
        var _state = this.state,
            isRangeUnderflow = _state.isRangeUnderflow,
            isRangeOverflow = _state.isRangeOverflow,
            value = _state.value;
        var _props = this.props,
            onRangeOverflow = _props.onRangeOverflow,
            onRangeUnderflow = _props.onRangeUnderflow,
            onValueChanged = _props.onValueChanged;


        if (isRangeOverflow && (0, _isFunction3['default'])(onRangeOverflow)) {
            onRangeOverflow();
        }

        if (isRangeUnderflow && (0, _isFunction3['default'])(onRangeUnderflow)) {
            onRangeUnderflow();
        }

        if (prevState.value !== value && (0, _isFunction3['default'])(onValueChanged)) {
            onValueChanged(value);
        }
    },
    getStateFromValue: function getStateFromValue(value) {
        var isRangeUnderflow = false;
        var isRangeOverflow = false;

        // An input's value is set to an empty string when the input is cleared
        // using backspace, in that case we return control to the user.
        // Otherwise, the value of the input field is not cleared.
        // https://facebook.github.io/react/tips/controlled-input-null-value.html
        if (value === '') {
            value = null;
            // If the value contains any non-numeric characters then remove them.
            // In which case the value is the same as the previous value and we
            // don't need to check boundaries. It's important to avoid resetting
            // the value due to coercion in operations.
        } else if (!this.validate(value)) {
            value = String(value).replace(/\D*/g, '');
            // Check lower and higher boundaries.
        } else {
            // Coerce valus to number to deal with inconsistencies when values
            // are passed as strings when user types value into text box.
            value = Number(value);
            if (value > this.props.maxValue) {
                value = this.props.maxValue;
                isRangeOverflow = true;
            }
            if (value < this.props.minValue) {
                value = this.props.minValue;
                isRangeUnderflow = true;
            }
        }
        return { isRangeUnderflow: isRangeUnderflow, isRangeOverflow: isRangeOverflow, value: value };
    },


    /**
     * Returns the text for the spin box excluding any prefix, suffix, or
     * leading or trailing whitespace.
     * @return {String}
     */
    getCleanText: function getCleanText() {
        return (0, _trim3['default'])(this.state.value);
    },


    /**
     * Returns the text to be displayed in the spin box, including any prefix
     * and suffix.
     * @return {String}
     */
    getText: function getText() {
        var value = this.getCleanText();
        if (this.props.prefix) {
            value = this.props.prefix + value;
        }
        if (this.props.suffix) {
            value = value + this.props.suffix;
        }
        return value;
    },


    /**
     * Sets the value for the spin box.
     * @param {Number} value
     */
    setValue: function setValue(value) {
        this.setState(this.getStateFromValue(value));
    },


    /**
     * Steps up by one linestep.
     */
    handleStepUp: function handleStepUp() {
        this.setValue(this.state.value + this.props.singleStep);
    },


    /**
     * Steps down by one linestep.
     */
    handleStepDown: function handleStepDown() {
        this.setValue(this.state.value - this.props.singleStep);
    },


    /**
     * Determines whether the step down arrow will be painted as enabled.
     * @return {Boolean}
     */
    isStepDownEnabled: function isStepDownEnabled() {
        return this.state.value > this.props.minValue;
    },


    /**
     * Determines whether the step up arrow will be painted as enabled.
     * @return {Boolean}
     */
    isStepUpEnabled: function isStepUpEnabled() {
        return this.state.value < this.props.maxValue;
    },
    validate: function validate(value) {
        return numericRegex.test(value);
    },
    handleInputBlur: function handleInputBlur() {
        if (!this.state.value) {
            this.setValue(this.props.minValue);
        }
    },
    handleInputKeyUp: function handleInputKeyUp(event) {
        var keyCode = event.keyCode;

        if (keyCode === _hbcBrowserConstants.KeyCodes.UP) {
            this.handleStepUp();
        } else if (keyCode === _hbcBrowserConstants.KeyCodes.DOWN) {
            this.handleStepDown();
        }
    },
    handleInputChange: function handleInputChange(event) {
        this.setValue(event.target.value);
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
            { className: 'spinbox' },
            _react2['default'].createElement(
                'button',
                { className: 'spinbox__decrement',
                    onClick: this.handleStepDown,
                    disabled: !this.isStepDownEnabled() },
                '-'
            ),
            _react2['default'].createElement(
                'label',
                { htmlFor: 'numberInput', className: 'is-visually-hidden' },
                this.props.label
            ),
            _react2['default'].createElement('input', { type: 'text',
                id: 'numberInput',
                name: 'spinbox__numerical',
                value: this.getText(),
                className: 'spinbox__numerical',
                onChange: this.handleInputChange,
                onBlur: this.handleInputBlur,
                onKeyUp: this.handleInputKeyUp }),
            _react2['default'].createElement(
                'button',
                { className: 'spinbox__increment',
                    onClick: this.handleStepUp,
                    disabled: !this.isStepUpEnabled() },
                '+'
            )
        );
    }
});

exports['default'] = SpinBox;