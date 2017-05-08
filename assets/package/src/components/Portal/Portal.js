import React from 'react';
import ReactDOM from 'react-dom';
import invariant from 'fbjs/lib/invariant';
import { result } from 'lodash';
import * as ComponentUtils from '../../utilities/ComponentUtils';

function getOwnerDocument(element) {
    return (element && element.ownerDocument) || document;
}

/**
 * @class Portal
 * @augments {React.Component}
 */
const Portal = React.createClass(/** @lends Portal.prototype */{

    displayName: 'Portal',

    /**
     * @property {ReactElement|DOMElement|Function} container - A Node,
     * Component instance, or function that returns either. The `container` will
     * have the `Portal` children appended to it.
     */
    propTypes: {
        children: React.PropTypes.node,
        container: React.PropTypes.oneOfType([ComponentUtils.PropTypes.mountable, React.PropTypes.func])
    },

    componentDidMount() {
        this.isMounted = true;
        this.renderOverlay();
    },

    componentDidUpdate() {
        this.renderOverlay();
    },

    componentWillUnmount() {
        this.unrenderOverlay();
        this.unmountOverlayTarget();
        this.isMounted = false;
    },

    getMountDOMNode() {
        return this.overlayTarget;
    },

    getOverlayDOMNode() {
        if (!this.isMounted) {
            if (process.env.NODE_ENV !== 'production') {
                invariant(false, 'Portal.getOverlayDOMNode(): A component must be mounted to have a DOM node.');
            } else {
                invariant(false);
            }
        }

        if (this.overlayInstance) {
            return ReactDOM.findDOMNode(this.overlayInstance);
        }

        return null;
    },

    getContainerDOMNode() {
        return ReactDOM.findDOMNode(result(this, 'props.container')) ||
            getOwnerDocument(ReactDOM.findDOMNode(this)).body;
    },

    unmountOverlayTarget() {
        if (this.overlayTarget) {
            this.getContainerDOMNode().removeChild(this.overlayTarget);
            this.overlayTarget = null;
        }
    },

    mountOverlayTarget() {
        if (!this.overlayTarget) {
            this.overlayTarget = document.createElement('div');
            this.getContainerDOMNode().appendChild(this.overlayTarget);
        }
    },

    unrenderOverlay() {
        if (this.overlayTarget) {
            ReactDOM.unmountComponentAtNode(this.overlayTarget);
            this.overlayInstance = null;
        }
    },

    // By calling this method in componentDidMount() and componentDidUpdate(),
    // you're effectively creating a "wormhole" that funnels React's
    // hierarchical updates through to a DOM node on an entirely different part
    // of the page.
    renderOverlay() {
        const overlay = this.props.children ? React.Children.only(this.props.children) : null;

        if (overlay !== null) {
            this.mountOverlayTarget();
            this.overlayInstance = ReactDOM.unstable_renderSubtreeIntoContainer(this, overlay, this.overlayTarget);
        } else {
            this.unrenderOverlay();
            this.unmountOverlayTarget();
        }
    },

    render() {
        return null;
    }
});

export default Portal;
