/* eslint-disable no-param-reassign */

import './SpinBox.scss';

import React, { createClass, PropTypes } from 'react';
import { isFunction, trim } from 'lodash';
import { KeyCodes } from 'hbc-browser-constants';

const numericRegex = /^[-+]?[0-9]+$/;
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
const SpinBox = createClass(/** @lends SpinBox.prototype */{

    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'SpinBox',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     * @property {Number} [propTypes.singleStep] - This property holds the step value.
     */
    propTypes: {
        label: PropTypes.string,
        maxValue: PropTypes.number,
        minValue: PropTypes.number,
        onRangeOverflow: PropTypes.func,
        onRangeUnderflow: PropTypes.func,
        onValueChanged: PropTypes.func,
        prefix: PropTypes.string,
        singleStep: PropTypes.number,
        suffix: PropTypes.string,
        value: PropTypes.number,
        // TODO: Circular behavior is not implemented yet.
        wrapping: PropTypes.bool
    },

    getDefaultProps() {
        return {
            value: 1,
            maxValue: 99,
            minValue: 1,
            singleStep: 1,
            wrapping: false
        };
    },

    getInitialState() {
        return this.getStateFromValue(this.props.value);
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== null) {
            this.setValue(nextProps.value);
        }
    },

    componentDidUpdate(prevProps, prevState) {
        const { isRangeUnderflow, isRangeOverflow, value } = this.state;
        const { onRangeOverflow, onRangeUnderflow, onValueChanged } = this.props;

        if (isRangeOverflow && isFunction(onRangeOverflow)) {
            onRangeOverflow();
        }

        if (isRangeUnderflow && isFunction(onRangeUnderflow)) {
            onRangeUnderflow();
        }

        if (prevState.value !== value && isFunction(onValueChanged)) {
            onValueChanged(value);
        }
    },

    getStateFromValue(value) {
        let isRangeUnderflow = false;
        let isRangeOverflow = false;

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
        return { isRangeUnderflow, isRangeOverflow, value };
    },

    /**
     * Returns the text for the spin box excluding any prefix, suffix, or
     * leading or trailing whitespace.
     * @return {String}
     */
    getCleanText() {
        return trim(this.state.value);
    },

    /**
     * Returns the text to be displayed in the spin box, including any prefix
     * and suffix.
     * @return {String}
     */
    getText() {
        let value = this.getCleanText();
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
    setValue(value) {
        this.setState(this.getStateFromValue(value));
    },

    /**
     * Steps up by one linestep.
     */
    handleStepUp() {
        this.setValue(this.state.value + this.props.singleStep);
    },

    /**
     * Steps down by one linestep.
     */
    handleStepDown() {
        this.setValue(this.state.value - this.props.singleStep);
    },

    /**
     * Determines whether the step down arrow will be painted as enabled.
     * @return {Boolean}
     */
    isStepDownEnabled() {
        return this.state.value > this.props.minValue;
    },

    /**
     * Determines whether the step up arrow will be painted as enabled.
     * @return {Boolean}
     */
    isStepUpEnabled() {
        return this.state.value < this.props.maxValue;
    },

    validate(value) {
        return numericRegex.test(value);
    },

    handleInputBlur() {
        if (!this.state.value) {
            this.setValue(this.props.minValue);
        }
    },

    handleInputKeyUp(event) {
        const { keyCode } = event;
        if (keyCode === KeyCodes.UP) {
            this.handleStepUp();
        } else if (keyCode === KeyCodes.DOWN) {
            this.handleStepDown();
        }
    },

    handleInputChange(event) {
        this.setValue(event.target.value);
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div className="spinbox">
                <button className="spinbox__decrement"
                    onClick={this.handleStepDown}
                    disabled={!this.isStepDownEnabled()}>-</button>
                <label htmlFor="numberInput" className="is-visually-hidden">{this.props.label}</label>
                <input type="text"
                    id="numberInput"
                    name="spinbox__numerical"
                    value={this.getText()}
                    className="spinbox__numerical"
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    onKeyUp={this.handleInputKeyUp} />
                <button className="spinbox__increment"
                    onClick={this.handleStepUp}
                    disabled={!this.isStepUpEnabled()}>+</button>
            </div>
        );
    }
});

export default SpinBox;
