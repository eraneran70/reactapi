import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import { CheckboxDropList } from '../CheckboxDropList';
import Fixture from '../__test__/fixtures/CheckboxDropList.json';

const suite = new Suite();

suite.add('CheckboxDropList component rendering', () => {
    renderToString(<CheckboxDropList {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
