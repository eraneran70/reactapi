import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import './Copyright.scss';

class Copyright extends React.Component {

    _renderCopyrightLinks() {
        return map(this.props.copyright_links, (link, index) => (
            <li className="copyright__item" key={index}>
                <a className="copyright__link" href={link.link_url} target={link.link_target}>
                    {link.link_label}
                </a>
            </li>
        ));
    }

    render() {
        return (
            <div className="container">
                <section className="copyright">
                    <ul className="copyright__items">
                        <li className="copyright__item" ref="copyText">{this.props.copyright_text}</li>
                        {this._renderCopyrightLinks()}
                    </ul>
                </section>
            </div>
        );
        }
    }

export default Copyright;
