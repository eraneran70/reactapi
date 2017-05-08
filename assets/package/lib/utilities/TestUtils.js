"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.waitFor = waitFor;
var waitsInProgress = [];

// http://brandonokert.com/2015/08/04/TestingInReact/#WaitFor
function waitFor(test, message, done) {
    var timeLeft = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;

    waitsInProgress.push(setTimeout(function () {
        if (timeLeft <= 0) {
            done(message);
        } else if (test()) {
            done();
        } else {
            waitFor(test, message, done, timeLeft - 10);
        }
    }, 10));
}

// optionally call this in the beforeEach to ensure rogue tests are not still waiting
waitFor.clear = function () {
    return waitsInProgress.map(clearTimeout);
};