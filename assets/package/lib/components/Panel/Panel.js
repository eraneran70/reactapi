'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('../Icon/Icon.js');

var _Icon2 = _interopRequireDefault(_Icon);

require('./Panel.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * A {@link Panel} is a collapsible control for presenting information in a
 * limited amount of space. By default, all it does is apply some basic border
 * and padding to contain some content.
 *
 * You can easily add a heading container to your panel with the `header`
 * property.
 *
 * You can pass buttons or secondary text in the `footer` property. Note that
 * panel footers do not inherit colors and borders when using contextual
 * variations as they are not meant to be in the foreground.
 *
 * @class Panel
 * @augments {React.Component}
 */
var Panel = (0, _react.createClass)({

    displayName: 'Panel',

    propTypes: {
        children: _react.PropTypes.node,
        className: _react.PropTypes.string,
        collapsible: _react.PropTypes.bool,
        eventKey: _react.PropTypes.any,
        expanded: _react.PropTypes.bool,
        footer: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
        header: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
        iconType: _react.PropTypes.string,
        onPanelUpdate: _react.PropTypes.func,
        onSelect: _react.PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
        return {
            iconType: 'plus'
        };
    },
    getInitialState: function getInitialState() {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

        return {
            animating: false,
            expanded: !props.collapsible || Boolean(props.expanded),
            height: 'none'
        };
    },
    componentDidMount: function componentDidMount() {
        if (this.isExpanded()) {
            this.expand();
        } else {
            this.collapse(true);
        }
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            expanded: !nextProps.collapsible || nextProps.expanded
        });
    },
    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
        var wasExpanded = this.isExpanded(prevState);

        if (wasExpanded !== this.isExpanded()) {
            if (wasExpanded) {
                this.collapse();
            } else {
                this.expand();
            }
        }
    },


    /**
     * Returns whether in the current or specified state the component is expanded.
     * @param {Object} props
     * @param {Object} state
     * @return {Boolean}
     */
    isExpanded: function isExpanded() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state;

        return state.expanded;
    },
    startAnimation: function startAnimation() {
        this.setState({
            animating: true,
            height: this.refs.content.scrollHeight
        });
        clearTimeout(this.timeout);
    },


    /**
     * Collapses the panel content.
     * @param {Boolean} isImmediate Specifies whether the panel should be collapsed immediately on render.
     */
    collapse: function collapse(isImmediate) {
        var _this = this;

        if (isImmediate) {
            this.setState({
                height: 0
            });
        } else {
            this.startAnimation();
            this.timeout = setTimeout(function () {
                _this.setState({
                    height: 0,
                    animating: false
                });
            }, 25); // Slight timeout to queue this after height has been set by startAnimation()
        }
    },


    /**
     * Expands the panel content.
     * NOTE: We don't need 'isImmediate' here because all panels are expanded by default (noJS graceful degradation).
     */
    expand: function expand() {
        var _this2 = this;

        this.startAnimation();
        this.timeout = setTimeout(function () {
            _this2.setState({
                height: 'auto',
                animating: false
            });
        }, 300);
    },
    handleClick: function handleClick(event) {
        event.preventDefault();

        if (this.props.onSelect) {
            this.props.onSelect(event, this.props.eventKey);
        }

        if (this.props.collapsible) {
            this.setState({ expanded: !this.state.expanded });

            if (this.props.onPanelUpdate) {
                this.props.onPanelUpdate(!this.state.expanded);
            }
        }
    },
    renderCollapsibleHeaderIcon: function renderCollapsibleHeaderIcon() {
        var classes = (0, _classnames2['default'])({
            'panel__icon': true,
            'panel__icon--expanded': this.isExpanded()
        });

        if (this.props.collapsible) {
            return _react2['default'].createElement(_Icon2['default'], { className: classes, name: this.props.iconType });
        }

        return null;
    },
    renderHeader: function renderHeader() {
        if (this.props.header) {
            return _react2['default'].createElement(
                'a',
                { className: 'panel__header', href: '#', onClick: this.handleClick },
                _react2['default'].createElement(
                    'h4',
                    { className: 'panel__title' },
                    this.props.header,
                    this.renderCollapsibleHeaderIcon()
                )
            );
        }
        return null;
    },
    renderFooter: function renderFooter() {
        if (this.props.footer) {
            return _react2['default'].createElement(
                'div',
                { className: 'panel__footer' },
                this.props.footer
            );
        }
        return null;
    },
    renderContent: function renderContent() {
        var outerContentClassSet = (0, _classnames2['default'])('panel__content-outer', {
            'panel__content-outer--expanded': this.state.expanded && !this.state.animating
        });

        var innerContentClassSet = (0, _classnames2['default'])('panel__content-inner', {
            'panel__content-inner--without-header': !this.props.header
        });

        return _react2['default'].createElement(
            'div',
            { className: outerContentClassSet, 'aria-expanded': this.state.expanded,
                style: { height: this.state.height }, ref: 'content' },
            _react2['default'].createElement(
                'div',
                { className: innerContentClassSet },
                this.props.children
            )
        );
    },
    render: function render() {
        var baseClassName = (0, _classnames2['default'])(this.props.className, 'panel');

        return _react2['default'].createElement(
            'div',
            { className: baseClassName },
            this.renderHeader(),
            this.renderContent(),
            this.renderFooter(),
            _react2['default'].createElement(
                'div',
                { className: 'panel__tail' },
                _react2['default'].createElement('div', { className: 'panel__tail-separator' })
            )
        );
    }
});

exports['default'] = Panel;