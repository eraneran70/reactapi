'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys2 = require('lodash/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _WaitingSpinner = require('../WaitingSpinner/WaitingSpinner');

var _WaitingSpinner2 = _interopRequireDefault(_WaitingSpinner);

require('./Button.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * A button is perhaps the most commonly used widget in any graphical user
 * interface. Buttons are used for **actions**, like in forms, while textual
 * hyperlinks are used for **destinations**, or moving from one page to another.
 *
 * #### Styles
 *
 * A button comes in the full spectrum of the framework's default colors. You
 * can specify the button style context using the `styleContext` prop.
 *
 * ```js
 * import Button from './src/components/Button/Button';
 * import React from 'react';
 * import ReactDOM from 'react-dom';
 *
 * const container = document.getElementById('#container');
 * const props = {
 *     // one of default|primary|success|info|warning|danger|link
 *     styleContext: 'warning'
 * };
 *
 * ReactDOM.render(React.createElement(Button, props), container);
 * ```
 *
 * Using colors to add meaning to a button only provides a visual indication,
 * which will not be conveyed to users of assistive technologies – such as
 * screen readers. Ensure that information denoted by the color is either
 * obvious from the content itself (the visible text of the button), or is
 * included through alternative means, such as additional hidden text.
 *
 * #### Icons
 *
 * A button is rectangular and typically displays a text label describing its
 * action, which can either contain or be replaced by an icon that conveys the
 * same message.
 *
 * Use the `icon` prop to specify the icon to be rendered. You may specify in
 * which position the icon should be rendered by setting the `position` prop
 * to one of `top`, `right`, `bottom`, or `left`.
 *
 * ```js
 * import Button from './src/components/Button/Button';
 * import React from 'react';
 * import ReactDOM from 'react-dom';
 *
 * const container = document.getElementById('#container');
 * const props = {
 *     icon: 'edit',
 *     // on of top|right|bottom|left
 *     position: 'left'
 * };
 *
 * ReactDOM.render(React.createElement(Button, props), container);
 * ```
 *
 * #### Tags
 *
 * The DOM element tag is choosen automatically for you based on the props you
 * supply. Passing a `href` will result in the button using a `<a />` element
 * otherwise a `<button />` element will be used.
 *
 * ```js
 * import Button from './src/components/Button/Button';
 * import React from 'react';
 * import ReactDOM from 'react-dom';
 *
 * const props = { href: 'http://www.google.com' };
 * const container = document.getElementById('#container');
 *
 * ReactDOM.render(React.createElement(Button, props), container);
 * ```
 *
 * @class Button
 * @augments {React.Component}
 */
var Button = (0, _react.createClass)({

    displayName: 'Button',

    propTypes: {
        // Whether the button should stretch to cover its container.
        block: _react.PropTypes.bool,
        children: _react.PropTypes.node,
        // Custom class for container, when needing to adhere to BEM
        className: _react.PropTypes.string,
        // Custom class for text
        classNameForText: _react.PropTypes.string,
        // Whether the button should stretch to cover its container without side
        // borders. Typically used in mobile sites.
        disabled: _react.PropTypes.bool,
        full: _react.PropTypes.bool,
        // Page visited when the button is pressed.
        href: _react.PropTypes.string,
        // Icon rendered within the button.
        icon: _react.PropTypes.string,
        // Render waiting spinners in a button
        loading: _react.PropTypes.bool,
        // Handler for when the button is clicked (a click via mouse or tap via touch)
        onClick: _react.PropTypes.func,
        // Whether the button should be rendered as an outline button.
        // Outline buttons downplay an action as they appear like boxy links.
        outline: _react.PropTypes.bool,
        // Position where the icon should be placed relative to the button.
        position: _react.PropTypes.string,
        // Flag for prevent default
        preventDefault: _react.PropTypes.bool,
        // Whether the button should be rendered as a standalone icon.
        standalone: _react.PropTypes.bool,
        // Inner js styles
        style: _react.PropTypes.object,
        // Button style context.
        // One of: {default|primary|secondary|tertiary|success|warning|danger|info}
        styleContext: _react.PropTypes.string,
        // How the button should open the page visited when pressed.
        target: _react.PropTypes.string,
        // The <button> "type" attribute.
        type: _react.PropTypes.oneOf(['button', 'submit', 'reset'])
    },

    getDefaultProps: function getDefaultProps() {
        return {
            block: false,
            classNameForText: '',
            full: false,
            outline: false,
            standalone: false,
            styleContext: 'default',
            disabled: false,
            preventDefault: false,
            type: 'button',
            loading: false
        };
    },


    /**
     * Computes the class names that should be appended to the component when
     * rendered based on the passed in properties from a parent component.
     * @memberOf Button.prototype
     * @method getClassSet
     * @return {String} Class names to be appended
     */
    getClassSet: function getClassSet() {
        var styles = {
            'hbc-button': true,
            'hbc-button--block': this.props.block,
            'hbc-button--full': this.props.full,
            'hbc-button--outline': this.props.outline,
            'hbc-button--default': this.props.styleContext === 'default',
            'hbc-button--primary': this.props.styleContext === 'primary',
            'hbc-button--secondary': this.props.styleContext === 'secondary',
            'hbc-button--success': this.props.styleContext === 'success',
            'hbc-button--info': this.props.styleContext === 'info',
            'hbc-button--warning': this.props.styleContext === 'warning',
            'hbc-button--danger': this.props.styleContext === 'danger',
            'hbc-button--link': this.props.styleContext === 'link'
        };

        var icons = {};

        if (this.props.icon) {
            icons = {
                'hbc-button--icon-top': this.props.position === 'top',
                'hbc-button--icon-right': this.props.position === 'right',
                'hbc-button--icon-bottom': this.props.position === 'bottom',
                'hbc-button--icon-left': this.props.position === 'left',
                'hbc-button--icon-standalone': this.props.standalone
            };
        }

        return (0, _classnames2['default'])(styles, icons, this.props.className);
    },
    handleClick: function handleClick(event) {
        if (this.props.preventDefault) {
            event.preventDefault();
        }

        if (this.props.onClick) {
            this.props.onClick(event);
        }
    },
    maybeRenderChildren: function maybeRenderChildren() {
        var classes = (0, _classnames2['default'])('hbc-button__text ' + this.props.classNameForText, {
            'is-visually-hidden': this.props.standalone });

        if (this.props.loading) {
            return _react2['default'].createElement(_WaitingSpinner2['default'], { ref: 'waitingSpinner', type: 'inverted' });
        }

        return _react2['default'].createElement(
            'span',
            null,
            this.maybeRenderIcon(),
            _react2['default'].createElement(
                'span',
                { className: classes },
                this.props.children
            )
        );
    },
    maybeRenderIcon: function maybeRenderIcon() {
        if (this.props.icon) {
            return _react2['default'].createElement(_Icon2['default'], { name: this.props.icon });
        }

        return null;
    },


    /**
     * A helper method that renders an anchor tag styled as a button.
     * @memberOf Button.prototype
     * @method renderAnchor
     * @private
     * @return {React.DOM}
     */
    renderAnchor: function renderAnchor() {
        var props = (0, _omit3['default'])(this.props, (0, _keys3['default'])(Button.propTypes));

        return _react2['default'].createElement(
            'a',
            (0, _extends3['default'])({ href: this.props.href, target: this.props.target, ref: 'buttonElement', className: this.getClassSet(),
                role: 'button', onClick: this.handleClick }, props),
            this.maybeRenderChildren()
        );
    },


    /**
     * A helper method that renders a button tag styled as a button.
     * @memberOf Button.prototype
     * @method renderButton
     * @private
     * @return {React.DOM}
     */
    renderButton: function renderButton() {
        var props = (0, _omit3['default'])(this.props, (0, _keys3['default'])(Button.propTypes));
        var isDisabled = this.props.disabled || this.props.loading;

        return _react2['default'].createElement(
            'button',
            (0, _extends3['default'])({ disabled: isDisabled, className: this.getClassSet(), type: this.props.type,
                onClick: this.handleClick, ref: 'buttonElement' }, props, { style: this.props.style }),
            this.maybeRenderChildren()
        );
    },


    /**
     * Renders the component based on the properties passed in from a parent
     * component and its state.
     * @memberOf Button.prototype
     * @method render
     * @return {React.DOM}
     */
    render: function render() {
        if (this.props.href || this.props.target) {
            return this.renderAnchor();
        }

        return this.renderButton();
    }
});

exports['default'] = Button;