import React, { PropTypes } from 'react';
import Icon from '../Icon/Icon';
import { get, map } from 'lodash';
import Formsy from 'formsy-react';
import cx from 'classnames';

import './DropDownMenu.scss';

const DEFAULT_VALUE = '';

/**
 * DropDownMenu class.
 * @class DropDownMenu
 * @augments Component
 */
const DropDownMenu = React.createClass(/** @lends DropDownMenu.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'DropDownMenu',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        className: PropTypes.string,
        isDisabled: PropTypes.bool,
        label: PropTypes.string,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.node.isRequired,
            label: PropTypes.node.isRequired,
            isDisabled: PropTypes.bool
        }).isRequired).isRequired,
        value: PropTypes.any
    },

    mixins: [Formsy.Mixin],

    getDefaultProps() {
        return {
            value: get(this.props, 'value', DEFAULT_VALUE)
        };
    },

    getSelectElementClassSet() {
        return cx({
            'drop-down-menu__select': true,
            'drop-down-menu__select--default': !this.getValue()
        });
    },

    getComponentClassSet() {
        return cx({
            'drop-down-menu': true,
            'drop-down-menu--disabled': this.isFieldDisabled(),
            'drop-down-menu--with-error': this.isFieldInvalid()
        }, this.props.className);
    },

    isFieldInvalid() {
        return !this.isValid() && !this.isPristine();
    },

    isFieldDisabled() {
        return this.isFormDisabled() || this.props.isDisabled;
    },

    handleChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event);
        }

        const { value } = event.target;

        this.setValue(value);
    },

    maybeRenderDefaultOption() {
        if (this.props.label) {
            return (
                <option ref="defaultLabel" value={DEFAULT_VALUE} disabled>
                    {this.props.label}
                </option>
            );
        }
        return null;
    },

    maybeRenderErrorMessage() {
        let errorMessage;

        if (!this.isPristine()) {
            errorMessage = this.getErrorMessage();
        }

        if (errorMessage) {
            return (
                <div className="drop-down-menu__error-message" ref="errorMessage">
                    <span>{errorMessage}</span>
                </div>
            );
        }

        return null;
    },

    renderOptions() {
        return map(this.props.options, (option, index) => {
            const { value, label, isDisabled } = option;

            return (<option key={index} value={value} disabled={isDisabled}>{label}</option>);
        });
    },

    renderSelectElement() {
        return (
            <select
                ref="selectElement"
                name={this.props.name}
                disabled={this.isFieldDisabled()}
                className={this.getSelectElementClassSet()}
                value={this.getValue()}
                onChange={this.handleChange}>
                {this.maybeRenderDefaultOption()}
                {this.renderOptions()}
            </select>
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
            <div className={this.getComponentClassSet()}>
                <div className="drop-down-menu__wrapper">
                    {this.renderSelectElement()}
                    <Icon name="caret-down" />
                </div>
                {this.maybeRenderErrorMessage()}
            </div>
        );
    }
});

export default DropDownMenu;
