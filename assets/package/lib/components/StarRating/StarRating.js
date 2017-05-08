'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

require('./StarRating.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
var StarRating = _react2['default'].createClass({

    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'StarRating',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        isMini: _react2['default'].PropTypes.bool,
        value: _react2['default'].PropTypes.number.isRequired
    },

    mixins: [_reactAddonsPureRenderMixin2['default']],

    /**
     * Returns the default values for props in the component.
     * @method getDefaultProps
     * @return {Object}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            isMini: false,
            value: 0
        };
    },


    /**
     * Renders the DOM template for the component.
     * @return {React.DOM}
     */
    render: function render() {
        // This is used to calculate the width of the actual stars to display for the rating.
        // Value is a number between 0 and 500 used to indicate the products rating.
        // For example, a value of 100 is 1 star, 250 is 2.5 stars, 500 is 5 stars.
        // Formula: total width of `star-rating` * value / maximum rating value.
        var value = this.props.value;
        var maxWidth = this.props.isMini ? 60 : 80;
        var width = maxWidth * value / 500;

        var baseStars = this.props.isMini ? 'star-rating star-rating--mini' : 'star-rating';
        var fillStars = this.props.isMini ? 'star-rating__star star-rating__star--mini' : 'star-rating__star';

        return _react2['default'].createElement(
            'div',
            { className: baseStars },
            _react2['default'].createElement('span', { className: fillStars, style: { width: width } })
        );
    }
});

/**
 * A module that exports a {@link StarRating} component class
 * @module src/components/StarRating/StarRating
 */
exports['default'] = StarRating;