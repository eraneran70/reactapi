/* eslint-disable react/jsx-no-bind */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import { defer } from 'lodash';
import { addEvent, addEventOnce, removeEvent, triggerEvent } from 'hbc-dom-utilities/lib/event';
import { addClass, removeClass } from 'hbc-dom-utilities/lib/manipulation';
import { contains } from 'hbc-dom-utilities/lib/traversing';
import { TransitionProperties } from 'hbc-dom-utilities/lib/transition';
import { onTouchMove, removeIOSRubberEffect } from 'hbc-dom-utilities/lib/touch';
import { KeyCodes } from 'hbc-browser-constants';
import Button from '../Button/Button';
import Portal from '../Portal/Portal';

import './Modal.scss';

/**
 * A {@link Modal} component renders an overlay that is a child to the parent
 * window and usurps the parent's control.
 * @class Modal
 */
const Modal = React.createClass(/** @lends Modal.prototype */{

    displayName: 'Modal',

    propTypes: {
        children: PropTypes.node,
        className: PropTypes.string,
        closeLabel: PropTypes.string,
        closeOnClickAway: PropTypes.bool,
        isDismissible: PropTypes.bool,
        isOpen: PropTypes.bool,
        onRequestClose: PropTypes.func.isRequired,
        width: PropTypes.oneOf(['default', 'full'])
    },

    getDefaultProps() {
        return {
            closeLabel: 'Close',
            closeOnClickAway: true,
            isDismissible: true,
            isOpen: false,
            width: 'default'
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
        this._isMounted = true;

        if (this.props.isOpen) {
            this.open();
        }
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen !== this.state.isOpen) {
            if (nextProps.isOpen) {
                this.open();
            } else {
                this.close();
            }
        }
    },

    componentWillUnmount() {
        this._isMounted = false;
        this.detachWindowEvents();
    },

    getTargetDOMNode() {
        return this.refs.portal.getOverlayDOMNode();
    },

    handleKeyUp(event) {
        if (event.keyCode === KeyCodes.ESCAPE) {
            this.props.onRequestClose();
        }
    },

    open() {
        addClass(document.body, 'stop-scroll');

        this.setState({ isOpening: true }, () => {
            defer(() => this.handleIsOpen());
        });
    },

    handleIsOpen() {
        // need to check that component hasn't unmounted yet
        if (this._isMounted) {
            this.setState({ isOpening: false, isOpen: true }, () => {
                this.attachWindowEvents();
            });
        }
    },

    close() {
        removeClass(document.body, 'stop-scroll');

        this.setState({ isClosing: true }, () => {
            addEventOnce(this.getTargetDOMNode(), TransitionProperties.transitionEndEventName, () =>
                this.handleIsClosed());
        });
    },

    handleIsClosed() {
        // need to check that component hasn't unmounted yet
        if (this._isMounted) {
            this.setState({ isOpen: false, isClosing: false }, () => {
                this.detachWindowEvents();
            });
        }
    },

    attachWindowEvents() {
        if (this.props.isDismissible) {
            addEvent(document, 'keyup', this.handleKeyUp);
        }

        if (this.props.closeOnClickAway) {
            addEvent(window, 'click', this.handleClickAway);
        }

        // trigger an event to tell other components that modal is open
        triggerEvent(window, 'modalOpen', event);
    },

    detachWindowEvents() {
        if (this.props.isDismissible) {
            removeEvent(document, 'keyup', this.handleKeyUp);
        }

        if (this.props.closeOnClickAway) {
            removeEvent(window, 'click', this.handleClickAway);
        }

        // trigger an event to tell other components that modal is closed
        triggerEvent(window, 'modalClose', event);
    },

    handleClickAway(event) {
        const element = this.getTargetDOMNode();

        if (!contains(element, event.target)) {
            this.props.onRequestClose();
        }
    },

    maybeRenderCloseButton() {
        const classes = cx({
            'hbc-modal__close-button': true,
            'hbc-modal__close-button--full-width': this.props.width === 'full'
        });

        const props = {
            ref: 'closeButton',
            key: 'close-button',
            className: classes,
            icon: 'cross',
            standalone: true,
            onClick: this.props.onRequestClose,
            preventDefault: true
        };

        if (this.props.isDismissible) {
            return (
                <Button {...props}>
                    {this.props.closeLabel}
                </Button>
            );
        }
        return null;
    },

    maybeRenderDialog() {
        const classNames = cx({
            'hbc-modal__dialog': true,
            'hbc-modal__dialog--full-width': this.props.width === 'full'
        });

        return (
            <div key="hbc-modal-dialog" className={classNames} ref="modalDialog">
                <div className="hbc-modal__content">
                    {this.props.children}
                </div>
            </div>
        );
    },

    render() {
        const shouldMount = this.state.isOpen || this.state.isOpening;

        if (!shouldMount) {
            return null;
        }

        const className = cx(this.props.className, {
            'hbc-modal': true,
            'hbc-modal--enter': this.state.isOpen && !this.state.isClosing
        });

        return (
            <Portal ref="portal">
                <div
                    className={className}
                    onTouchStart={removeIOSRubberEffect.bind(null, 'modal')}
                    onTouchMove={onTouchMove.bind(null, 'modal')} >
                    {this.maybeRenderCloseButton()}
                    {this.maybeRenderDialog()}
                </div>
            </Portal>
        );
    }
});

export default Modal;
