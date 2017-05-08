import React, { PropTypes, createClass } from 'react';
import Icon from '../Icon/Icon';
import { filter, first, map, isEmpty } from 'lodash';
import cx from 'classnames';

import './DropDownList.scss';

const DEFAULT_VALUE = '';
const OPTION_PREFIX = 'dropdownlist_';

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
const DropDownList = createClass(/** @lends DropDownList.prototype */{

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
        className: PropTypes.string,
        errorMessage: PropTypes.string,
        initialValue: PropTypes.string,
        isDisabled: PropTypes.bool,
        name: PropTypes.string,
        onChange: PropTypes.func,
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.string.isRequired,
            disabled: PropTypes.bool
        }).isRequired).isRequired,
        placeholder: PropTypes.string
    },

    getDefaultProps() {
        return {
            initialValue: DEFAULT_VALUE,
            isDisabled: false
        };
    },

    getInitialState() {
        const { options, placeholder, initialValue } = this.props;
        let value;

        if (initialValue && isEmpty(placeholder)) {
            value = initialValue;
        } else {
            value = placeholder ? initialValue : first(options).value;
        }

        return { value };
    },

    getComponentClassSet() {
        return cx({
            'drop-down-list': true,
            'drop-down-list--disabled': this.props.isDisabled,
            'drop-down-list--error': this.hasErrorMessage()
        }, this.props.className);
    },

    getSelectElementClassSet() {
        return cx({
            'drop-down-list__select': true,
            'drop-down-list__select--default': this.isDefaultValueSelected()
        });
    },

    isDefaultValueSelected() {
        return this.state.value === DEFAULT_VALUE;
    },

    emitEvent(eventName, ...eventArgs) {
        if (this.props[eventName]) {
            this.props[eventName].apply(null, eventArgs);
        }
    },

    hasErrorMessage() {
        return !isEmpty(this.props.errorMessage);
    },

    handleChange(event) {
        const { value } = event.target;
        this.setState({ value }, () => this.emitEvent('onChange', value));
    },

    renderOptions() {
        return map(filter(this.props.options, undefined), (option, index) => {
            const { value, label, disabled } = option;

            return (<option ref={`${OPTION_PREFIX}${index}`} key={index} value={value} disabled={disabled}
                dangerouslySetInnerHTML={{ __html: label }} />);
        });
    },

    renderDefaultOption() {
        if (this.props.placeholder) {
            return (
                <option ref="defaultLabel" value={DEFAULT_VALUE} disabled>
                    {this.props.placeholder}
                </option>
            );
        }
        return null;
    },

    renderErrorMessage() {
        const { errorMessage } = this.props;

        if (this.hasErrorMessage()) {
            return (
                <span className="drop-down-list__error-message">
                    {errorMessage}
                </span>
            );
        }
        return null;
    },

    renderDropDownElement() {
        return (
            <select ref="selectElement"
                name={this.props.name}
                disabled={this.props.isDisabled}
                className={this.getSelectElementClassSet()}
                value={this.state.value}
                onChange={this.handleChange}>
                {this.renderDefaultOption()}
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
                {this.renderDropDownElement()}
                <Icon name="caret-down" />
                {this.renderErrorMessage()}
            </div>
        );
    }
});

export default DropDownList;
