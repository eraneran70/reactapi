import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import { CheckboxGroup } from '../CheckboxGroup';
import Fixture from '../__tests__/fixtures/CheckboxGroup.json';

const suite = new Suite();

suite.add('CheckboxGroup component rendering', () => {
    renderToString(<CheckboxGroup {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
