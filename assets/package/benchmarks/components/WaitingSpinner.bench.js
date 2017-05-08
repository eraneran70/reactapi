import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import WaitingSpinner from '../WaitingSpinner';

const suite = new Suite();

function renderWaitingSpinner(props = {}) {
    renderToString(<WaitingSpinner {...props} />);
}

suite.add('rendering waiting spinner', () => {
    renderWaitingSpinner();
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
