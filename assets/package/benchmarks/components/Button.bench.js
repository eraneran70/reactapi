import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import Button from '../Button';

const suite = new Suite();

function renderButton(props = {}) {
    renderToString(<Button {...props}>Button</Button>);
}

suite.add('rendering button component as a button element', () => {
    renderButton();
}).add('rendering button component as a button with custom class name', () => {
    renderButton({ className: 'custom' });
}).add('rendering button component as a button element with an icon', () => {
    renderButton({ icon: 'facebook' });
}).add('rendering button component as a button element with an standalone icon', () => {
    renderButton({ icon: 'facebook', standalone: true });
}).add('rendering button component as an anchor element', () => {
    renderButton({ href: 'http://www.google.com' });
}).add('rendering button component as an anchor with custom class name', () => {
    renderButton({ href: 'http://www.google.com', className: 'custom' });
}).add('rendering button component as an anchor element with an icon', () => {
    renderButton({ href: 'http://www.google.com', icon: 'facebook' });
}).add('rendering button component as an anchor element with an standalone icon', () => {
    renderButton({ href: 'http://www.google.com', icon: 'facebook', standalone: true });
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
