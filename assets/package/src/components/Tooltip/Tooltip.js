import React from 'react';
import ReactDOM from 'react-dom';
import Portal from '../Portal/Portal';
import Position from '../Position/Position';
import Icon from '../Icon/Icon';
import classnames from 'classnames';
import { assign, result } from 'lodash';
import { addEvent, addEventOnce, removeEvent } from 'hbc-dom-utilities/lib/event';
import { contains } from 'hbc-dom-utilities/lib/traversing';
import { isElementInViewport } from 'hbc-dom-utilities/lib/miscellaneous';
import { TransitionProperties } from 'hbc-dom-utilities/lib/transition';

import './Tooltip.scss';

function Tooltip(props) {
    const position = props.position;
    const feedback = props.feedback;

    const classes = classnames(
        'tooltip',
        `tooltip--${feedback.important}`,
        `tooltip--${feedback.vertical}`,
        `tooltip--${feedback.horizontal}`,
        props.className
    );

    const style = {
        top: position.top,
        left: position.left
    };

    function maybeRenderCloseIcon() {
        if (!props.showCloseButton) {
            return null;
        }
        return (
            <Icon name="cross"
                onClick={props.onRequestClose}
                className="tooltip--close-icon" />
        );
    }

    function handleClick(event) {
        event.stopPropagation();
    }

    return (
        <div className={classes} style={style} onClick={handleClick}>
            {maybeRenderCloseIcon()}
            <div className="tooltip--content">
                {props.children}
            </div>
        </div>
    );
}

Tooltip.propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    feedback: React.PropTypes.object,
    onRequestClose: React.PropTypes.func,
    position: React.PropTypes.object,
    showCloseButton: React.PropTypes.bool
};

/**
 * Tooltip class.
 * @class Tooltip
 * @augments React.Component
 */
export default React.createClass(/** @lends Tooltip.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'Tooltip',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: assign({}, Position.propTypes, {
        autoCloseWhenOffScreen: React.PropTypes.bool,
        className: React.PropTypes.string,
        isOpen: React.PropTypes.bool,
        showCloseButton: React.PropTypes.bool
    }),

    getDefaultProps() {
        return {
            isOpen: false,
            autoCloseWhenOffScreen: true,
            collision: { horizontal: 'flipfit', vertical: 'flip' },
            showCloseButton: false
        };
    },

    getInitialState() {
        return {
            isOpen: false,
            isOpening: false,
            isClosing: false
        };
    },

    componentDidMount() {
        if (this.props.isOpen) {
            this.open();
            this.attachWindowEvents();
        }
    },

    componentWillReceiveProps(nextProps) {
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

    componentWillUnmount() {
        this.detachWindowEvents();
    },

    getTargetDOMNode() {
        return this.refs.portal.getOverlayDOMNode();
    },

    getAnchorDOMNode() {
        return ReactDOM.findDOMNode(result(this, 'props.anchorElement'));
    },

    emitEvent(eventName, ...eventArgs) {
        if (this.props[eventName]) {
            this.props[eventName].apply(null, eventArgs);
        }
    },

    open() {
        this.setState({ isOpening: true }, () => {
            this.setState({ isOpening: false, isOpen: true });
        });
    },

    close() {
        this.setState({ isClosing: true }, () => {
            addEventOnce(this.getTargetDOMNode(), TransitionProperties.transitionEndEventName, () => {
                this.setState({ isOpen: false, isClosing: false });
            });
        });
    },

    attachWindowEvents() {
        setTimeout(() => {
            addEvent(window, 'scroll-throttled', this.autoCloseWhenOffScreen);
            addEvent(window, 'touchstart', this.handleClickAway);
            addEvent(window, 'click', this.handleClickAway);
        }, 0);
    },

    detachWindowEvents() {
        removeEvent(window, 'scroll-throttled', this.autoCloseWhenOffScreen);
        removeEvent(window, 'touchstart', this.handleClickAway);
        removeEvent(window, 'click', this.handleClickAway);
    },

    autoCloseWhenOffScreen() {
        if (this.props.autoCloseWhenOffScreen && !isElementInViewport(this.getAnchorDOMNode())) {
            this.emitEvent('onRequestClose');
        }
    },

    handleClickAway(event) {
        const element = this.getTargetDOMNode();

        if (event.target !== element && !contains(element, event.target)) {
            this.emitEvent('onRequestClose');
        }
    },
    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        const shouldMount = this.state.isOpen || this.state.isOpening;

        if (!shouldMount) {
            return null;
        }
        const className = classnames(this.props.className, {
            'tooltip--enter': this.state.isOpen && !this.state.isClosing
        });
        return (
            <Portal ref={'portal'}>
                <Position
                    autoStyle={false}
                    anchorElement={this.props.anchorElement}
                    anchorOffset={this.props.anchorOffset}
                    anchorOrigin={this.props.anchorOrigin}
                    collision={this.props.collision}
                    targetOffset={this.props.targetOffset}
                    targetOrigin={this.props.targetOrigin}>
                    <Tooltip
                        className={className}
                        showCloseButton={this.props.showCloseButton}
                        onRequestClose={this.props.onRequestClose}>
                        {this.props.children}
                    </Tooltip>
                </Position>
            </Portal>
        );
    }
});
