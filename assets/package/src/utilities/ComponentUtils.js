/* eslint-disable consistent-return */

import { isObject, isFunction } from 'lodash';
import { NodeTypes } from 'hbc-browser-constants';

/**
 * Create chain-able isRequired validator
 *
 * Largely copied directly from:
 * https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
 */
function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName = '<<anonymous>>') {
        if (props[propName] === null || props[propName] === undefined) {
            if (isRequired) {
                return new Error(`Required prop '${propName}' was not specified in '${componentName}'.`);
            }
        } else {
            return validate(props, propName, componentName);
        }
    }

    const chainedCheckType = checkType.bind(null, false);
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
export const PropTypes = {

    mountable: createChainableTypeChecker((props, propName, componentName) => {
        const prop = props[propName];

        if (!isObject(prop) || !isFunction(prop.render) && prop.nodeType !== NodeTypes.ELEMENT_NODE) {
            return new Error(
                `Invalid prop '${propName}' of value '${prop}' supplied to ` +
                `'${componentName}, expected a DOM element or an object that has a render method'`
            );
        }
    })
};
