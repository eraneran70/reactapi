'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reduce2 = require('lodash/reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _event = require('hbc-dom-utilities/lib/event');

var _ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

require('./CheckboxDropList.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var device = void 0;

if (_ExecutionEnvironment.canUseDOM) {
    require('device-detect.js');
    device = window.device;
}

var DEFAULT_VALUE = '';
var OPTION_PREFIX = 'checkdroplist-';

/**
 * CheckboxDropList class.
 * @class CheckboxDropList
 * @augments React.Component
 */
var CheckboxDropList = (0, _react.createClass)( /** @lends CheckboxDropList.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'CheckboxDropList',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        className: _react.PropTypes.string,
        isDisabled: _react.PropTypes.bool,
        label: _react.PropTypes.string.isRequired,
        name: _react.PropTypes.string.isRequired,
        onChange: _react.PropTypes.func,
        options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            className: _react.PropTypes.string,
            isDisabled: _react.PropTypes.bool,
            label: _react.PropTypes.string.isRequired,
            value: _react.PropTypes.string.isRequired
        }).isRequired).isRequired,
        selectedLabel: _react.PropTypes.string.isRequired,
        value: _react.PropTypes.array
    },

    mixins: [_formsyReact2['default'].Mixin],

    getDefaultProps: function getDefaultProps() {
        return {
            value: []
        };
    },
    getInitialState: function getInitialState() {
        return {
            isOpen: false
        };
    },


    /**
      * Gets the class names for the Checkbox DropList component
      * @method getComponentClassSet
      */
    getComponentClassSet: function getComponentClassSet() {
        return (0, _classnames2['default'])({
            'checkbox-drop-list': true,
            'checkbox-drop-list--with-error': this.isFieldInvalid()
        }, this.props.className);
    },
    isFieldInvalid: function isFieldInvalid() {
        return !this.isValid() && !this.isPristine();
    },
    isFieldDisabled: function isFieldDisabled() {
        return this.isFormDisabled() || this.props.isDisabled;
    },


    /**
      * Used to check if the user is viewing on an iOS or Android device
      * @method isAndroidOriOS
      */
    isAndroidOriOS: function isAndroidOriOS() {
        return device && (device.ios() || device.android());
    },


    /**
      * An event handler used to toggle the droplist in the non-iOS/Android droplist
      * @method handleToggleDropList
      */
    handleToggleDropList: function handleToggleDropList() {
        if (this.state.isOpen) {
            (0, _event.removeEvent)(document, 'click', this.handleDocumentClick);
        } else {
            (0, _event.addEvent)(document, 'click', this.handleDocumentClick);
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
    handleValueChange: function handleValueChange(event) {
        var _this = this;

        if (this.props.onChange) {
            this.props.onChange(event);
        }

        var values = (0, _reduce3['default'])(this.props.options, function (value, option, index) {
            var choice = _this.refs['' + OPTION_PREFIX + index];

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
    handleDocumentClick: function handleDocumentClick(event) {
        var menu = this.refs.checkboxParent;

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
    maybeRenderErrorMessage: function maybeRenderErrorMessage() {
        var errorMessage = void 0;

        if (!this.isPristine()) {
            errorMessage = this.getErrorMessage();
        }

        if (errorMessage) {
            return _react2['default'].createElement(
                'span',
                { className: 'checkbox-drop-list__error-message', ref: 'errorMessage' },
                errorMessage
            );
        }

        return false;
    },


    /**
      * Renders the select placeholder for iOS/Android
      * @method renderSelectPlaceholder
      * @return {ReactElement}
      */
    renderSelectPlaceholder: function renderSelectPlaceholder() {
        return _react2['default'].createElement(
            'option',
            { value: DEFAULT_VALUE, ref: 'placeholder', disabled: true },
            this.props.label
        );
    },


    /**
      * Renders each option as a <option> for the parent <select> [iOS/Android]
      * @method renderSelectOptions
      * @return {ReactElement}
      */
    renderSelectOptions: function renderSelectOptions() {
        var _this2 = this;

        return (0, _map3['default'])(this.props.options, function (_ref, index) {
            var disabled = _ref.disabled,
                label = _ref.label,
                value = _ref.value;

            var isDisabled = _this2.isFieldDisabled() || disabled;
            return _react2['default'].createElement(
                'option',
                { ref: '' + OPTION_PREFIX + index, key: index, value: value, disabled: isDisabled },
                label
            );
        });
    },


    /**
      * Renders each option as a input[type=checkbox] wrapped in a <li> [non-iOS/Android]
      * @method renderCheckboxElements
      * @return {ReactElement}
      */
    renderCheckboxElements: function renderCheckboxElements() {
        var _this3 = this;

        return (0, _map3['default'])(this.props.options, function (checkbox, index) {
            var isChecked = _this3.getValue().indexOf(checkbox.value) !== -1;
            var isDisabled = _this3.isFieldDisabled() || checkbox.disabled;
            var classNames = (0, _classnames2['default'])({
                'checkbox-drop-list__checkbox': true,
                'checkbox-drop-list__checkbox--disabled': isDisabled
            }, checkbox.className);

            return _react2['default'].createElement(
                'li',
                { className: classNames, key: index },
                _react2['default'].createElement(
                    'label',
                    null,
                    _react2['default'].createElement('input', {
                        ref: '' + OPTION_PREFIX + index,
                        type: 'checkbox',
                        className: 'checkbox__checkbox-input',
                        name: _this3.props.name,
                        checked: isChecked,
                        value: checkbox.value,
                        onChange: _this3.handleValueChange,
                        disabled: isDisabled }),
                    _react2['default'].createElement(
                        'span',
                        { className: 'checkbox__checkbox-label' },
                        checkbox.label
                    )
                )
            );
        });
    },


    /**
      * Renders the droplist label for non-iOS/Android
      * @method renderDropListLabel
      * @return {ReactElement}
      */
    renderDropListLabel: function renderDropListLabel() {
        var classes = (0, _classnames2['default'])({
            'checkbox-drop-list__label': true,
            'checkbox-drop-list__label--default': (0, _isEmpty3['default'])(this.getValue())
        });
        var label = (0, _isEmpty3['default'])(this.getValue()) ? this.props.label : this.getValue().length + ' ' + this.props.selectedLabel;

        return _react2['default'].createElement(
            'div',
            { className: classes,
                onClick: this.handleToggleDropList },
            label
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
    renderSelectOrCheckbox: function renderSelectOrCheckbox() {
        if (this.isAndroidOriOS()) {
            return _react2['default'].createElement(
                'select',
                { className: 'checkbox-drop-list__select', multiple: 'multiple',
                    disabled: this.isFieldDisabled(),
                    defaultValue: [DEFAULT_VALUE],
                    onChange: this.handleValueChange,
                    name: this.props.name,
                    ref: 'mobileOptions' },
                this.renderSelectPlaceholder(),
                this.renderSelectOptions()
            );
        }

        var optionsClasses = (0, _classnames2['default'])({
            'checkbox-drop-list__options': true,
            'checkbox-drop-list__options--open': this.state.isOpen
        });

        return _react2['default'].createElement(
            'div',
            { className: 'checkbox-drop-list__select', ref: 'checkboxParent' },
            this.renderDropListLabel(),
            _react2['default'].createElement(
                'ul',
                { className: optionsClasses },
                this.renderCheckboxElements()
            )
        );
    },


    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render: function render() {
        return _react2['default'].createElement(
            'div',
            { className: this.getComponentClassSet() },
            this.renderSelectOrCheckbox(),
            _react2['default'].createElement(_Icon2['default'], { name: 'caret-down' }),
            this.maybeRenderErrorMessage()
        );
    }
});

exports['default'] = CheckboxDropList;