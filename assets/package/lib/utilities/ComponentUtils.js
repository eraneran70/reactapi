'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PropTypes = undefined;

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _hbcBrowserConstants = require('hbc-browser-constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Create chain-able isRequired validator
 *
 * Largely copied directly from:
 * https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
 */
function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName) {
        var componentName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '<<anonymous>>';

        if (props[propName] === null || props[propName] === undefined) {
            if (isRequired) {
                return new Error('Required prop \'' + propName + '\' was not specified in \'' + componentName + '\'.');
            }
        } else {
            return validate(props, propName, componentName);
        }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
}

/**
 * Checks whether a prop provides a DOM element.
 *
 * The element can be provided in two forms:
 * - Directly passed
 * - Or passed an object that has a `render` method
 *
 * @param props
 * @param propName
 * @param componentName
 * @returns {Error|undefined}
 */
/* eslint-disable consistent-return */

var PropTypes = exports.PropTypes = {

    mountable: createChainableTypeChecker(function (props, propName, componentName) {
        var prop = props[propName];

        if (!(0, _isObject3['default'])(prop) || !(0, _isFunction3['default'])(prop.render) && prop.nodeType !== _hbcBrowserConstants.NodeTypes.ELEMENT_NODE) {
            return new Error('Invalid prop \'' + propName + '\' of value \'' + prop + '\' supplied to ' + ('\'' + componentName + ', expected a DOM element or an object that has a render method\''));
        }
    })
};