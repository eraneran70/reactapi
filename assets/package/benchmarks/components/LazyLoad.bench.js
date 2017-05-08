import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import LazyLoad from '../LazyLoad';

const suite = new Suite();

suite.add('LazyLoad component rendering', () => {
    renderToString(
        <LazyLoad>
            <figure>
                <img src={'http://placehold.it/350x150'} alt={'Macaque in the trees'} />
                <figcaption>A cheeky macaque, Lower Kintaganban River, Borneo.</figcaption>
            </figure>
        </LazyLoad>
    );
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
