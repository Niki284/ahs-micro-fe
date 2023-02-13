const express = require('express');
const Podlet = require('@podium/podlet');

const app = express();

const podlet = new Podlet({
    name: 'buttonApp',
    version: '1.0.0',
    pathname: '/',
    content: '/',
    fallback: '/fallback',
    development: true,
});

app.use(podlet.middleware());

app.use('/assets', express.static('./css'));

podlet.css({ value: 'http://localhost:7100/assets/style.css' });

app.get(podlet.content(), (req, res) => {
    res.status(200).podiumSend(`
    <h1>Buttons</h1>
    <a href="/" class="button button--primary">Primary button</a>
    <a href="/" class="button button--secondary">Secondary button</a>
    <a href="/" class="button button--tertiary">Tertiary button</a>
    `);
});

app.get(podlet.manifest(), (req, res) => {
    res.status(200).send(podlet);
});

app.listen(7100);