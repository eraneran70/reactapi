import React, { PropTypes, createClass } from 'react';
import Icon from '../Icon/Icon';
import Formsy from 'formsy-react';
import cx from 'classnames';
import { isEmpty, map, reduce } from 'lodash';
import { addEvent, removeEvent } from 'hbc-dom-utilities/lib/event';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

let device;

if (canUseDOM) {
    require('device-detect.js');
    device = window.device;
}

import './CheckboxDropList.scss';

const DEFAULT_VALUE = '';
const OPTION_PREFIX = 'checkdroplist-';

/**
 * CheckboxDropList class.
 * @class CheckboxDropList
 * @augments React.Component
 */
const CheckboxDropList = createClass(/** @lends CheckboxDropList.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'CheckboxDropList',

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
            className: PropTypes.string,
            isDisabled: PropTypes.bool,
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        }).isRequired).isRequired,
        selectedLabel: PropTypes.string.isRequired,
        value: PropTypes.array
    },

    mixins: [Formsy.Mixin],

    getDefaultProps() {
        return {
            value: []
        };
    },

    getInitialState() {
        return ({
            isOpen: false
        });
    },

    /**
      * Gets the class names for the Checkbox DropList component
      * @method getComponentClassSet
      */
    getComponentClassSet() {
        return cx({
            'checkbox-drop-list': true,
            'checkbox-drop-list--with-error': this.isFieldInvalid()
        }, this.props.className);
    },

    isFieldInvalid() {
        return !this.isValid() && !this.isPristine();
    },

    isFieldDisabled() {
        return this.isFormDisabled() || this.props.isDisabled;
    },

    /**
      * Used to check if the user is viewing on an iOS or Android device
      * @method isAndroidOriOS
      */
    isAndroidOriOS() {
        return device && (device.ios() || device.android());
    },

    /**
      * An event handler used to toggle the droplist in the non-iOS/Android droplist
      * @method handleToggleDropList
      */
    handleToggleDropList() {
        if (this.state.isOpen) {
            removeEvent(document, 'click', this.handleDocumentClick);
        } else {
            addEvent(document, 'click', this.handleDocumentClick);
        }

        this.setState({
            isOpen: !this.state.isOpen
        });
    },

    /**
      * An event handler used to handle the change of a checkbox-droplist value
      * and also allows direct access to the DOM event in its parent.
      * @method handleValueChange
      */
    handleValueChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event);
        }

        const values = reduce(this.props.options, (value, option, index) => {
            const choice = this.refs[`${OPTION_PREFIX}${index}`];

            if (choice.checked || choice.selected) {
                value.push(option.value);
            }

            return value;
        }, []);

        this.setValue(values);
    },

    /**
      * An event handler used to hide the checkbox droplist when
      * a user clicks anywhere outside of it.
      */
    handleDocumentClick(event) {
        const menu = this.refs.checkboxParent;

        if (menu && !menu.contains(event.target)) {
            this.setState({
                isOpen: false
            });
        }
    },

    /**
     * Conditionally renders an error message
     * @method maybeRenderErrorMessage
     * @return {ReactElement}
     */
    maybeRenderErrorMessage() {
        let errorMessage;

        if (!this.isPristine()) {
            errorMessage = this.getErrorMessage();
        }

        if (errorMessage) {
            return (
                <span className="checkbox-drop-list__error-message" ref="errorMessage">
                    {errorMessage}
                </span>
            );
        }

        return false;
    },

    /**
      * Renders the select placeholder for iOS/Android
      * @method renderSelectPlaceholder
      * @return {ReactElement}
      */
    renderSelectPlaceholder() {
        return (
            <option value={DEFAULT_VALUE} ref="placeholder" disabled>
                {this.props.label}
            </option>
        );
    },

    /**
      * Renders each option as a <option> for the parent <select> [iOS/Android]
      * @method renderSelectOptions
      * @return {ReactElement}
      */
    renderSelectOptions() {
        return map(this.props.options, ({ disabled, label, value }, index) => {
            const isDisabled = this.isFieldDisabled() || disabled;
            return (
                <option ref={`${OPTION_PREFIX}${index}`} key={index} value={value} disabled={isDisabled}>
                    {label}
                </option>
            );
        });
    },

    /**
      * Renders each option as a input[type=checkbox] wrapped in a <li> [non-iOS/Android]
      * @method renderCheckboxElements
      * @return {ReactElement}
      */
    renderCheckboxElements() {
        return map(this.props.options, (checkbox, index) => {
            const isChecked = this.getValue().indexOf(checkbox.value) !== -1;
            const isDisabled = this.isFieldDisabled() || checkbox.disabled;
            const classNames = cx({
                'checkbox-drop-list__checkbox': true,
                'checkbox-drop-list__checkbox--disabled': isDisabled
            }, checkbox.className);

            return (
                <li className={classNames} key={index}>
                    <label>
                        <input
                            ref={`${OPTION_PREFIX}${index}`}
                            type="checkbox"
                            className="checkbox__checkbox-input"
                            name={this.props.name}
                            checked={isChecked}
                            value={checkbox.value}
                            onChange={this.handleValueChange}
                            disabled={isDisabled} />
                        <span className="checkbox__checkbox-label">
                            {checkbox.label}
                        </span>
                    </label>
                </li>
            );
        });
    },

    /**
      * Renders the droplist label for non-iOS/Android
      * @method renderDropListLabel
      * @return {ReactElement}
      */
    renderDropListLabel() {
        const classes = cx({
            'checkbox-drop-list__label': true,
            'checkbox-drop-list__label--default': isEmpty(this.getValue())
        });
        const label = isEmpty(this.getValue()) ? this.props.label :
            `${this.getValue().length} ${this.props.selectedLabel}`;

        return (
            <div className={classes}
                onClick={this.handleToggleDropList}>
                {label}
            </div>
        );
    },

    /**
      * Using device detection, this will determine if we are going to render
      * a <select multiple> (iOS / Android) or series of <input type="checkbox"> (otherwise).
      * This is because the multiple select interface on iOS/Android is much more intuitive than
      * the experience of a multiple select on a non-mobile web browser.
      * @method renderSelectOrCheckbox
      * @return {ReactElement}
      */
    renderSelectOrCheckbox() {
        if (this.isAndroidOriOS()) {
            return (
                <select className="checkbox-drop-list__select" multiple="multiple"
                    disabled={this.isFieldDisabled()}
                    defaultValue={[DEFAULT_VALUE]}
                    onChange={this.handleValueChange}
                    name={this.props.name}
                    ref="mobileOptions">
                    {this.renderSelectPlaceholder()}
                    {this.renderSelectOptions()}
                </select>
            );
        }

        const optionsClasses = cx({
            'checkbox-drop-list__options': true,
            'checkbox-drop-list__options--open': this.state.isOpen
        });

        return (
            <div className="checkbox-drop-list__select" ref="checkboxParent">
                {this.renderDropListLabel()}
                <ul className={optionsClasses}>
                    {this.renderCheckboxElements()}
                </ul>
            </div>
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
                {this.renderSelectOrCheckbox()}
                <Icon name="caret-down" />
                {this.maybeRenderErrorMessage()}
            </div>
        );
    }
});

export default CheckboxDropList;
