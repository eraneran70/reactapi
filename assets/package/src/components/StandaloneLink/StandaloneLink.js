import React, { PropTypes } from 'react';
import cx from 'classnames';

import './StandaloneLink.scss';

function StandaloneLink(props) {
    const classes = cx({
        'standalone-link': true,
        'standalone-link--non-underlined': props.hideInitialUnderline
    }, props.className);

    return (
        <a className={classes} style={props.style} onClick={props.onClick} href={props.href}>
            {props.children}
        </a>
    );
}

StandaloneLink.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    hideInitialUnderline: PropTypes.bool,
    href: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object
};

export default StandaloneLink;
