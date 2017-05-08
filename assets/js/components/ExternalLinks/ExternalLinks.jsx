import React from 'react';
// import { Button } from '../../../Button/Button.js';
import { map } from 'lodash';
// import { hasClass } from 'hbc-dom-utilities/lib/manipulation';

class ExternalLinks extends React.Component {

    // getInitialState() {
    //     return {
    //         shouldShowFullSiteLink: false
    //     };
    // }

    componentDidMount() {

    }

    _renderSocialIcons(network) {
        //console.log('_renderSocialIcons');
        return (
            <Button>click me</Button>
            /*<Button
                standalone
                className="external-links__link external-links__link--icon"
                data-name={network.icon}
                target="_blank"
                href={network.link_url}
                styleContext="primary"
                icon={network.icon}
                title={network.link_label}>
                {network.link_label}
            </Button>*/
        );
    }

    _renderSocialLink(network) {
        return (
            <a className="external-links__link external-links__link--text" href={network.link_url}>
                {network.link_label}
            </a>
        );
    }

    _renderSocialLinks() {

        return map(this.props.networks, (network, index) => {
        // console.log('network----->>> ', network);
            const link = (network.link_label) ? this._renderSocialLink(network) : this._renderSocialIcons(network);

            return (
                <li className="external-links__list-item" key={index}>
                    {link}
                </li>
            );
        });
    }

    _renderOtherLinks() {
                // console.log('_renderOtherLinks');
        return map(this.props.others, (link, index) => (
            <li className="external-links__list-item" key={index}>
                <a
                    className="external-links__link"
                    href={link.link_url}>
                    {link.link_label}
                </a>
            </li>
        ));
    }

    _maybeRenderFullSiteLink() {
        // console.log('link_label------>> ', this.props.full_site_link.link_label)
        // if (this.state.shouldShowFullSiteLink) {
            return (
                <li className="external-links__list-item" ref="fullSiteLink">
                    <a className="external-links__link" href={this.props.full_site_link.link_url}>
                        {this.props.full_site_link.link_label}
                    </a>
                </li>
            );
        // }
    }

    render() {
        // console.log ('------> ',ExternalLinks.propTypes)
        return (
            <div className="container">
                <section className="external-links">
                    <ul className="external-links__social-links">
                        {this._renderSocialLinks()}
                    </ul>

                    <ul className="external-links__hbc-links">
                        {this._maybeRenderFullSiteLink()}
                        {this._renderOtherLinks()}
                    </ul>

                </section>
            </div>
        );
    }
}


ExternalLinks.propTypes = {
    full_site_link: React.PropTypes.shape({
        link_label: React.PropTypes.string,
        link_url: React.PropTypes.string
    }),
    networks: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            icon: React.PropTypes.string,
            link_text: React.PropTypes.string,
            link_label: React.PropTypes.string.isRequired,
            link_url: React.PropTypes.string.isRequired
        })
    ),
    others: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            link_target: React.PropTypes.string,
            link_url: React.PropTypes.string
        })
    )
}

export default ExternalLinks;