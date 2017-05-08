import React, { cloneElement } from 'react';
import cx from 'classnames';
import './PanelGroup.scss';

const PanelGroup = React.createClass({

    displayName: 'PanelGroup',

    propTypes: {
        accordion: React.PropTypes.bool,
        children: React.PropTypes.node,
        className: React.PropTypes.string,
        defaultActiveKey: React.PropTypes.any
    },

    getInitialState() {
        return { activeKey: this.props.defaultActiveKey };
    },

    handlePanelSelection(event, eventKey) {
        // Currently active panel is being collapsed.
        // Reset active key since all panels should be collapsed.
        if (this.state.activeKey === eventKey) {
            this.setState({ activeKey: null });
        } else {
            this.setState({ activeKey: eventKey });
        }
    },

    renderPanel(child, index) {
        // Make sure child is a valid component.
        if (!React.isValidElement(child)) {
            return child;
        }

        const props = {
            key: child.key ? child.key : index,
            ref: child.ref
        };

        // Control panels when component is meant to behave as an accordion.
        if (this.props.accordion) {
            props.collapsible = true;
            props.expanded = child.props.eventKey === this.state.activeKey;
            props.onSelect = this.handlePanelSelection;
        }

        return cloneElement(child, props);
    },

    render() {
        const className = cx(this.props.className, 'panel-group');

        return (
            <div className={className}>
                {React.Children.map(this.props.children, this.renderPanel)}
            </div>
        );
    }

});

export default PanelGroup;
