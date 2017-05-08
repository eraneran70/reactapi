import React from 'react';
import { isEmpty } from 'lodash';
import cx from 'classnames';

import './InputField.scss';

/**
 * An {@link InputField} provides a component that is used to edit and display
 * a single line of plain text.
 * @class InputField
 * @extends ReactComponent
 */
const InputField = React.createClass(/** @lends InputField.prototype */{

    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'InputField',

    /**
     * @property {Object} propTypes - An object used to validate props being
     * passed into the components
     */
    propTypes: {
        className: React.PropTypes.string,
        defaultValue: React.PropTypes.string,
        errorMessage: React.PropTypes.string,
        hideLabel: React.PropTypes.bool,
        id: React.PropTypes.string,
        isDisabled: React.PropTypes.bool,
        label: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        onBlur: React.PropTypes.func,
        onChange: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        type: React.PropTypes.string
    },

    getDefaultProps() {
        return { type: 'text', hideLabel: false };
    },

    getInitialState() {
        const { defaultValue } = this.props;

        return {
            value: defaultValue,
            showPlaceholderAsHeader: !isEmpty(defaultValue)
        };
    },

    getInputFieldClassSet() {
        return cx({
            'input-field': true,
            'input-field--with-error': this.hasErrorMessage()
        }, this.props.className);
    },

    hasErrorMessage() {
        return !isEmpty(this.props.errorMessage);
    },

    handleValueChange(event) {
        const { value } = event.target;

        this.setState({ value });

        if (this.props.onChange) {
            this.props.onChange(event, value);
        }
    },

    handleOnFocus() {
        if (!this.props.hideLabel) {
            this.setState({ showPlaceholderAsHeader: true });
        }
    },

    handleOnBlur(event) {
        const { value } = this.state;

        this.setState({ showPlaceholderAsHeader: !isEmpty(value) });

        if (this.props.onBlur) {
            this.props.onBlur(event, value);
        }
    },

    renderInputElement() {
        const disabled = this.props.isDisabled ? 'disabled' : false;
        const placeholderClassNames = cx({
            'input-field__placeholder': true,
            'input-field__placeholder--as-header': this.state.showPlaceholderAsHeader,
            'input-field__placeholder--as-adalabel': this.props.hideLabel
        });

        return (
            <label className="input-field__label" htmlFor={this.props.id} ref="placeholder" >
                <input ref="input"
                    className="input-field__input-element"
                    id={this.props.id}
                    name={this.props.name}
                    type={this.props.type} disabled={disabled}
                    value={this.state.value}
                    onChange={this.handleValueChange}
                    onFocus={this.handleOnFocus}
                    onBlur={this.handleOnBlur} />
                <span className={placeholderClassNames}>{this.props.label}</span>
            </label>
        );
    },

    renderErrorMessageIfPresent() {
        if (!this.hasErrorMessage()) {
            return null;
        }
        return (
            <span className="input-field__error-message" ref="errorMessage">
                {this.props.errorMessage}
            </span>
        );
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div className={this.getInputFieldClassSet()}>
                {this.renderInputElement()}
                {this.renderErrorMessageIfPresent()}
            </div>
        );
    }
});

export default InputField;
