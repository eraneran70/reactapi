import React from 'react';
import Formsy from 'formsy-react';
import cx from 'classnames';

import './Checkbox.scss';

/**
 * Checkbox class.
 * @class Checkbox
 * @augments React.Component
 */
const Checkbox = React.createClass(/** @lends Checkbox.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'Checkbox',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        className: React.PropTypes.string,
        isDisabled: React.PropTypes.bool,
        label: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func,
        value: React.PropTypes.bool
    },

    mixins: [Formsy.Mixin],

    getCheckboxClassSet() {
        return cx({
            'checkbox': true,
            'checkbox--with-error': this.isFieldInvalid(),
            'checkbox--disabled': this.isFieldDisabled()
        }, this.props.className);
    },

    isFieldDisabled() {
        return this.isFormDisabled() || this.props.isDisabled;
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
                <span className="checkbox__error-message" ref="errorMessage">
                    {errorMessage}
                </span>
            );
        }

        return null;
    },

    handleValueChange(event) {
        const value = event.currentTarget.checked;

        this.setValue(value);

        if (this.props.onChange) {
            this.props.onChange(event);
        }
    },

    renderCheckboxElement() {
        return (
            <label className="checkbox__label">
                <input
                    className="checkbox__checkbox-input"
                    ref="checkbox"
                    type="checkbox"
                    disabled={this.isFieldDisabled()}
                    name={this.props.name}
                    checked={this.getValue() === true}
                    onChange={this.handleValueChange} />
                <span className="checkbox__checkbox-label">
                    {this.props.label}
                </span>
            </label>
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
            <div className={this.getCheckboxClassSet()} >
                {this.renderCheckboxElement()}
                {this.maybeRenderErrorMessage()}
            </div>
        );
    }
});

export default Checkbox;
