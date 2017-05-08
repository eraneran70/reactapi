import React from 'react';
import Formsy from 'formsy-react';
import { map } from 'lodash';
import cx from 'classnames';

import './CheckboxGroup.scss';

/**
 * Checkbox class.
 * @class Checkbox
 * @augments React.Component
 */
const CheckboxGroup = React.createClass(/** @lends Checkbox.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'CheckboxGroup',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        className: React.PropTypes.string,
        isDisabled: React.PropTypes.bool,
        label: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func,
        options: React.PropTypes.arrayOf(React.PropTypes.shape({
            className: React.PropTypes.string,
            isDisabled: React.PropTypes.bool,
            label: React.PropTypes.string.isRequired,
            value: React.PropTypes.string.isRequired
        }).isRequired).isRequired,
        type: React.PropTypes.oneOf(['inline', 'stacked']),
        value: React.PropTypes.array
    },

    mixins: [Formsy.Mixin],

    getDefaultProps() {
        return {
            type: 'stacked',
            value: []
        };
    },

    getCheckboxesClassSet() {
        return cx({
            [`checkbox-group checkbox-group--${this.props.type}`]: true,
            'checkbox-group--with-error': this.isFieldInvalid(),
            'checkbox-group--disabled': this.isFieldDisabled()
        }, this.props.className);
    },

    isFieldDisabled() {
        return this.isFormDisabled() || this.props.isDisabled;
    },

    isFieldInvalid() {
        return !this.isValid() && !this.isPristine();
    },

    maybeRenderLegend() {
        if (this.props.label === '') {
            return null;
        }

        return (
            <legend className="checkbox-group__label">{this.props.label}</legend>
        );
    },

    maybeRenderErrorMessage() {
        let errorMessage;

        if (!this.isPristine()) {
            errorMessage = this.getErrorMessage();
        }

        if (!errorMessage) return null;

        return (
            <span className="checkbox-group__error-message" ref="errorMessage">
                {errorMessage}
            </span>
        );
    },

    handleValueChange(event) {
        const value = [];

        this.props.options.forEach((option, key) => {
            if (this.refs[key].checked) {
                value.push(option.value);
            }
        });

        this.setValue(value);

        if (this.props.onChange) {
            this.props.onChange(event);
        }
    },

    renderCheckboxElements() {
        return map(this.props.options, (checkbox, key) => {
            const isChecked = this.getValue().indexOf(checkbox.value) !== -1;
            const isDisabled = this.isFieldDisabled() || checkbox.isDisabled;
            const className = cx({
                'checkbox-group__checkbox': true,
                'checkbox-group__checkbox--disabled': isDisabled
            }, checkbox.className);

            return (
                <label className={className} key={key}>
                    <input
                        aria-label
                        ref={key}
                        type="checkbox"
                        className="checkbox-group__checkbox-input"
                        name={this.props.name}
                        checked={isChecked}
                        value={checkbox.value}
                        onChange={this.handleValueChange}
                        disabled={isDisabled} />
                    <span className="checkbox-group__checkbox-label">
                        {checkbox.label}
                    </span>
                </label>
            );
        });
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div className={this.getCheckboxesClassSet()} >
                <fieldset className="checkbox-group__fieldset">
                    {this.maybeRenderLegend()}
                    {this.renderCheckboxElements()}
                    {this.maybeRenderErrorMessage()}
                </fieldset>
            </div>
        );
    }
});

export default CheckboxGroup;
