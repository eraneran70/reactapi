import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import Icon from '../Icon';

const suite = new Suite();

function renderIcon(props = {}) {
    renderToString(<Icon {...props} />);
}

suite.add('rendering icon component', () => {
    renderIcon({ name: 'facebook' });
}).add('rendering icon component with custom class', () => {
    renderIcon({ name: 'facebook', className: 'custom-class-name' });
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
