import React, { createClass, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import cx from 'classnames';
import Formsy from 'formsy-react';

import './TextArea.scss';

/**
 * TextArea class.
 * @class TextArea
 * @augments React.Component
 */
const TextArea = createClass(/** @lends TextArea.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'TextArea',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        autoComplete: PropTypes.string,
        autoFocus: PropTypes.bool,
        className: PropTypes.string,
        cols: PropTypes.string,
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
        rows: PropTypes.string,
        type: PropTypes.string,
        validationError: PropTypes.string,
        validationErrors: PropTypes.object,
        value: PropTypes.string
    },

    mixins: [Formsy.Mixin],

    getDefaultProps() {
        return {
            cols: '3',
            rows: '3',
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
                    className="text-area__error-message"
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
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        const classNames = cx({
            'text-area': true,
            'text-area--invalid': this.isFieldInvalid(),
            'text-area--focused': this.state.isFocused,
            'text-area--empty': this.state.isEmpty
        }, this.props.className);

        const headingLabelClassNames = cx({
            'text-area__heading-label': true,
            'text-area__heading-label--hide': this.state.isFocused || !this.state.isEmpty,
            'text-area__heading-label--invalid': this.isFieldInvalid()
        });

        return (
            <div className={classNames}>
                <div className="text-area__wrapper">
                    <label ref="label" htmlFor={this.props.id} >
                        <span className="text-area__label">
                            {this.props.label}
                        </span>
                        <span ref="headingLabel" className={headingLabelClassNames}>
                            {this.props.headingLabel}
                        </span>
                    </label>
                    <textarea
                        ref="input"
                        name={this.props.name}
                        id={this.props.id}
                        className="text-area__control"
                        placeholder={this.props.placeholder}
                        disabled={this.props.isDisabled}
                        autoComplete={this.props.autoComplete}
                        autoFocus={this.props.autoFocus}
                        maxLength={this.props.maxLength}
                        value={this.getValue()}
                        onChange={this.handleChange}
                        onFocus={this.handleOnFocus}
                        onBlur={this.handleBlur}
                        cols={this.props.cols}
                        rows={this.props.rows} />
                </div>
                {this.maybeRenderErrorMessage()}
            </div>
        );
    }
});

export default TextArea;
