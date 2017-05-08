'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _event = require('hbc-dom-utilities/lib/event');

require('./BackToTopButton.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * BackToTopButton class.
 * @class BackToTopButton
 * @augments React.Component
 */
var BackToTopButton = _react2['default'].createClass( /** @lends BackToTopButton.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'BackToTopButton',

    getInitialState: function getInitialState() {
        return {
            showBackToTop: 0
        };
    },
    componentDidMount: function componentDidMount() {
        (0, _event.addEvent)(window, 'scroll-debounced', this.handleScroll);
    },


    /**
     * handleScroll() shows the scrollToTop button after 100 pixels
     * down the page and hides it before 100 pixels
     * @method handleScroll
     */
    handleScroll: function handleScroll() {
        this.setState({ showBackToTop: pageYOffset > 100 });
    },


    /**
     * scrollToTop() scrolls linearly to the destination
     * in the scrollSpeed (ms) specified.
     * @method scrollToTop
     * @param {Element} element
     * @param {Number} destination
     * @param {Number} scrollSpeed
     */
    scrollToTop: function scrollToTop(element) {
        var _this = this;

        var destination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var scrollSpeed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;

        if (scrollSpeed <= 0) {
            return;
        }

        var difference = destination - element.scrollTop;
        var perTick = difference / scrollSpeed * 10;
        setTimeout(function () {
            element.scrollTop = element.scrollTop + perTick;
            // Stop when the scrollTop of the element is at the destination
            if (element.scrollTop === destination) {
                return;
            }

            _this.scrollToTop(element, destination, scrollSpeed - 10);
        }, 10);
    },
    handleRunScroll: function handleRunScroll() {
        // document.body.scrollTop is used by Chrome and
        // document.documentElement.scrollTop is used by all other browsers
        var element = document.body.scrollTop === 0 ? document.documentElement : document.body;
        this.scrollToTop(element, 0, 200);
    },


    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render: function render() {
        var clx = (0, _classnames2['default'])({
            'back-to-top-button': true,
            'back-to-top-button--active': this.state.showBackToTop
        });
        return _react2['default'].createElement(
            'button',
            { className: clx,
                ref: 'backToTop',
                onClick: this.handleRunScroll },
            _react2['default'].createElement(_Icon2['default'], { name: 'chevron-thick' })
        );
    }
}); /* eslint-disable no-param-reassign */

exports['default'] = BackToTopButton;