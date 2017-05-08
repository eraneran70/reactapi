import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import { StandaloneLink } from '../StandaloneLink';

const suite = new Suite();

suite.add('StandaloneLink component rendering', () => {
    renderToString(<StandaloneLink>hello</StandaloneLink>);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
