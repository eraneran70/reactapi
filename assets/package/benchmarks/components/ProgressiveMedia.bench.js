import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import ProgressiveImage from '../ProgressiveImage';

const suite = new Suite();

suite.add('ProgressiveImage component rendering', () => {
    renderToString(<ProgressiveImage />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
