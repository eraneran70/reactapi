'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _result2 = require('lodash/result');

var _result3 = _interopRequireDefault(_result2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _keys2 = require('lodash/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _assign2 = require('lodash/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _miscellaneous = require('hbc-dom-utilities/lib/miscellaneous');

var DOMMisc = _interopRequireWildcard(_miscellaneous);

var _dimension = require('hbc-dom-utilities/lib/dimension');

var _offset = require('hbc-dom-utilities/lib/offset');

var _ComponentUtils = require('../../utilities/ComponentUtils');

var ComponentUtils = _interopRequireWildcard(_ComponentUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @class Position
 * @augments {React.Component}
 */
/* eslint-disable no-param-reassign */

var Position = _react2['default'].createClass( /** @lends Position.prototype */{

    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'Position',

    /**
     * @property {DOMElement|ReactComponent|Function} propTypes.anchorElement - The element to position against.
     * @property {Object} propTypes.anchorOrigin - Defines which position on the anchor element to align the positioned
     * element against.
     * @property {Boolean} propTypes.autoPosition - If true, the calculation (potentially) ignores `targetOrigin` and
     * `anchorOrigin` to make itself fit on screen, which is useful for mobile devices.
     * @param {ReactElement} propTypes.children - Use this property to set the component to position.
     * @param {Object} collision - When the positioned element overflows the viewport in some direction, move it
     * to an alternative position. Similar to `targetOrigin` and `anchorOrigin`, this accepts an object for
     * horizontal/vertical values.
     * @param {Object} propTypes.targetOrigin - Defines which position on the element being positioned to align with
     * the anchor element
     * @property {DOMElement|ReactComponent|Function} propTypes.withinElement - The element to position within,
     * affecting collision detection.
     */
    propTypes: {
        anchorElement: _react2['default'].PropTypes.oneOfType([ComponentUtils.PropTypes.mountable, _react2['default'].PropTypes.func]),
        anchorOffset: _react2['default'].PropTypes.shape({
            horizontal: _react2['default'].PropTypes.number,
            vertical: _react2['default'].PropTypes.number
        }),
        anchorOrigin: _react2['default'].PropTypes.shape({
            horizontal: _react2['default'].PropTypes.oneOf(['left', 'center', 'right']),
            vertical: _react2['default'].PropTypes.oneOf(['top', 'center', 'bottom'])
        }),
        autoPosition: _react2['default'].PropTypes.bool,
        autoStyle: _react2['default'].PropTypes.bool,
        children: _react2['default'].PropTypes.node,
        collision: _react2['default'].PropTypes.shape({
            horizontal: _react2['default'].PropTypes.oneOf(['fit', 'flip', 'flipfit']),
            vertical: _react2['default'].PropTypes.oneOf(['fit', 'flip', 'flipfit'])
        }),
        targetOffset: _react2['default'].PropTypes.shape({
            horizontal: _react2['default'].PropTypes.number,
            vertical: _react2['default'].PropTypes.number
        }),
        targetOrigin: _react2['default'].PropTypes.shape({
            horizontal: _react2['default'].PropTypes.oneOf(['left', 'center', 'right']),
            vertical: _react2['default'].PropTypes.oneOf(['top', 'center', 'bottom'])
        }),
        withinElement: _react2['default'].PropTypes.oneOfType([ComponentUtils.PropTypes.mountable, _react2['default'].PropTypes.func])
    },

    getDefaultProps: function getDefaultProps() {
        return {
            anchorOffset: { vertical: 0, horizontal: 0 },
            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
            autoPosition: true,
            autoStyle: true,
            collision: { vertical: 'flip', horizontal: 'flip' },
            targetOffset: { vertical: 0, horizontal: 0 },
            targetOrigin: { vertical: 'top', horizontal: 'left' }
        };
    },
    getInitialState: function getInitialState() {
        return {
            position: {
                top: 0,
                left: 0
            },
            feedback: {
                anchor: {
                    element: null,
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0
                },
                target: {
                    element: null,
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0
                },
                horizontal: 'left',
                vertical: 'top',
                important: 'horizontal'
            }
        };
    },
    componentDidMount: function componentDidMount() {
        this.updatePosition();
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.shouldFlush = this.shouldUpdatePosition(this.props, nextProps);
    },
    componentDidUpdate: function componentDidUpdate() {
        if (this.shouldFlush) {
            this.shouldFlush = false;
            this.updatePosition();
        }
    },
    getTargetDOMNode: function getTargetDOMNode() {
        return _reactDom2['default'].findDOMNode(this);
    },
    getAnchorDOMNode: function getAnchorDOMNode() {
        return _reactDom2['default'].findDOMNode((0, _result3['default'])(this, 'props.anchorElement'));
    },
    getWithinDOMNode: function getWithinDOMNode() {
        return _reactDom2['default'].findDOMNode((0, _result3['default'])(this, 'props.withinElement')) || window;
    },
    getAnchorInfo: function getAnchorInfo() {
        var element = this.getAnchorDOMNode();

        if (!element) {
            return undefined;
        }

        var origin = this.props.anchorOrigin;
        var offset = (0, _offset.getOffset)(element);
        var width = (0, _dimension.getOuterWidth)(element);
        var height = (0, _dimension.getOuterHeight)(element);

        return { element: element, width: width, height: height, offset: offset, origin: origin };
    },
    getTargetInfo: function getTargetInfo() {
        var element = this.getTargetDOMNode();

        if (!element) {
            return undefined;
        }

        var origin = this.props.targetOrigin;
        var offset = (0, _offset.getOffset)(element);
        var width = (0, _dimension.getOuterWidth)(element);
        var height = (0, _dimension.getOuterHeight)(element);

        return { element: element, width: width, height: height, offset: offset, origin: origin };
    },
    getWithinInfo: function getWithinInfo() {
        var element = this.getWithinDOMNode();
        var isWindow = DOMMisc.isWindow(element);
        var isDocument = DOMMisc.isDocument(element);
        var hasOffset = !isWindow && !isDocument;
        var offset = hasOffset ? (0, _offset.getOffset)(element) : { left: 0, top: 0 };
        var width = (0, _dimension.getOuterWidth)(element);
        var height = (0, _dimension.getOuterHeight)(element);
        var scrollLeft = (0, _offset.getScrollLeft)(element);
        var scrollTop = (0, _offset.getScrollTop)(element);

        return { element: element, isWindow: isWindow, isDocument: isDocument, offset: offset, width: width, height: height, scrollLeft: scrollLeft, scrollTop: scrollTop };
    },
    shouldUpdatePosition: function shouldUpdatePosition(prevProps, nextProps) {
        return prevProps.targetOrigin.horizontal !== nextProps.anchorOrigin.horizontal || prevProps.targetOrigin.vertical !== nextProps.anchorOrigin.vertical || prevProps.targetOrigin.horizontal !== nextProps.anchorOrigin.horizontal || prevProps.targetOrigin.vertical !== nextProps.anchorOrigin.vertical;
    },
    updatePosition: function updatePosition() {
        var target = this.getTargetInfo();
        var anchor = this.getAnchorInfo();

        if (!anchor || !target) {
            return;
        }

        var within = this.getWithinInfo();
        var position = (0, _assign3['default'])({}, anchor.offset);
        var collision = this.props.collision;
        var offset = {
            left: this.props.anchorOffset.horizontal + this.props.targetOffset.horizontal,
            top: this.props.anchorOffset.vertical + this.props.targetOffset.vertical
        };

        // Compute target element offset based on the provided information
        // without handling overlapping with the within element.

        if (anchor.origin.horizontal === 'right') {
            position.left += anchor.width;
        } else if (anchor.origin.horizontal === 'center') {
            position.left += anchor.width / 2;
        }

        if (anchor.origin.vertical === 'bottom') {
            position.top += anchor.height;
        } else if (anchor.origin.vertical === 'center') {
            position.top += anchor.height / 2;
        }

        if (target.origin.horizontal === 'right') {
            position.left -= target.width;
        } else if (target.origin.horizontal === 'center') {
            position.left -= target.width / 2;
        }

        if (target.origin.vertical === 'bottom') {
            position.top -= target.height;
        } else if (target.origin.vertical === 'center') {
            position.top -= target.height / 2;
        }

        position.left += offset.left;
        position.top += offset.top;

        // Adjust computed offset to ensure target element is visible within
        // the within element when positioned against the anchor element.
        if (this.props.autoPosition) {
            this.autoPositionIfNeeded(collision, anchor, target, within, offset, position);
        }

        // Determine where the anchor element is located in relation to the
        // target element after positioning it.

        var left = anchor.offset.left - position.left;
        var right = left + anchor.width - target.width;
        var top = anchor.offset.top - position.top;
        var bottom = top + anchor.height - target.height;

        var feedback = {
            anchor: {
                element: anchor.element,
                left: anchor.offset.left,
                top: anchor.offset.top,
                width: anchor.width,
                height: anchor.height
            },
            target: {
                element: target.element,
                left: position.left,
                top: position.top,
                width: target.width,
                height: target.height
            }
        };

        if (right < 0) {
            feedback.horizontal = 'left';
        } else if (left > 0) {
            feedback.horizontal = 'right';
        } else {
            feedback.horizontal = 'center';
        }

        if (bottom < 0) {
            feedback.vertical = 'top';
        } else if (top > 0) {
            feedback.vertical = 'bottom';
        } else {
            feedback.vertical = 'middle';
        }

        if (anchor.width < target.width && Math.abs(left + right) < anchor.width) {
            feedback.horizontal = 'center';
        }

        if (anchor.height < target.height && Math.abs(top + bottom) < anchor.height) {
            feedback.vertical = 'middle';
        }

        if (Math.max(Math.abs(left), Math.abs(right)) > Math.max(Math.abs(top), Math.abs(bottom))) {
            feedback.important = 'horizontal';
        } else {
            feedback.important = 'vertical';
        }

        this.setState({ position: position, feedback: feedback });
    },
    autoPositionIfNeeded: function autoPositionIfNeeded(collision, anchor, target, within, offset, position) {
        if (collision.vertical === 'fit') {
            this.updateVerticalPositionUsingFitCollisionStrategy(anchor, target, within, position);
        } else if (collision.vertical === 'flip') {
            this.updateVerticalPositionUsingFlipCollisionStrategy(anchor, target, within, offset, position);
        } else if (collision.vertical === 'flipfit') {
            this.updateVerticalPositionUsingFlipCollisionStrategy(anchor, target, within, offset, position);
            this.updateVerticalPositionUsingFitCollisionStrategy(anchor, target, within, position);
        }

        if (collision.horizontal === 'fit') {
            this.updateHorizontalPositionUsingFitCollisionStrategy(anchor, target, within, position);
        } else if (collision.horizontal === 'flip') {
            this.updateHorizontalPositionUsingFlipCollisionStrategy(anchor, target, within, offset, position);
        } else if (collision.horizontal === 'flipfit') {
            this.updateHorizontalPositionUsingFlipCollisionStrategy(anchor, target, within, offset, position);
            this.updateHorizontalPositionUsingFitCollisionStrategy(anchor, target, within, position);
        }
    },
    updateHorizontalPositionUsingFitCollisionStrategy: function updateHorizontalPositionUsingFitCollisionStrategy(anchor, target, within, position) {
        var withinOffsetLeft = within.isWindow ? within.scrollLeft : within.offset.left;
        var targetOverOffsetLeft = withinOffsetLeft - position.left;
        var targetOverOffsetRight = position.left + target.width - within.width - withinOffsetLeft;

        // The target element is wider than within.
        // It cannot be aligned to fit, will ensure target element is flushed
        // against within element.
        if (target.width > within.width) {
            // The target element is initially over the left side of within element.
            // Align target element with right side of within element.
            if (targetOverOffsetLeft > 0 && targetOverOffsetRight <= 0) {
                position.left += targetOverOffsetRight;

                // The target element is initially over right side of within element.
                // Align target element with left side of within element.
            } else if (targetOverOffsetRight > 0 && targetOverOffsetLeft <= 0) {
                position.left = withinOffsetLeft;

                // The target element is initially over both left and right sides of within element.
                // Align target element with right side of within element.
            } else if (targetOverOffsetLeft > targetOverOffsetRight) {
                position.left = withinOffsetLeft + within.width - target.width;

                // The target element is initially over both left and right side of within element.
                // Align target element with left side of within element.
            } else {
                position.left = withinOffsetLeft;
            }

            // The target element is too far left from the offset container. Align
            // with left of offset container.
        } else if (targetOverOffsetLeft > 0) {
            position.left += targetOverOffsetLeft;

            // The target element is too far right the offset container. Align with
            // right of offset container.
        } else if (targetOverOffsetRight > 0) {
            position.left -= targetOverOffsetRight;
        }
    },
    updateVerticalPositionUsingFitCollisionStrategy: function updateVerticalPositionUsingFitCollisionStrategy(anchor, target, within, position) {
        var withinOffsetTop = within.isWindow ? within.scrollTop : within.offset.top;
        var targetOverOffsetTop = withinOffsetTop - position.top;
        var targetOverOffsetBottom = position.top + target.height - within.height - withinOffsetTop;

        // The target element is taller than its offset container.
        // It cannot be aligned to fit, will ensure target element is flushed
        // against within element.
        if (target.height > within.height) {
            // The target element is initially over the top of within element.
            // Align target element with bottom side of within element.
            if (targetOverOffsetTop > 0 && targetOverOffsetBottom <= 0) {
                position.top += targetOverOffsetBottom;

                // The target element is initially over bottom of within element.
                // Align target element with top side of within element.
            } else if (targetOverOffsetBottom > 0 && targetOverOffsetTop <= 0) {
                position.top = withinOffsetTop;

                // The target element is initially over both top and bottom of within element.
                // Align target element with bottom side of within element.
            } else if (targetOverOffsetTop > targetOverOffsetBottom) {
                position.top = withinOffsetTop + within.height - target.height;

                // The target element is initially over both top and bottom of within element.
                // Align target element with top side of within element.
            } else {
                position.top = withinOffsetTop;
            }

            // The target element is too far up from its offset container. Align
            // with top of offset container.
        } else if (targetOverOffsetTop > 0) {
            position.top += targetOverOffsetTop;

            // The target element is too far down from its offset container. Align
            // with bottom of offset container.
        } else if (targetOverOffsetBottom > 0) {
            position.top -= targetOverOffsetBottom;
        }
    },
    updateHorizontalPositionUsingFlipCollisionStrategy: function updateHorizontalPositionUsingFlipCollisionStrategy(anchor, target, within, offset, position) {
        var withinOffsetLeft = within.isWindow ? within.scrollLeft : within.offset.left;
        var targetOverOffsetLeft = position.left - withinOffsetLeft;
        var targetOverOffsetRight = position.left + target.width - within.width - withinOffsetLeft;
        var positionOffset = -2 * offset.left;

        var targetOffset = void 0,
            anchorOffset = void 0;

        if (target.origin.horizontal === 'left') {
            targetOffset = -target.width;
        } else if (target.origin.horizontal === 'right') {
            targetOffset = target.width;
        } else {
            targetOffset = 0;
        }

        if (anchor.origin.horizontal === 'left') {
            anchorOffset = anchor.width;
        } else if (anchor.origin.horizontal === 'right') {
            anchorOffset = -anchor.width;
        } else {
            anchorOffset = 0;
        }

        if (targetOverOffsetLeft < 0) {
            var newOverRight = position.left + targetOffset + anchorOffset + positionOffset + target.width - within.width - withinOffsetLeft;

            if (newOverRight < 0 || newOverRight < Math.abs(targetOverOffsetLeft)) {
                position.left += targetOffset + anchorOffset + positionOffset;
            }
        } else if (targetOverOffsetRight > 0) {
            var newOverLeft = position.left + targetOffset + anchorOffset + positionOffset - withinOffsetLeft;

            if (newOverLeft > 0 || Math.abs(newOverLeft) < targetOverOffsetRight) {
                position.left += targetOffset + anchorOffset + positionOffset;
            }
        }
    },
    updateVerticalPositionUsingFlipCollisionStrategy: function updateVerticalPositionUsingFlipCollisionStrategy(anchor, target, within, offset, position) {
        var withinOffsetTop = within.isWindow ? within.scrollTop : within.offset.top;
        var targetOverOffsetTop = position.top - withinOffsetTop;
        var targetOverOffsetBottom = position.top + target.height - within.height - withinOffsetTop;
        var positionOffset = -2 * offset.top;

        var targetOffset = void 0,
            anchorOffset = void 0;

        if (target.origin.vertical === 'top') {
            targetOffset = -target.height;
        } else if (target.origin.vertical === 'bottom') {
            targetOffset = target.height;
        } else {
            targetOffset = 0;
        }

        if (anchor.origin.vertical === 'top') {
            anchorOffset = anchor.height;
        } else if (anchor.origin.vertical === 'bottom') {
            anchorOffset = -anchor.height;
        } else {
            anchorOffset = 0;
        }

        if (targetOverOffsetTop < 0) {
            var newOverBottom = position.top + targetOffset + anchorOffset + positionOffset + target.height - within.height - withinOffsetTop;

            if (newOverBottom < 0 || newOverBottom < Math.abs(targetOverOffsetTop)) {
                position.top += targetOffset + anchorOffset + positionOffset;
            }
        } else if (targetOverOffsetBottom > 0) {
            var newOverTop = position.top + targetOffset + anchorOffset + positionOffset - withinOffsetTop;

            if (newOverTop > 0 || Math.abs(newOverTop) < targetOverOffsetBottom) {
                position.top += targetOffset + anchorOffset + positionOffset;
            }
        }
    },
    render: function render() {
        var children = this.props.children ? _react2['default'].Children.only(this.props.children) : null;

        if (!children) {
            return null;
        }

        var props = (0, _omit3['default'])(this.props, (0, _keys3['default'])(Position.propTypes));

        props.feedback = this.state.feedback;
        props.position = this.state.position;

        if (this.props.autoStyle) {
            props.style = {
                left: props.position.left,
                top: props.position.top
            };
        }

        return _react2['default'].cloneElement(children, props);
    }
});

exports['default'] = Position;