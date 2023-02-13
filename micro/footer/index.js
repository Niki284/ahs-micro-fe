const express = require('express');
const Podlet = require('@podium/podlet');

const app = express();

const podlet = new Podlet({
    name: 'footerApp',
    version: '1.0.0',
    pathname: '/',
    content: '/',
    fallback: '/fallback',
    development: true,
});

app.use(podlet.middleware());

app.use('/assets', express.static('./css'));

podlet.css({ value: 'http://localhost:7101/assets/main.css' });

app.get(podlet.content(), (req, res) => {
    res.status(200).podiumSend(`
    <footer>
        <div class="footer-container">
            <p class="footer-text">Footer</p>
        </div>
    </footer>
    `);
});

app.get(podlet.manifest(), (req, res) => {
    res.status(200).send(podlet);
});

app.listen(7101);