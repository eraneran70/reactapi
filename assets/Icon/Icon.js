import React from 'react';
import cx from 'classnames';

import './Icon.scss';

const AVAILABLE_ICONS = [
    'alert', 'backtotop', 'barcode', 'bow', 'camera', 'call', 'calendar', 'chat', 'chat-o',
    'check-circle', 'caret-down-circle', 'caret-down', 'caret-right', 'caret-up', 'credit-card-o',
    'check', 'check-thin', 'check-thick', 'chevron-down', 'chevron-left', 'chevron-right',
    'chevron-up', 'chevron-circle-o', 'chevron-circle', 'chevron-thick', 'chevron-thin', 'clock-o',
    'cross-thick', 'cross', 'cross-circle', 'compress', 'contacts', 'customer', 'customer-o',
    'edit', 'edit-o', 'facebook', 'fit-predictor', 'foursquare', 'gift', 'grid-single', 'grid-double',
    'grid-triple', 'google-plus', 'navigation', 'heart', 'heart-o', 'heel', 'info-circle', 'info-circle-o', 'instagram',
    'lock', 'lead', 'location', 'lord-and-taylor', 'lord-and-taylor-stacked', 'off5th', 'minus', 'minus-circle-o',
    'minus-thick', 'mobile', 'mute', 'new', 'email', 'email-o', 'pause-circle-o', 'pinterest', 'plus', 'plus-thick',
    'plus-circle', 'plus-circle-o', 'play-circle-o', 'print', 'question-circle', 'reload', 'resize', 'rss-square',
    'remove', 'saks', 'saks-style', 'shopping-bag', 'shopping-bag-o', 'size-guide', 'search-thick', 'search-o',
    'search-plus-o', 'search-minus-o', 'share', 'sms', 'snapchat', 'snapchat-o', 'star', 'stop-circle-o',
    'similar', 'tumblr', 'twitter', 'vine', 'volume', 'wanelo', 'youtube'
];

/**
 * An {@link Icon} class displays a graphic that takes up a small portion of
 * screen real estate and provides a quick, intuitive representation of an
 * action, a status, or an application.
 *
 * @class Icon
 * @extends {React.Component}
 */
export default React.createClass({

    displayName: 'Icon',

    propTypes: {
        className: React.PropTypes.string,
        name: React.PropTypes.oneOf(AVAILABLE_ICONS).isRequired,
        onClick: React.PropTypes.func
    },

    getClassSet() {
        return cx('hbc-icon', `hbc-icon--${this.props.name}`, this.props.className);
    },

    render() {
        return (
            <span className={this.getClassSet()} aria-hidden="true" onClick={this.props.onClick} />
        );
    }
});
