/* eslint-disable react/jsx-no-bind */

import React, { PropTypes } from 'react';
import { map } from 'lodash';
import Formsy from 'formsy-react';
import cx from 'classnames';

import './RadioGroup.scss';

/**
 * RadioGroup class.
 * @class RadioGroup
 * @augments React.Component
 */
const RadioGroup = React.createClass(/** @lends RadioGroup.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'RadioGroup',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        className: PropTypes.string,
        isDisabled: PropTypes.bool,
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        options: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.node.isRequired,
            value: PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.number,
                React.PropTypes.bool
            ]).isRequired,
            isDisabled: PropTypes.bool,
            className: PropTypes.string
        }).isRequired).isRequired,
        type: PropTypes.oneOf(['inline', 'stacked']),
        value: PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.bool
        ])
    },

    mixins: [Formsy.Mixin],

    getDefaultProps() {
        return { type: 'stacked' };
    },

    getRadioGroupClassSet() {
        return cx({
            [`radiogroup radiogroup--${this.props.type}`]: true,
            'radiogroup--with-error': this.isFieldInvalid(),
            'radiogroup--disabled': this.isFieldDisabled()
        }, this.props.className);
    },

    isFieldDisabled() {
        return this.isFormDisabled() || this.props.isDisabled;
    },


    isFieldInvalid() {
        return !this.isValid() && !this.isPristine();
    },

    handleRadioChange(event, value) {
        this.setValue(value);

        if (this.props.onChange) {
            this.props.onChange(event);
        }
    },

    maybeRenderErrorMessage() {
        let errorMessage;

        if (!this.isPristine()) {
            errorMessage = this.getErrorMessage();
        }

        if (!errorMessage) return null;

        return (
            <span className="radiogroup__error-message" ref="errorMessage">
                {errorMessage}
            </span>
        );
    },

    renderRadioGroup() {
        return map(this.props.options, (radio, i) => {
            const isChecked = (this.getValue() === radio.value);
            const isDisabled = this.isFieldDisabled() || radio.isDisabled;
            const className = cx({
                'radiogroup__radio': true,
                'radiogroup__radio--disabled': isDisabled
            }, radio.className);

            return (
                <label className={className} key={i}>
                    <input
                        type="radio"
                        className="radiogroup__radio-input"
                        name={this.props.name}
                        checked={isChecked}
                        value={radio.value}
                        onChange={(e) => this.handleRadioChange(e, radio.value)}
                        disabled={isDisabled} />
                    <span className="radiogroup__radio-button" />
                    <span className="radiogroup__radio-label">{radio.label}</span>
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
            <div className={this.getRadioGroupClassSet()}>
                <fieldset className="radiogroup__fieldset">
                    <legend className="radiogroup__label">{this.props.label}</legend>
                    {this.renderRadioGroup()}
                    {this.maybeRenderErrorMessage()}
                </fieldset>
            </div>
        );
    }
});

export default RadioGroup;
