/* eslint-disable no-param-reassign */

import React from 'react';
import ReactDOM from 'react-dom';
import { assign, keys, omit, result } from 'lodash';
import * as DOMMisc from 'hbc-dom-utilities/lib/miscellaneous';
import { getOuterWidth, getOuterHeight } from 'hbc-dom-utilities/lib/dimension';
import { getOffset, getScrollLeft, getScrollTop } from 'hbc-dom-utilities/lib/offset';
import * as ComponentUtils from '../../utilities/ComponentUtils';

/**
 * @class Position
 * @augments {React.Component}
 */
const Position = React.createClass(/** @lends Position.prototype */{

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
        anchorElement: React.PropTypes.oneOfType([ComponentUtils.PropTypes.mountable, React.PropTypes.func]),
        anchorOffset: React.PropTypes.shape({
            horizontal: React.PropTypes.number,
            vertical: React.PropTypes.number
        }),
        anchorOrigin: React.PropTypes.shape({
            horizontal: React.PropTypes.oneOf(['left', 'center', 'right']),
            vertical: React.PropTypes.oneOf(['top', 'center', 'bottom'])
        }),
        autoPosition: React.PropTypes.bool,
        autoStyle: React.PropTypes.bool,
        children: React.PropTypes.node,
        collision: React.PropTypes.shape({
            horizontal: React.PropTypes.oneOf(['fit', 'flip', 'flipfit']),
            vertical: React.PropTypes.oneOf(['fit', 'flip', 'flipfit'])
        }),
        targetOffset: React.PropTypes.shape({
            horizontal: React.PropTypes.number,
            vertical: React.PropTypes.number
        }),
        targetOrigin: React.PropTypes.shape({
            horizontal: React.PropTypes.oneOf(['left', 'center', 'right']),
            vertical: React.PropTypes.oneOf(['top', 'center', 'bottom'])
        }),
        withinElement: React.PropTypes.oneOfType([ComponentUtils.PropTypes.mountable, React.PropTypes.func])
    },

    getDefaultProps() {
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

    getInitialState() {
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

    componentDidMount() {
        this.updatePosition();
    },

    componentWillReceiveProps(nextProps) {
        this.shouldFlush = this.shouldUpdatePosition(this.props, nextProps);
    },

    componentDidUpdate() {
        if (this.shouldFlush) {
            this.shouldFlush = false;
            this.updatePosition();
        }
    },

    getTargetDOMNode() {
        return ReactDOM.findDOMNode(this);
    },

    getAnchorDOMNode() {
        return ReactDOM.findDOMNode(result(this, 'props.anchorElement'));
    },

    getWithinDOMNode() {
        return ReactDOM.findDOMNode(result(this, 'props.withinElement')) || window;
    },

    getAnchorInfo() {
        const element = this.getAnchorDOMNode();

        if (!element) {
            return undefined;
        }

        const origin = this.props.anchorOrigin;
        const offset = getOffset(element);
        const width = getOuterWidth(element);
        const height = getOuterHeight(element);

        return { element, width, height, offset, origin };
    },

    getTargetInfo() {
        const element = this.getTargetDOMNode();

        if (!element) {
            return undefined;
        }

        const origin = this.props.targetOrigin;
        const offset = getOffset(element);
        const width = getOuterWidth(element);
        const height = getOuterHeight(element);

        return { element, width, height, offset, origin };
    },

    getWithinInfo() {
        const element = this.getWithinDOMNode();
        const isWindow = DOMMisc.isWindow(element);
        const isDocument = DOMMisc.isDocument(element);
        const hasOffset = !isWindow && !isDocument;
        const offset = hasOffset ? getOffset(element) : { left: 0, top: 0 };
        const width = getOuterWidth(element);
        const height = getOuterHeight(element);
        const scrollLeft = getScrollLeft(element);
        const scrollTop = getScrollTop(element);

        return { element, isWindow, isDocument, offset, width, height, scrollLeft, scrollTop };
    },

    shouldUpdatePosition(prevProps, nextProps) {
        return prevProps.targetOrigin.horizontal !== nextProps.anchorOrigin.horizontal ||
            prevProps.targetOrigin.vertical !== nextProps.anchorOrigin.vertical ||
            prevProps.targetOrigin.horizontal !== nextProps.anchorOrigin.horizontal ||
            prevProps.targetOrigin.vertical !== nextProps.anchorOrigin.vertical;
    },

    updatePosition() {
        const target = this.getTargetInfo();
        const anchor = this.getAnchorInfo();

        if (!anchor || !target) {
            return;
        }

        const within = this.getWithinInfo();
        const position = assign({}, anchor.offset);
        const collision = this.props.collision;
        const offset = {
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

        const left = anchor.offset.left - position.left;
        const right = left + anchor.width - target.width;
        const top = anchor.offset.top - position.top;
        const bottom = top + anchor.height - target.height;

        const feedback = {
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

        this.setState({ position, feedback });
    },

    autoPositionIfNeeded(collision, anchor, target, within, offset, position) {
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

    updateHorizontalPositionUsingFitCollisionStrategy(anchor, target, within, position) {
        const withinOffsetLeft = within.isWindow ? within.scrollLeft : within.offset.left;
        const targetOverOffsetLeft = withinOffsetLeft - position.left;
        const targetOverOffsetRight = position.left + target.width - within.width - withinOffsetLeft;

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

    updateVerticalPositionUsingFitCollisionStrategy(anchor, target, within, position) {
        const withinOffsetTop = within.isWindow ? within.scrollTop : within.offset.top;
        const targetOverOffsetTop = withinOffsetTop - position.top;
        const targetOverOffsetBottom = position.top + target.height - within.height - withinOffsetTop;

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

    updateHorizontalPositionUsingFlipCollisionStrategy(anchor, target, within, offset, position) {
        const withinOffsetLeft = within.isWindow ? within.scrollLeft : within.offset.left;
        const targetOverOffsetLeft = position.left - withinOffsetLeft;
        const targetOverOffsetRight = position.left + target.width - within.width - withinOffsetLeft;
        const positionOffset = -2 * offset.left;

        let targetOffset, anchorOffset;

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
            const newOverRight = position.left + targetOffset + anchorOffset + positionOffset +
                target.width - within.width - withinOffsetLeft;

            if (newOverRight < 0 || newOverRight < Math.abs(targetOverOffsetLeft)) {
                position.left += targetOffset + anchorOffset + positionOffset;
            }
        } else if (targetOverOffsetRight > 0) {
            const newOverLeft = position.left + targetOffset + anchorOffset + positionOffset - withinOffsetLeft;

            if (newOverLeft > 0 || Math.abs(newOverLeft) < targetOverOffsetRight) {
                position.left += targetOffset + anchorOffset + positionOffset;
            }
        }
    },

    updateVerticalPositionUsingFlipCollisionStrategy(anchor, target, within, offset, position) {
        const withinOffsetTop = within.isWindow ? within.scrollTop : within.offset.top;
        const targetOverOffsetTop = position.top - withinOffsetTop;
        const targetOverOffsetBottom = position.top + target.height - within.height - withinOffsetTop;
        const positionOffset = -2 * offset.top;

        let targetOffset, anchorOffset;

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
            const newOverBottom = position.top + targetOffset + anchorOffset + positionOffset + target.height -
                within.height - withinOffsetTop;

            if (newOverBottom < 0 || newOverBottom < Math.abs(targetOverOffsetTop)) {
                position.top += targetOffset + anchorOffset + positionOffset;
            }
        } else if (targetOverOffsetBottom > 0) {
            const newOverTop = position.top + targetOffset + anchorOffset + positionOffset - withinOffsetTop;

            if (newOverTop > 0 || Math.abs(newOverTop) < targetOverOffsetBottom) {
                position.top += targetOffset + anchorOffset + positionOffset;
            }
        }
    },

    render() {
        const children = this.props.children ? React.Children.only(this.props.children) : null;

        if (!children) {
            return null;
        }

        const props = omit(this.props, keys(Position.propTypes));

        props.feedback = this.state.feedback;
        props.position = this.state.position;

        if (this.props.autoStyle) {
            props.style = {
                left: props.position.left,
                top: props.position.top
            };
        }

        return React.cloneElement(children, props);
    }
});

export default Position;
