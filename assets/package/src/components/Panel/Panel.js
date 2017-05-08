import React, { createClass, PropTypes } from 'react';
import cx from 'classnames';
import Icon from '../Icon/Icon.js';

import './Panel.scss';

/**
 * A {@link Panel} is a collapsible control for presenting information in a
 * limited amount of space. By default, all it does is apply some basic border
 * and padding to contain some content.
 *
 * You can easily add a heading container to your panel with the `header`
 * property.
 *
 * You can pass buttons or secondary text in the `footer` property. Note that
 * panel footers do not inherit colors and borders when using contextual
 * variations as they are not meant to be in the foreground.
 *
 * @class Panel
 * @augments {React.Component}
 */
const Panel = createClass({

    displayName: 'Panel',

    propTypes: {
        children: PropTypes.node,
        className: PropTypes.string,
        collapsible: PropTypes.bool,
        eventKey: PropTypes.any,
        expanded: PropTypes.bool,
        footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        iconType: PropTypes.string,
        onPanelUpdate: PropTypes.func,
        onSelect: PropTypes.func
    },

    getDefaultProps() {
        return {
            iconType: 'plus'
        };
    },

    getInitialState(props = this.props) {
        return {
            animating: false,
            expanded: !props.collapsible || Boolean(props.expanded),
            height: 'none'
        };
    },

    componentDidMount() {
        if (this.isExpanded()) {
            this.expand();
        } else {
            this.collapse(true);
        }
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            expanded: !nextProps.collapsible || nextProps.expanded
        });
    },

    componentDidUpdate(prevProps, prevState) {
        const wasExpanded = this.isExpanded(prevState);

        if (wasExpanded !== this.isExpanded()) {
            if (wasExpanded) {
                this.collapse();
            } else {
                this.expand();
            }
        }
    },

    /**
     * Returns whether in the current or specified state the component is expanded.
     * @param {Object} props
     * @param {Object} state
     * @return {Boolean}
     */
    isExpanded(state = this.state) {
        return state.expanded;
    },

    startAnimation() {
        this.setState({
            animating: true,
            height: this.refs.content.scrollHeight
        });
        clearTimeout(this.timeout);
    },

    /**
     * Collapses the panel content.
     * @param {Boolean} isImmediate Specifies whether the panel should be collapsed immediately on render.
     */
    collapse(isImmediate) {
        if (isImmediate) {
            this.setState({
                height: 0
            });
        } else {
            this.startAnimation();
            this.timeout = setTimeout(() => {
                this.setState({
                    height: 0,
                    animating: false
                });
            }, 25); // Slight timeout to queue this after height has been set by startAnimation()
        }
    },

    /**
     * Expands the panel content.
     * NOTE: We don't need 'isImmediate' here because all panels are expanded by default (noJS graceful degradation).
     */
    expand() {
        this.startAnimation();
        this.timeout = setTimeout(() => {
            this.setState({
                height: 'auto',
                animating: false
            });
        }, 300);
    },

    handleClick(event) {
        event.preventDefault();

        if (this.props.onSelect) {
            this.props.onSelect(event, this.props.eventKey);
        }

        if (this.props.collapsible) {
            this.setState({ expanded: !this.state.expanded });

            if (this.props.onPanelUpdate) {
                this.props.onPanelUpdate(!this.state.expanded);
            }
        }
    },

    renderCollapsibleHeaderIcon() {
        const classes = cx({
            'panel__icon': true,
            'panel__icon--expanded': this.isExpanded()
        });

        if (this.props.collapsible) {
            return (<Icon className={classes} name={this.props.iconType} />);
        }

        return null;
    },

    renderHeader() {
        if (this.props.header) {
            return (
                <a className="panel__header" href="#" onClick={this.handleClick}>
                    <h4 className="panel__title">
                        {this.props.header}
                        {this.renderCollapsibleHeaderIcon()}
                    </h4>
                </a>
            );
        }
        return null;
    },

    renderFooter() {
        if (this.props.footer) {
            return (
                <div className="panel__footer">
                    {this.props.footer}
                </div>
            );
        }
        return null;
    },

    renderContent() {
        const outerContentClassSet = cx('panel__content-outer', {
            'panel__content-outer--expanded': this.state.expanded && !this.state.animating
        });

        const innerContentClassSet = cx('panel__content-inner', {
            'panel__content-inner--without-header': !this.props.header
        });

        return (
            <div className={outerContentClassSet} aria-expanded={this.state.expanded}
                style={{ height: this.state.height }} ref="content">
                <div className={innerContentClassSet}>
                    {this.props.children}
                </div>
            </div>
        );
    },

    render() {
        const baseClassName = cx(this.props.className, 'panel');

        return (
            <div className={baseClassName}>
                {this.renderHeader()}
                {this.renderContent()}
                {this.renderFooter()}
                <div className={'panel__tail'}>
                    <div className={'panel__tail-separator'} />
                </div>
            </div>
        );
    }
});

export default Panel;
