/* eslint-disable no-param-reassign */

import React from 'react';
import cx from 'classnames';
import Icon from '../Icon/Icon';
import { addEvent } from 'hbc-dom-utilities/lib/event';

import './BackToTopButton.scss';

/**
 * BackToTopButton class.
 * @class BackToTopButton
 * @augments React.Component
 */
const BackToTopButton = React.createClass(/** @lends BackToTopButton.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'BackToTopButton',

    getInitialState() {
        return {
            showBackToTop: 0
        };
    },

    componentDidMount() {
        addEvent(window, 'scroll-debounced', this.handleScroll);
    },

    /**
     * handleScroll() shows the scrollToTop button after 100 pixels
     * down the page and hides it before 100 pixels
     * @method handleScroll
     */
    handleScroll() {
        this.setState({ showBackToTop: (pageYOffset > 100) });
    },

    /**
     * scrollToTop() scrolls linearly to the destination
     * in the scrollSpeed (ms) specified.
     * @method scrollToTop
     * @param {Element} element
     * @param {Number} destination
     * @param {Number} scrollSpeed
     */
    scrollToTop(element, destination = 0, scrollSpeed = 200) {
        if (scrollSpeed <= 0) {
            return;
        }

        const difference = destination - element.scrollTop;
        const perTick = difference / scrollSpeed * 10;
        setTimeout(() => {
            element.scrollTop = element.scrollTop + perTick;
            // Stop when the scrollTop of the element is at the destination
            if (element.scrollTop === destination) {
                return;
            }

            this.scrollToTop(element, destination, scrollSpeed - 10);
        }, 10);
    },

    handleRunScroll() {
        // document.body.scrollTop is used by Chrome and
        // document.documentElement.scrollTop is used by all other browsers
        const element = document.body.scrollTop === 0 ? document.documentElement : document.body;
        this.scrollToTop(element, 0, 200);
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        const clx = cx({
            'back-to-top-button': true,
            'back-to-top-button--active': this.state.showBackToTop
        });
        return (
            <button className={clx}
                ref="backToTop"
                onClick={this.handleRunScroll}>
                <Icon name={'chevron-thick'} />
            </button>
        );
    }
});

export default BackToTopButton;
