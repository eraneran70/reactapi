import { capitalize, defer, each } from 'lodash';

/**
 * Preloads an image and returns the image instance.
 * @param {String} source The path to the image file.
 * @param {Object} [options]
 * @param {Function} [options.onLoad] A function that will be invoked when the image is loaded.
 * @param {Function} [options.onError] A function that will be invoked when the image failed loading.
 * @param {Function} [options.onAbort] A function that will be invoked when the loading is aborted.
 * @return {Image}
 */
export function getImage(source, options = {}) {
    let image = new Image();

    each(['load', 'abort', 'error'], (name) => {
        const type = `on${name}`;
        const event = `on${capitalize(name)}`;

        image[type] = () => {
            if (!image) {
                return;
            }

            image = image.onload = image.onabort = image.onerror = null;

            if (options[event]) {
                defer(options[event]);
            }
        };
    });

    image.src = source;

    if (image && image.complete) {
        defer(image.onload);
    }

    return image;
}
