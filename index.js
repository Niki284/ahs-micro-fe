const express = require('express');
const Layout = require('@podium/layout');
const utils = require("@podium/utils");

const app = express();

const layout = new Layout({
    name: 'myLayout',
    pathname: '/',
});

const podlet1 = layout.client.register({
    name: 'buttonApp',
    uri: 'http://localhost:7100/manifest.json',
});
const podlet2 = layout.client.register({
  name: 'footerApp',
  uri: 'http://localhost:7101/manifest.json',
});
const podlet3 = layout.client.register({
  name: 'formApp',
  uri: 'http://localhost:7102/manifest.json',
});
const podlet4 = layout.client.register({
  name: 'headerApp',
  uri: 'http://localhost:7103/manifest.json',
});

app.use(layout.middleware());

app.use('/assets', express.static('./css'));
layout.css({ value: '/assets/index.css' });

layout.view(
  (incoming, body, head) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    ${incoming.css.map(utils.buildLinkElement).join("\n")}
    <title>${incoming.view.title}</title>
  </head>
  <body>
    ${body}
    ${incoming.js.map(utils.buildScriptElement).join("\n")}
  </body>
</html>`
);

app.get('/', async (req, res) => {
    const incoming = res.locals.podium;

    const response = await Promise.all([
      podlet1.fetch(incoming),
      podlet2.fetch(incoming),
      podlet3.fetch(incoming),
      podlet4.fetch(incoming),
  ]);

    incoming.view.title = 'Artevelde micro fe';
    incoming.podlets = response;

    res.podiumSend(`<div class="wrapper">
    <div class="content">
          ${response[3]}
      <main>
        <section class="form">
          ${response[2]}
          ${response[0]}
        </section>
        <section class="contact">
          <img src="/assets/chpratt.jpeg" alt="Chris thinks it is amazing" />
        </section>
      </main>
      ${response[1]}
    </div>`);
});

app.listen(7200);