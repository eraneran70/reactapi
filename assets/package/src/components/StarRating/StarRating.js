import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './StarRating.scss';

/**
 * A {@link StarRating} component provides a super-effective way of providing
 * instant feedback to your readers, on the quality of your site content.
 * Whether it's a blog post, web page, image or what ever piece/element of your
 * website that users have rated. It renders `n` out of 5 stars. Any increment
 * of stars is valid.
 *
 * @class StarRating
 * @augments {React.Component}
 */
const StarRating = React.createClass({

    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'StarRating',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        isMini: React.PropTypes.bool,
        value: React.PropTypes.number.isRequired
    },

    mixins: [PureRenderMixin],

    /**
     * Returns the default values for props in the component.
     * @method getDefaultProps
     * @return {Object}
     */
    getDefaultProps() {
        return {
            isMini: false,
            value: 0
        };
    },

    /**
     * Renders the DOM template for the component.
     * @return {React.DOM}
     */
    render() {
        // This is used to calculate the width of the actual stars to display for the rating.
        // Value is a number between 0 and 500 used to indicate the products rating.
        // For example, a value of 100 is 1 star, 250 is 2.5 stars, 500 is 5 stars.
        // Formula: total width of `star-rating` * value / maximum rating value.
        const value = this.props.value;
        const maxWidth = this.props.isMini ? 60 : 80;
        const width = (maxWidth * value) / 500;

        const baseStars = this.props.isMini ? 'star-rating star-rating--mini' : 'star-rating';
        const fillStars = this.props.isMini ? 'star-rating__star star-rating__star--mini' : 'star-rating__star';

        return (
            <div className={baseStars}>
                <span className={fillStars} style={{ width }} />
            </div>
        );
    }
});

/**
 * A module that exports a {@link StarRating} component class
 * @module src/components/StarRating/StarRating
 */
export default StarRating;
