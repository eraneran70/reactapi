'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys2 = require('lodash/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AssetUtils = require('../../utilities/AssetUtils');

var AssetUtils = _interopRequireWildcard(_AssetUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * The `Image` class provides a React component for displaying images.
 * @class Image
 * @augments React.Component
 */
var Image = _react2['default'].createClass({

    displayName: 'Image',

    propTypes: {
        /**
         * The text that's read by the screen reader when the user interacts with the image.
         */
        accessibilityLabel: _react.PropTypes.string.isRequired,
        /**
         * Invoked when load is aborted.
         */
        onAbort: _react.PropTypes.func,
        /**
         * Invoked when load is not completed successfully.
         */
        onError: _react.PropTypes.func,
        /**
         * Invoked when load completes successfully.
         */
        onLoad: _react.PropTypes.func,
        /**
         * Invoked when either load succeeds or fails.
         */
        onLoadEnd: _react.PropTypes.func,
        /**
         * Invoked on load start.
         */
        onLoadStart: _react.PropTypes.func,
        /**
         * A URI string representing the resource identifier for the static image.
         */
        source: _react.PropTypes.string.isRequired
    },

    componentDidMount: function componentDidMount() {
        this.loadImage();
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (this.props.source !== nextProps.source) {
            this.loadImage();
        }
    },
    emitEvent: function emitEvent(eventName) {
        if (this.props[eventName]) {
            for (var _len = arguments.length, eventArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                eventArgs[_key - 1] = arguments[_key];
            }

            this.props[eventName].apply(null, eventArgs);
        }
    },
    loadImage: function loadImage() {
        var _this = this;

        this.emitEvent('onLoadStart');

        var image = AssetUtils.getImage(this.props.source, {
            onAbort: function onAbort() {
                return (0, _each3['default'])(['onAbort', 'onLoadEnd'], function (event) {
                    return _this.emitEvent(event, image);
                });
            },
            onError: function onError() {
                return (0, _each3['default'])(['onError', 'onLoadEnd'], function (event) {
                    return _this.emitEvent(event, image);
                });
            },
            onLoad: function onLoad() {
                return (0, _each3['default'])(['onLoad', 'onLoadEnd'], function (event) {
                    return _this.emitEvent(event, image);
                });
            }
        });
    },


    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render: function render() {
        var otherProps = (0, _omit3['default'])(this.props, (0, _keys3['default'])(Image.propTypes));

        return _react2['default'].createElement('img', (0, _extends3['default'])({ src: this.props.source, alt: this.props.accessibilityLabel }, otherProps));
    }
});

exports['default'] = Image;