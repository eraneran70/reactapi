import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import { RadioGroup } from '../RadioGroup';
import Fixture from '../__tests__/fixtures/RadioGroup.json';

const suite = new Suite();

suite.add('RadioGroup component rendering', () => {
    renderToString(<RadioGroup {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
