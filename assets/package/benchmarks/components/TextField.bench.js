import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import { TextField } from '../TextField.jsx';
import Fixture from '../__tests__/fixtures/TextField.json';

const suite = new Suite();

suite.add('TextField component rendering', () => {
    renderToString(<TextField {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
