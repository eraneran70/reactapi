import classnames from 'classnames';
import { findLast, map } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

class ContactInfo extends React.Component {
    // displayName: 'ContactInfo'

    _renderLinks() {
        const lastMobileLink = findLast(this.props.links, { hide_on_mobile: false });
        const lastDesktopLink = findLast(this.props.links);

        return this.props.links.map((link, index) => {
            const listItemClasses = classnames({
                'contact-info__link': true,
                'contact-info__link--desktop-last': link === lastDesktopLink,
                'contact-info__link--mobile-last': link === lastMobileLink,
                'is-hidden-on-mobile': link.hide_on_mobile,
                'is-hidden-on-desktop': link.hide_on_desktop
            });

            const linkClasses = classnames({
                'contact-info__anchor': true,
                'contact-info__anchor--with-mobile-label': Boolean(link.mobile_label),
                'is-disabled-link': !link.link_url
            });

            /**
            * The CSS uses the data attributes to set the content of the a tag
            * to the correct value for desktop and mobile
            */
            return (
                <li className={listItemClasses} key={index}>
                    <a className={linkClasses} href={link.link_url} target={link.link_target}
                        data-mobilelabel={link.mobile_label}>
                        <span className="contact-info__label">{link.desktop_label}</span>
                    </a>
                </li>
            );
        });
    }

    render() {
        return (
            <div className="container">
                <section className="contact-info">
                    <h1 className="contact-info__heading">{this.props.heading}</h1>
                    <ul className="contact-info__links">
                        {this._renderLinks()}
                    </ul>
                </section>
            </div>
        );
    }

}

ContactInfo.propTypes = {
    heading: React.PropTypes.string.isRequired,
    links: React.PropTypes.array.isRequired
};

export default ContactInfo;
