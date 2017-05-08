import React, { createClass, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import cx from 'classnames';
import Formsy from 'formsy-react';
import { KeyCodes } from 'hbc-browser-constants';

import './TextField.scss';

/**
 * TextField class.
 * @class TextField
 * @augments React.Component
 */
const TextField = createClass(/** @lends TextField.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'TextField',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        autoComplete: PropTypes.string,
        autoFocus: PropTypes.bool,
        className: PropTypes.string,
        evaluateOnBlur: PropTypes.bool,
        evaluateOnChange: PropTypes.bool,
        headingLabel: PropTypes.string,
        id: PropTypes.string.isRequired,
        isDisabled: PropTypes.bool,
        label: PropTypes.string.isRequired,
        maxLength: PropTypes.number,
        name: PropTypes.string.isRequired,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        type: PropTypes.string,
        validationError: PropTypes.string,
        validationErrors: PropTypes.object,
        value: PropTypes.string
    },

    mixins: [Formsy.Mixin],

    getDefaultProps() {
        return {
            type: 'text',
            evaluateOnChange: false,
            evaluateOnBlur: true,
            autoComplete: 'on'
        };
    },

    getInitialState() {
        const defaultValue = this.props.value;

        return {
            value: defaultValue,
            isEmpty: isEmpty(defaultValue),
            isFocused: this.props.autoFocus || false
        };
    },

    isFieldInvalid() {
        return !this.isValid() && !this.isPristine();
    },

    maybeRenderErrorMessage() {
        let errorMessage;

        if (!this.isPristine()) {
            errorMessage = this.getErrorMessage();
        }

        if (errorMessage) {
            return (
                <span ref="errorMessage"
                    className="text-field__error-message"
                    dangerouslySetInnerHTML={{ __html: errorMessage }} />
            );
        }
        return null;
    },

    handleOnFocus() {
        this.setState({ isFocused: true });
    },

    handleChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event);
        }

        const value = event.currentTarget.value;

        // Added to handle browser auto-fill feature
        this.setState({ isEmpty: isEmpty(value) });

        if (this.props.evaluateOnChange) {
            this.setValue(value);
        } else {
            this.setState({ _value: value });
        }
    },

    handleBlur(event) {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }

        const value = event.currentTarget.value;

        this.setState({ isEmpty: isEmpty(value), isFocused: false });

        if (this.props.evaluateOnBlur) {
            this.setValue(value);
        } else {
            this.setState({ _value: value });
        }
    },

    /**
     * Event handler for when the enter key is pressed.
     * @param {Event} event DOM
     * @private
     */
    handleKeyDown(event) {
        const value = event.currentTarget.value;

        if (event.keyCode === KeyCodes.ENTER) {
            this.setState({ isEmpty: isEmpty(value) });

            this.setValue(value);
        }
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        const classNames = cx({
            'text-field': true,
            'text-field--invalid': this.isFieldInvalid(),
            'text-field--focused': this.state.isFocused,
            'text-field--empty': this.state.isEmpty
        }, this.props.className);

        const headingLabelClassNames = cx({
            'text-field__heading-label': true,
            'text-field__heading-label--hide': this.state.isFocused || !this.state.isEmpty,
            'text-field__heading-label--invalid': this.isFieldInvalid()
        });

        return (
            <div className={classNames}>
                <div className="text-field__wrapper">
                    <label ref="label" htmlFor={this.props.id} >
                        <span className="text-field__label">
                            {this.props.label}
                        </span>
                        <span ref="headingLabel" className={headingLabelClassNames}>
                            {this.props.headingLabel}
                        </span>
                    </label>
                    <input
                        ref="input"
                        type={this.props.type}
                        name={this.props.name}
                        id={this.props.id}
                        className="text-field__control"
                        placeholder={this.props.placeholder}
                        disabled={this.props.isDisabled}
                        autoComplete={this.props.autoComplete}
                        autoFocus={this.props.autoFocus}
                        maxLength={this.props.maxLength}
                        value={this.getValue() || ''}
                        onChange={this.handleChange}
                        onFocus={this.handleOnFocus}
                        onBlur={this.handleBlur}
                        onKeyDown={this.handleKeyDown} />
                </div>
                {this.maybeRenderErrorMessage()}
            </div>
        );
    }
});

export default TextField;
