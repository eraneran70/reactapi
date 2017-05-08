'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _debounce2 = require('lodash/debounce');

var _debounce3 = _interopRequireDefault(_debounce2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _traversing = require('hbc-dom-utilities/lib/traversing');

var _miscellaneous = require('hbc-dom-utilities/lib/miscellaneous');

var _event = require('hbc-dom-utilities/lib/event');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * LazyLoad class.
 * @class LazyLoad
 * @augments React.Component
 */
var LazyLoad = _react2['default'].createClass( /** @lends LazyLoad.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'LazyLoad',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        children: _react2['default'].PropTypes.node,
        offset: _react2['default'].PropTypes.number,
        once: _react2['default'].PropTypes.bool,
        resize: _react2['default'].PropTypes.bool,
        scroll: _react2['default'].PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
        return {
            offset: 0,
            once: false,
            resize: false,
            scroll: true
        };
    },
    getInitialState: function getInitialState() {
        return { isVisible: false };
    },
    componentDidMount: function componentDidMount() {
        this.checkVisibleDebounced = (0, _debounce3['default'])(this.checkVisible, 350);
        this.attachEvents();
        this.checkVisible();
    },
    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
        if (this.state.isVisible && nextState.isVisible && this.isFirstTimeVisible) {
            this.isFirstTimeVisible = false;
        }
    },
    componentWillUnmount: function componentWillUnmount() {
        this.detachEvents();
        this.checkVisibleDebounced = null;
    },
    getEventDOMNode: function getEventDOMNode() {
        return (0, _traversing.getScrollParent)(_reactDom2['default'].findDOMNode(this));
    },
    attachEvents: function attachEvents() {
        if (this.props.scroll) {
            (0, _event.addEvent)(this.getEventDOMNode(), 'scroll', this.checkVisibleDebounced);
        }

        if (this.props.resize) {
            (0, _event.addEvent)(window, 'resize', this.checkVisibleDebounced);
        }
    },
    detachEvents: function detachEvents() {
        (0, _event.removeEvent)(this.getEventDOMNode(), 'resize', this.checkVisibleDebounced);
        (0, _event.removeEvent)(window, 'scroll', this.checkVisibleDebounced);
    },
    checkVisible: function checkVisible() {
        var isVisible = (0, _miscellaneous.isScrolledIntoView)(_reactDom2['default'].findDOMNode(this), this.getEventDOMNode(), this.props.offset);

        if (isVisible) {
            // Avoid extra render if previously is visible.
            if (!this.state.isVisible) {
                this.isFirstTimeVisible = this.isFirstTimeVisible === undefined;
                this.setState({ isVisible: true });
            }

            if (this.props.once) {
                this.detachEvents();
            }
        } else if (this.state.isVisible) {
            if (this.isFirstTimeVisible === undefined) {
                this.isFirstTimeVisible = false;
            }

            this.setState({ isVisible: false });
        }
    },


    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render: function render() {
        return _react2['default'].cloneElement(this.props.children, {
            isFirstTimeVisible: this.isFirstTimeVisible,
            isLazyLoaded: true,
            isVisible: this.state.isVisible
        });
    }
});

exports['default'] = LazyLoad;