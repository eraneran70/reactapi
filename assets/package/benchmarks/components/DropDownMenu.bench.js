import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import { DropDownMenu } from '../DropDownMenu';
import Fixture from '../__test__/fixtures/DropDownMenu.json';

const suite = new Suite();

suite.add('DropDownMenu component rendering', () => {
    renderToString(<DropDownMenu {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
