'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _result2 = require('lodash/result');

var _result3 = _interopRequireDefault(_result2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ComponentUtils = require('../../utilities/ComponentUtils');

var ComponentUtils = _interopRequireWildcard(_ComponentUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getOwnerDocument(element) {
    return element && element.ownerDocument || document;
}

/**
 * @class Portal
 * @augments {React.Component}
 */
var Portal = _react2['default'].createClass( /** @lends Portal.prototype */{

    displayName: 'Portal',

    /**
     * @property {ReactElement|DOMElement|Function} container - A Node,
     * Component instance, or function that returns either. The `container` will
     * have the `Portal` children appended to it.
     */
    propTypes: {
        children: _react2['default'].PropTypes.node,
        container: _react2['default'].PropTypes.oneOfType([ComponentUtils.PropTypes.mountable, _react2['default'].PropTypes.func])
    },

    componentDidMount: function componentDidMount() {
        this.isMounted = true;
        this.renderOverlay();
    },
    componentDidUpdate: function componentDidUpdate() {
        this.renderOverlay();
    },
    componentWillUnmount: function componentWillUnmount() {
        this.unrenderOverlay();
        this.unmountOverlayTarget();
        this.isMounted = false;
    },
    getMountDOMNode: function getMountDOMNode() {
        return this.overlayTarget;
    },
    getOverlayDOMNode: function getOverlayDOMNode() {
        if (!this.isMounted) {
            if (process.env.NODE_ENV !== 'production') {
                (0, _invariant2['default'])(false, 'Portal.getOverlayDOMNode(): A component must be mounted to have a DOM node.');
            } else {
                (0, _invariant2['default'])(false);
            }
        }

        if (this.overlayInstance) {
            return _reactDom2['default'].findDOMNode(this.overlayInstance);
        }

        return null;
    },
    getContainerDOMNode: function getContainerDOMNode() {
        return _reactDom2['default'].findDOMNode((0, _result3['default'])(this, 'props.container')) || getOwnerDocument(_reactDom2['default'].findDOMNode(this)).body;
    },
    unmountOverlayTarget: function unmountOverlayTarget() {
        if (this.overlayTarget) {
            this.getContainerDOMNode().removeChild(this.overlayTarget);
            this.overlayTarget = null;
        }
    },
    mountOverlayTarget: function mountOverlayTarget() {
        if (!this.overlayTarget) {
            this.overlayTarget = document.createElement('div');
            this.getContainerDOMNode().appendChild(this.overlayTarget);
        }
    },
    unrenderOverlay: function unrenderOverlay() {
        if (this.overlayTarget) {
            _reactDom2['default'].unmountComponentAtNode(this.overlayTarget);
            this.overlayInstance = null;
        }
    },


    // By calling this method in componentDidMount() and componentDidUpdate(),
    // you're effectively creating a "wormhole" that funnels React's
    // hierarchical updates through to a DOM node on an entirely different part
    // of the page.
    renderOverlay: function renderOverlay() {
        var overlay = this.props.children ? _react2['default'].Children.only(this.props.children) : null;

        if (overlay !== null) {
            this.mountOverlayTarget();
            this.overlayInstance = _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, overlay, this.overlayTarget);
        } else {
            this.unrenderOverlay();
            this.unmountOverlayTarget();
        }
    },
    render: function render() {
        return null;
    }
});

exports['default'] = Portal;