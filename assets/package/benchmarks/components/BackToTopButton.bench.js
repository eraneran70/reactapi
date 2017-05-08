import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import BackToTopButton from '../BackToTopButton';
import Fixture from '../__tests__/fixtures/BackToTopButton.json';

const suite = new Suite();

suite.add('BackToTopButton component rendering', () => {
    renderToString(<BackToTopButton {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
