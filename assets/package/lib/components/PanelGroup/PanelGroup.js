'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./PanelGroup.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var PanelGroup = _react2['default'].createClass({

    displayName: 'PanelGroup',

    propTypes: {
        accordion: _react2['default'].PropTypes.bool,
        children: _react2['default'].PropTypes.node,
        className: _react2['default'].PropTypes.string,
        defaultActiveKey: _react2['default'].PropTypes.any
    },

    getInitialState: function getInitialState() {
        return { activeKey: this.props.defaultActiveKey };
    },
    handlePanelSelection: function handlePanelSelection(event, eventKey) {
        // Currently active panel is being collapsed.
        // Reset active key since all panels should be collapsed.
        if (this.state.activeKey === eventKey) {
            this.setState({ activeKey: null });
        } else {
            this.setState({ activeKey: eventKey });
        }
    },
    renderPanel: function renderPanel(child, index) {
        // Make sure child is a valid component.
        if (!_react2['default'].isValidElement(child)) {
            return child;
        }

        var props = {
            key: child.key ? child.key : index,
            ref: child.ref
        };

        // Control panels when component is meant to behave as an accordion.
        if (this.props.accordion) {
            props.collapsible = true;
            props.expanded = child.props.eventKey === this.state.activeKey;
            props.onSelect = this.handlePanelSelection;
        }

        return (0, _react.cloneElement)(child, props);
    },
    render: function render() {
        var className = (0, _classnames2['default'])(this.props.className, 'panel-group');

        return _react2['default'].createElement(
            'div',
            { className: className },
            _react2['default'].Children.map(this.props.children, this.renderPanel)
        );
    }
});

exports['default'] = PanelGroup;