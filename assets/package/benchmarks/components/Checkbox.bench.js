import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import { Checkbox } from '../Checkbox.js';
import Fixture from '../__tests__/fixtures/Checkbox.json';

const suite = new Suite();

suite.add('Checkbox component rendering', () => {
    renderToString(<Checkbox {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
