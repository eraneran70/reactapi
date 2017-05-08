const waitsInProgress = [];

// http://brandonokert.com/2015/08/04/TestingInReact/#WaitFor
export function waitFor(test, message, done, timeLeft = 100) {
    waitsInProgress.push(setTimeout(() => {
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
waitFor.clear = () => waitsInProgress.map(clearTimeout);
