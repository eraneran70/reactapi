import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import Panel from '../Panel';

const suite = new Suite();
const header = 'Lorem Ipsum';
const footer = 'Donec varius malesuada mauris, a suscipit sapien congue sit amet.';

function renderPanel(props = {}) {
    renderToString(
        <Panel {...props}>
            <p>Donec ac ullamcorper justo, vitae vulputate lacus.</p>
            <p>Vivamus at lobortis risus, ultricies tempus dolor.</p>
            <p>Cras vestibulum odio non venenatis ultricies.</p>
        </Panel>
    );
}

suite.add('panel component rendering', () => {
    renderPanel({ header, footer });
}).add('panel component rendering without footer', () => {
    renderPanel({ header });
}).add('panel component rendering without header', () => {
    renderPanel({ footer });
}).add('panel component rendering without both header and footer', () => {
    renderPanel();
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
