/* eslint-disable no-param-reassign, react/jsx-no-bind */

// import Hammer from 'hammer';
import { each, map } from 'lodash';
import classnames from 'classnames';
import React, { createClass, PropTypes } from 'react';
// import { Icon } from 'hbc-core-components';

// import './SiteMap.scss';

const ALL_SECTIONS_CLOSED = -1;

const SiteMap = createClass({

    displayName: 'SiteMap',

    propTypes: {
        actions: PropTypes.shape({
            handleEditSiteMapShowLinks: PropTypes.func.isRequired
        }),
        sections: PropTypes.arrayOf(
            PropTypes.shape({
                links: PropTypes.arrayOf(
                    PropTypes.shape({
                        hide_on_desktop: PropTypes.boolean,
                        hide_on_mobile: PropTypes.boolean,
                        link_target: PropTypes.string.isRequired,
                        link_url: PropTypes.string.isRequired,
                        label: PropTypes.string.isRequired
                    })
                ).isRequired,
                heading: PropTypes.string.isRequired
            })
        ).isRequired,
        shownSiteMapColumnIndex: PropTypes.number.isRequired
    },

    getInitialState() {
        return {
            tapped: false
        };
    },

    componentWillMount() {
        this.sectionRefs = [];
    },

    componentDidMount() {
        // if (Hammer) {
        //     let section;
        //     each(this.sectionRefs, (sectionRef, index) => {
        //         section = new Hammer(this.refs[sectionRef]);
        //         section.on('tap', (e) => {
        //             this.handleTap(index, e);
        //         });
        //     });
        // }
    },

    componentDidUpdate(prevProps) {
        const index = this.props.shownSiteMapColumnIndex;
        const prevIndex = prevProps.shownSiteMapColumnIndex;
        const prevSection = this.refs[`siteMapLinks${prevIndex}`];
        const currentSection = this.refs[`siteMapLinks${index}`];

        if (index !== prevIndex) {
            if (index !== ALL_SECTIONS_CLOSED) {
                this.animateOpen(currentSection);

                if (prevSection !== undefined) {
                    this.animateClose(prevSection);
                }
            } else {
                this.animateClose(prevSection);
            }
        }
    },

    componentWillUnMount() {
        // if (Hammer) {
        //     each(this.sectionRefs, (sectionRef) => {
        //         this.refs[sectionRef].destroy();
        //     });
        // }
    },

    animateOpen(section) {
        this.expandSection(section, 0.3, { height: 0 }, { display: 'block', height: 'auto' });
    },

    animateClose(section) {
        this.collapseSection(section, 0.3, { height: 0 });
    },

    expandSection(el, timing, animProps, setProps) {
        animProps.onComplete = () => {
            TweenLite.set(el, setProps);
        };

        TweenLite.set(el, setProps);
        TweenLite.from(el, timing, animProps);
    },

    collapseSection(el, timing, animProps, setProps) {
        animProps.onComplete = () => {
            TweenLite.set(el, setProps);
        };

        TweenLite.to(el, 0.3, animProps);
    },

    handleTap(index, e) {
        this.setState({
            tapped: true
        });

        this.handleSectionClick(index, e);
    },

    handleSectionClick(index, e) {
        const click = e.target;
        const { handleEditSiteMapShowLinks } = this.props.actions;

        if (this.state.tapped) {
            this.setState({
                tapped: false
            });
            return;
        }

        if (click && click.href) {
            // Pass link <a> clicks through
            return;
        }

        if (click.className.indexOf('site-map__section-title') !== -1 ||
            click.className.indexOf('hbc-icon--plus') !== -1) {

            if (this.props.shownSiteMapColumnIndex === index) {
                handleEditSiteMapShowLinks({ index: ALL_SECTIONS_CLOSED });
            } else {
                handleEditSiteMapShowLinks({ index });
            }

            e.preventDefault();
        }
    },

    renderLinks(links) {
        return links.map((link, index) => {
            const classNames = classnames({
                'site-map__link': true,
                'is-hidden-on-mobile': Boolean(link.hide_on_mobile),
                'is-hidden-on-tablet': Boolean(link.hide_on_mobile),
                'is-hidden-on-desktop': Boolean(link.hide_on_desktop)
            });

            /**
            * We need to render both of these because there is no good way
            * to determine breakpoints in the JS. Uses is-hidden classes to determine show/hide
            */
            return (
                <li className={classNames} key={index}>
                    <a className="site-map__anchor" href={link.link_url} target={link.link_target}>
                        {link.label}
                    </a>
                </li>
            );
        });
    },

    renderSections() {
        const current = this.props.shownSiteMapColumnIndex;
        console.log('=====>>> ', this.props);
        return map (this.props, (section, index) => {
            const sectionRef = `site-map__section${index}`;
            const sectionClassNames = classnames('site-map__section', {
                'site-map__section--open': current === index
            });

            this.sectionRefs.push(sectionRef);

            return (
                <article
                    className={sectionClassNames}
                    ref={sectionRef}
                    key={index}
                    onClick={this.handleSectionClick.bind(null, index)} >
                    <h3 className="site-map__section-title">{section.heading}</h3>
                    {/*<Icon className="site-map__toggle" name="plus" />*/}
                    <ul className="site-map__links" ref={`siteMapLinks${index}`}>
                        {this.renderLinks(section.links)}
                    </ul>
                </article>
            );
        });
    },

    render() {
        return (
            <div className="container">
                <section className="site-map">
                    {this.renderSections()}
                </section>
            </div>
        );
    }
});

export default SiteMap;
