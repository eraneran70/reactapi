import React from 'react';
import ReactDOM from 'react-dom';
import { debounce } from 'lodash';
import { getScrollParent } from 'hbc-dom-utilities/lib/traversing';
import { isScrolledIntoView } from 'hbc-dom-utilities/lib/miscellaneous';
import { addEvent, removeEvent } from 'hbc-dom-utilities/lib/event';

/**
 * LazyLoad class.
 * @class LazyLoad
 * @augments React.Component
 */
const LazyLoad = React.createClass(/** @lends LazyLoad.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'LazyLoad',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        children: React.PropTypes.node,
        offset: React.PropTypes.number,
        once: React.PropTypes.bool,
        resize: React.PropTypes.bool,
        scroll: React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            offset: 0,
            once: false,
            resize: false,
            scroll: true
        };
    },

    getInitialState() {
        return { isVisible: false };
    },

    componentDidMount() {
        this.checkVisibleDebounced = debounce(this.checkVisible, 350);
        this.attachEvents();
        this.checkVisible();
    },

    componentWillUpdate(nextProps, nextState) {
        if (this.state.isVisible && nextState.isVisible && this.isFirstTimeVisible) {
            this.isFirstTimeVisible = false;
        }
    },

    componentWillUnmount() {
        this.detachEvents();
        this.checkVisibleDebounced = null;
    },

    getEventDOMNode() {
        return getScrollParent(ReactDOM.findDOMNode(this));
    },

    attachEvents() {
        if (this.props.scroll) {
            addEvent(this.getEventDOMNode(), 'scroll', this.checkVisibleDebounced);
        }

        if (this.props.resize) {
            addEvent(window, 'resize', this.checkVisibleDebounced);
        }
    },

    detachEvents() {
        removeEvent(this.getEventDOMNode(), 'resize', this.checkVisibleDebounced);
        removeEvent(window, 'scroll', this.checkVisibleDebounced);
    },

    checkVisible() {
        const isVisible = isScrolledIntoView(ReactDOM.findDOMNode(this), this.getEventDOMNode(), this.props.offset);

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
    render() {
        return React.cloneElement(this.props.children, {
            isFirstTimeVisible: this.isFirstTimeVisible,
            isLazyLoaded: true,
            isVisible: this.state.isVisible
        });
    }
});

export default LazyLoad;
