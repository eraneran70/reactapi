import React from 'react';
import cx from 'classnames';
import { includes } from 'lodash';

import './Alert.scss';

const STYLES = ['default', 'success', 'info', 'warning', 'danger'];

/**
 * An {@link Alert} component provides contextual feedback messages for typical
 * user actions with the handful of available and flexible alert messages.
 * @class Alert
 * @extends {React.Component}
 */
const Alert = React.createClass({

    displayName: 'Alert',

    propTypes: {
        children: React.PropTypes.node,
        className: React.PropTypes.string,
        closeLabel: React.PropTypes.string,
        dismissAfter: React.PropTypes.number, // In seconds
        onDismiss: React.PropTypes.func,
        style: React.PropTypes.oneOf(STYLES)
    },

    getDefaultProps() {
        return {
            style: 'default',
            closeLabel: 'Close Alert'
        };
    },

    componentDidMount() {
        if (this.props.dismissAfter && this.isDismissable()) {
            this.dismissTimer = setTimeout(this.props.onDismiss, (this.props.dismissAfter * 1000));
        }
    },

    componentWillUnmount() {
        clearTimeout(this.dismissTimer);
    },

    getClassSet() {
        const block = 'alert';
        const classes = {
            [block]: true,
            [`${block}--dismissable`]: this.isDismissable(),
            [this.props.className]: Boolean(this.props.className),
            [`${block}--${this.props.style}`]: includes(STYLES, this.props.style)
        };

        return cx(classes);
    },

    isDismissable() {
        return Boolean(this.props.onDismiss);
    },

    maybeRenderDismissButton() {
        if (this.isDismissable()) {
            return (
                <button type="button"
                    className="alert__close"
                    aria-label={this.props.closeLabel}
                    onClick={this.props.onDismiss}>
                    <span aria-hidden="true">&times;</span>
                </button>
            );
        }
        return null;
    },

    render() {
        return (
            <div className={this.getClassSet()} role="alert">
                {this.maybeRenderDismissButton()}
                {this.props.children}
            </div>
        );
    }
});

export default Alert;
