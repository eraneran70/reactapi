'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _result2 = require('lodash/result');

var _result3 = _interopRequireDefault(_result2);

var _assign2 = require('lodash/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Portal = require('../Portal/Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _Position = require('../Position/Position');

var _Position2 = _interopRequireDefault(_Position);

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _event = require('hbc-dom-utilities/lib/event');

var _traversing = require('hbc-dom-utilities/lib/traversing');

var _miscellaneous = require('hbc-dom-utilities/lib/miscellaneous');

var _transition = require('hbc-dom-utilities/lib/transition');

require('./Tooltip.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function Tooltip(props) {
    var position = props.position;
    var feedback = props.feedback;

    var classes = (0, _classnames2['default'])('tooltip', 'tooltip--' + feedback.important, 'tooltip--' + feedback.vertical, 'tooltip--' + feedback.horizontal, props.className);

    var style = {
        top: position.top,
        left: position.left
    };

    function maybeRenderCloseIcon() {
        if (!props.showCloseButton) {
            return null;
        }
        return _react2['default'].createElement(_Icon2['default'], { name: 'cross',
            onClick: props.onRequestClose,
            className: 'tooltip--close-icon' });
    }

    function handleClick(event) {
        event.stopPropagation();
    }

    return _react2['default'].createElement(
        'div',
        { className: classes, style: style, onClick: handleClick },
        maybeRenderCloseIcon(),
        _react2['default'].createElement(
            'div',
            { className: 'tooltip--content' },
            props.children
        )
    );
}

Tooltip.propTypes = {
    children: _react2['default'].PropTypes.node,
    className: _react2['default'].PropTypes.string,
    feedback: _react2['default'].PropTypes.object,
    onRequestClose: _react2['default'].PropTypes.func,
    position: _react2['default'].PropTypes.object,
    showCloseButton: _react2['default'].PropTypes.bool
};

/**
 * Tooltip class.
 * @class Tooltip
 * @augments React.Component
 */
exports['default'] = _react2['default'].createClass( /** @lends Tooltip.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'Tooltip',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: (0, _assign3['default'])({}, _Position2['default'].propTypes, {
        autoCloseWhenOffScreen: _react2['default'].PropTypes.bool,
        className: _react2['default'].PropTypes.string,
        isOpen: _react2['default'].PropTypes.bool,
        showCloseButton: _react2['default'].PropTypes.bool
    }),

    getDefaultProps: function getDefaultProps() {
        return {
            isOpen: false,
            autoCloseWhenOffScreen: true,
            collision: { horizontal: 'flipfit', vertical: 'flip' },
            showCloseButton: false
        };
    },
    getInitialState: function getInitialState() {
        return {
            isOpen: false,
            isOpening: false,
            isClosing: false
        };
    },
    componentDidMount: function componentDidMount() {
        if (this.props.isOpen) {
            this.open();
            this.attachWindowEvents();
        }
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen !== this.state.isOpen) {
            if (nextProps.isOpen) {
                this.open();
                this.attachWindowEvents();
            } else {
                this.close();
                this.detachWindowEvents();
            }
        }
    },
    componentWillUnmount: function componentWillUnmount() {
        this.detachWindowEvents();
    },
    getTargetDOMNode: function getTargetDOMNode() {
        return this.refs.portal.getOverlayDOMNode();
    },
    getAnchorDOMNode: function getAnchorDOMNode() {
        return _reactDom2['default'].findDOMNode((0, _result3['default'])(this, 'props.anchorElement'));
    },
    emitEvent: function emitEvent(eventName) {
        if (this.props[eventName]) {
            for (var _len = arguments.length, eventArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                eventArgs[_key - 1] = arguments[_key];
            }

            this.props[eventName].apply(null, eventArgs);
        }
    },
    open: function open() {
        var _this = this;

        this.setState({ isOpening: true }, function () {
            _this.setState({ isOpening: false, isOpen: true });
        });
    },
    close: function close() {
        var _this2 = this;

        this.setState({ isClosing: true }, function () {
            (0, _event.addEventOnce)(_this2.getTargetDOMNode(), _transition.TransitionProperties.transitionEndEventName, function () {
                _this2.setState({ isOpen: false, isClosing: false });
            });
        });
    },
    attachWindowEvents: function attachWindowEvents() {
        var _this3 = this;

        setTimeout(function () {
            (0, _event.addEvent)(window, 'scroll-throttled', _this3.autoCloseWhenOffScreen);
            (0, _event.addEvent)(window, 'touchstart', _this3.handleClickAway);
            (0, _event.addEvent)(window, 'click', _this3.handleClickAway);
        }, 0);
    },
    detachWindowEvents: function detachWindowEvents() {
        (0, _event.removeEvent)(window, 'scroll-throttled', this.autoCloseWhenOffScreen);
        (0, _event.removeEvent)(window, 'touchstart', this.handleClickAway);
        (0, _event.removeEvent)(window, 'click', this.handleClickAway);
    },
    autoCloseWhenOffScreen: function autoCloseWhenOffScreen() {
        if (this.props.autoCloseWhenOffScreen && !(0, _miscellaneous.isElementInViewport)(this.getAnchorDOMNode())) {
            this.emitEvent('onRequestClose');
        }
    },
    handleClickAway: function handleClickAway(event) {
        var element = this.getTargetDOMNode();

        if (event.target !== element && !(0, _traversing.contains)(element, event.target)) {
            this.emitEvent('onRequestClose');
        }
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render: function render() {
        var shouldMount = this.state.isOpen || this.state.isOpening;

        if (!shouldMount) {
            return null;
        }
        var className = (0, _classnames2['default'])(this.props.className, {
            'tooltip--enter': this.state.isOpen && !this.state.isClosing
        });
        return _react2['default'].createElement(
            _Portal2['default'],
            { ref: 'portal' },
            _react2['default'].createElement(
                _Position2['default'],
                {
                    autoStyle: false,
                    anchorElement: this.props.anchorElement,
                    anchorOffset: this.props.anchorOffset,
                    anchorOrigin: this.props.anchorOrigin,
                    collision: this.props.collision,
                    targetOffset: this.props.targetOffset,
                    targetOrigin: this.props.targetOrigin },
                _react2['default'].createElement(
                    Tooltip,
                    {
                        className: className,
                        showCloseButton: this.props.showCloseButton,
                        onRequestClose: this.props.onRequestClose },
                    this.props.children
                )
            )
        );
    }
});