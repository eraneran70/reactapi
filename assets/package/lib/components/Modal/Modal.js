'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defer2 = require('lodash/defer');

var _defer3 = _interopRequireDefault(_defer2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _event = require('hbc-dom-utilities/lib/event');

var _manipulation = require('hbc-dom-utilities/lib/manipulation');

var _traversing = require('hbc-dom-utilities/lib/traversing');

var _transition = require('hbc-dom-utilities/lib/transition');

var _touch = require('hbc-dom-utilities/lib/touch');

var _hbcBrowserConstants = require('hbc-browser-constants');

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Portal = require('../Portal/Portal');

var _Portal2 = _interopRequireDefault(_Portal);

require('./Modal.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * A {@link Modal} component renders an overlay that is a child to the parent
 * window and usurps the parent's control.
 * @class Modal
 */
var Modal = _react2['default'].createClass( /** @lends Modal.prototype */{

    displayName: 'Modal',

    propTypes: {
        children: _react.PropTypes.node,
        className: _react.PropTypes.string,
        closeLabel: _react.PropTypes.string,
        closeOnClickAway: _react.PropTypes.bool,
        isDismissible: _react.PropTypes.bool,
        isOpen: _react.PropTypes.bool,
        onRequestClose: _react.PropTypes.func.isRequired,
        width: _react.PropTypes.oneOf(['default', 'full'])
    },

    getDefaultProps: function getDefaultProps() {
        return {
            closeLabel: 'Close',
            closeOnClickAway: true,
            isDismissible: true,
            isOpen: false,
            width: 'default'
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
        this._isMounted = true;

        if (this.props.isOpen) {
            this.open();
        }
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen !== this.state.isOpen) {
            if (nextProps.isOpen) {
                this.open();
            } else {
                this.close();
            }
        }
    },
    componentWillUnmount: function componentWillUnmount() {
        this._isMounted = false;
        this.detachWindowEvents();
    },
    getTargetDOMNode: function getTargetDOMNode() {
        return this.refs.portal.getOverlayDOMNode();
    },
    handleKeyUp: function handleKeyUp(event) {
        if (event.keyCode === _hbcBrowserConstants.KeyCodes.ESCAPE) {
            this.props.onRequestClose();
        }
    },
    open: function open() {
        var _this = this;

        (0, _manipulation.addClass)(document.body, 'stop-scroll');

        this.setState({ isOpening: true }, function () {
            (0, _defer3['default'])(function () {
                return _this.handleIsOpen();
            });
        });
    },
    handleIsOpen: function handleIsOpen() {
        var _this2 = this;

        // need to check that component hasn't unmounted yet
        if (this._isMounted) {
            this.setState({ isOpening: false, isOpen: true }, function () {
                _this2.attachWindowEvents();
            });
        }
    },
    close: function close() {
        var _this3 = this;

        (0, _manipulation.removeClass)(document.body, 'stop-scroll');

        this.setState({ isClosing: true }, function () {
            (0, _event.addEventOnce)(_this3.getTargetDOMNode(), _transition.TransitionProperties.transitionEndEventName, function () {
                return _this3.handleIsClosed();
            });
        });
    },
    handleIsClosed: function handleIsClosed() {
        var _this4 = this;

        // need to check that component hasn't unmounted yet
        if (this._isMounted) {
            this.setState({ isOpen: false, isClosing: false }, function () {
                _this4.detachWindowEvents();
            });
        }
    },
    attachWindowEvents: function attachWindowEvents() {
        if (this.props.isDismissible) {
            (0, _event.addEvent)(document, 'keyup', this.handleKeyUp);
        }

        if (this.props.closeOnClickAway) {
            (0, _event.addEvent)(window, 'click', this.handleClickAway);
        }

        // trigger an event to tell other components that modal is open
        (0, _event.triggerEvent)(window, 'modalOpen', event);
    },
    detachWindowEvents: function detachWindowEvents() {
        if (this.props.isDismissible) {
            (0, _event.removeEvent)(document, 'keyup', this.handleKeyUp);
        }

        if (this.props.closeOnClickAway) {
            (0, _event.removeEvent)(window, 'click', this.handleClickAway);
        }

        // trigger an event to tell other components that modal is closed
        (0, _event.triggerEvent)(window, 'modalClose', event);
    },
    handleClickAway: function handleClickAway(event) {
        var element = this.getTargetDOMNode();

        if (!(0, _traversing.contains)(element, event.target)) {
            this.props.onRequestClose();
        }
    },
    maybeRenderCloseButton: function maybeRenderCloseButton() {
        var classes = (0, _classnames2['default'])({
            'hbc-modal__close-button': true,
            'hbc-modal__close-button--full-width': this.props.width === 'full'
        });

        var props = {
            ref: 'closeButton',
            key: 'close-button',
            className: classes,
            icon: 'cross',
            standalone: true,
            onClick: this.props.onRequestClose,
            preventDefault: true
        };

        if (this.props.isDismissible) {
            return _react2['default'].createElement(
                _Button2['default'],
                props,
                this.props.closeLabel
            );
        }
        return null;
    },
    maybeRenderDialog: function maybeRenderDialog() {
        var classNames = (0, _classnames2['default'])({
            'hbc-modal__dialog': true,
            'hbc-modal__dialog--full-width': this.props.width === 'full'
        });

        return _react2['default'].createElement(
            'div',
            { key: 'hbc-modal-dialog', className: classNames, ref: 'modalDialog' },
            _react2['default'].createElement(
                'div',
                { className: 'hbc-modal__content' },
                this.props.children
            )
        );
    },
    render: function render() {
        var shouldMount = this.state.isOpen || this.state.isOpening;

        if (!shouldMount) {
            return null;
        }

        var className = (0, _classnames2['default'])(this.props.className, {
            'hbc-modal': true,
            'hbc-modal--enter': this.state.isOpen && !this.state.isClosing
        });

        return _react2['default'].createElement(
            _Portal2['default'],
            { ref: 'portal' },
            _react2['default'].createElement(
                'div',
                {
                    className: className,
                    onTouchStart: _touch.removeIOSRubberEffect.bind(null, 'modal'),
                    onTouchMove: _touch.onTouchMove.bind(null, 'modal') },
                this.maybeRenderCloseButton(),
                this.maybeRenderDialog()
            )
        );
    }
}); /* eslint-disable react/jsx-no-bind */

exports['default'] = Modal;