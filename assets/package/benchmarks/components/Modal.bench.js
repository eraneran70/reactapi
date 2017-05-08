import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import Modal from '../Modal';

const suite = new Suite();

function renderModal(props = {}) {
    renderToString(
        <Modal {...props}>
            <p>Donec ac ullamcorper justo, vitae vulputate lacus.</p>
            <p>Vivamus at lobortis risus, ultricies tempus dolor.</p>
            <p>Cras vestibulum odio non venenatis ultricies.</p>
        </Modal>
    );
}

suite.add('rendering opened modal component', () => {
    renderModal({ isOpen: true });
}).add('rendering closed modal component', () => {
    renderModal({ isOpen: false });
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
