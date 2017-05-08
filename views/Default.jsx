import reactdom from 'react-dom';
import React from 'react';
import Copyright from '../assets/js/components/Copyright/Copyright.jsx';
import myData from './data.json';
import ContactInfo from '../assets/js/components/ContactInfo/ContactInfo.jsx';
import ExternalLinks from '../assets/js/components/ExternalLinks/ExternalLinks.jsx';
import SiteMap from '../assets/js/components/SiteMap/SiteMap.jsx'
import PropTypes from 'prop-types';
import '../footer.scss';

var el = document.getElementById('wrapper');

class Defaults extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
      //console.log('ahoy: ',myData.external_links);
    return (
      <div id="footer-wrapper">
        <div id="footer">
            <ContactInfo heading={myData.contact_info.heading} links={myData.contact_info.links} />
            <ExternalLinks {...myData.external_links} />
            <SiteMap {...myData.site_map} />
            <Copyright {...myData.copyright} />
        </div>
      </div>
    );
  }
}

reactdom.render(
  <Defaults/>,
  el
)

Defaults.propTypes = {
    actions: PropTypes.object,
    contact_info: PropTypes.shape({
        heading: PropTypes.string.isRequired,
        links: PropTypes.arrayOf(PropTypes.shape({
            hide_on_mobile: PropTypes.boolean,
            link_target: PropTypes.string.isRequired,
            link_url: PropTypes.string.isRequired,
            desktop_label: PropTypes.string.isRequired,
            mobile_label: PropTypes.string
        })).isRequired
    }).isRequired,
    shownSiteMapColumnIndex: PropTypes.number,
    site_map: PropTypes.arrayOf(
        PropTypes.shape({
            links: PropTypes.arrayOf(
                PropTypes.shape({
                    hide_on_mobile: PropTypes.boolean,
                    link_target: PropTypes.string.isRequired,
                    link_url: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired
                })
            ).isRequired,
            heading: PropTypes.string.isRequired
        })
    ).isRequired
};

export default Defaults;

////// to run use: node webpack.server.js