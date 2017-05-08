'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _defer2 = require('lodash/defer');

var _defer3 = _interopRequireDefault(_defer2);

var _capitalize2 = require('lodash/capitalize');

var _capitalize3 = _interopRequireDefault(_capitalize2);

exports.getImage = getImage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Preloads an image and returns the image instance.
 * @param {String} source The path to the image file.
 * @param {Object} [options]
 * @param {Function} [options.onLoad] A function that will be invoked when the image is loaded.
 * @param {Function} [options.onError] A function that will be invoked when the image failed loading.
 * @param {Function} [options.onAbort] A function that will be invoked when the loading is aborted.
 * @return {Image}
 */
function getImage(source) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var image = new Image();

    (0, _each3['default'])(['load', 'abort', 'error'], function (name) {
        var type = 'on' + name;
        var event = 'on' + (0, _capitalize3['default'])(name);

        image[type] = function () {
            if (!image) {
                return;
            }

            image = image.onload = image.onabort = image.onerror = null;

            if (options[event]) {
                (0, _defer3['default'])(options[event]);
            }
        };
    });

    image.src = source;

    if (image && image.complete) {
        (0, _defer3['default'])(image.onload);
    }

    return image;
}