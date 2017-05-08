'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _hbcBrowserConstants = require('hbc-browser-constants');

require('./TextField.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * TextField class.
 * @class TextField
 * @augments React.Component
 */
var TextField = (0, _react.createClass)( /** @lends TextField.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'TextField',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        autoComplete: _react.PropTypes.string,
        autoFocus: _react.PropTypes.bool,
        className: _react.PropTypes.string,
        evaluateOnBlur: _react.PropTypes.bool,
        evaluateOnChange: _react.PropTypes.bool,
        headingLabel: _react.PropTypes.string,
        id: _react.PropTypes.string.isRequired,
        isDisabled: _react.PropTypes.bool,
        label: _react.PropTypes.string.isRequired,
        maxLength: _react.PropTypes.number,
        name: _react.PropTypes.string.isRequired,
        onBlur: _react.PropTypes.func,
        onChange: _react.PropTypes.func,
        placeholder: _react.PropTypes.string,
        type: _react.PropTypes.string,
        validationError: _react.PropTypes.string,
        validationErrors: _react.PropTypes.object,
        value: _react.PropTypes.string
    },

    mixins: [_formsyReact2['default'].Mixin],

    getDefaultProps: function getDefaultProps() {
        return {
            type: 'text',
            evaluateOnChange: false,
            evaluateOnBlur: true,
            autoComplete: 'on'
        };
    },
    getInitialState: function getInitialState() {
        var defaultValue = this.props.value;

        return {
            value: defaultValue,
            isEmpty: (0, _isEmpty3['default'])(defaultValue),
            isFocused: this.props.autoFocus || false
        };
    },
    isFieldInvalid: function isFieldInvalid() {
        return !this.isValid() && !this.isPristine();
    },
    maybeRenderErrorMessage: function maybeRenderErrorMessage() {
        var errorMessage = void 0;

        if (!this.isPristine()) {
            errorMessage = this.getErrorMessage();
        }

        if (errorMessage) {
            return _react2['default'].createElement('span', { ref: 'errorMessage',
                className: 'text-field__error-message',
                dangerouslySetInnerHTML: { __html: errorMessage } });
        }
        return null;
    },
    handleOnFocus: function handleOnFocus() {
        this.setState({ isFocused: true });
    },
    handleChange: function handleChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event);
        }

        var value = event.currentTarget.value;

        // Added to handle browser auto-fill feature
        this.setState({ isEmpty: (0, _isEmpty3['default'])(value) });

        if (this.props.evaluateOnChange) {
            this.setValue(value);
        } else {
            this.setState({ _value: value });
        }
    },
    handleBlur: function handleBlur(event) {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }

        var value = event.currentTarget.value;

        this.setState({ isEmpty: (0, _isEmpty3['default'])(value), isFocused: false });

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
    handleKeyDown: function handleKeyDown(event) {
        var value = event.currentTarget.value;

        if (event.keyCode === _hbcBrowserConstants.KeyCodes.ENTER) {
            this.setState({ isEmpty: (0, _isEmpty3['default'])(value) });

            this.setValue(value);
        }
    },


    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render: function render() {
        var classNames = (0, _classnames2['default'])({
            'text-field': true,
            'text-field--invalid': this.isFieldInvalid(),
            'text-field--focused': this.state.isFocused,
            'text-field--empty': this.state.isEmpty
        }, this.props.className);

        var headingLabelClassNames = (0, _classnames2['default'])({
            'text-field__heading-label': true,
            'text-field__heading-label--hide': this.state.isFocused || !this.state.isEmpty,
            'text-field__heading-label--invalid': this.isFieldInvalid()
        });

        return _react2['default'].createElement(
            'div',
            { className: classNames },
            _react2['default'].createElement(
                'div',
                { className: 'text-field__wrapper' },
                _react2['default'].createElement(
                    'label',
                    { ref: 'label', htmlFor: this.props.id },
                    _react2['default'].createElement(
                        'span',
                        { className: 'text-field__label' },
                        this.props.label
                    ),
                    _react2['default'].createElement(
                        'span',
                        { ref: 'headingLabel', className: headingLabelClassNames },
                        this.props.headingLabel
                    )
                ),
                _react2['default'].createElement('input', {
                    ref: 'input',
                    type: this.props.type,
                    name: this.props.name,
                    id: this.props.id,
                    className: 'text-field__control',
                    placeholder: this.props.placeholder,
                    disabled: this.props.isDisabled,
                    autoComplete: this.props.autoComplete,
                    autoFocus: this.props.autoFocus,
                    maxLength: this.props.maxLength,
                    value: this.getValue() || '',
                    onChange: this.handleChange,
                    onFocus: this.handleOnFocus,
                    onBlur: this.handleBlur,
                    onKeyDown: this.handleKeyDown })
            ),
            this.maybeRenderErrorMessage()
        );
    }
});

exports['default'] = TextField;