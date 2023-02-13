const express = require("express");
const Podlet = require("@podium/podlet");

const app = express();

const podlet = new Podlet({
  name: "headerApp",
  version: "1.0.0",
  pathname: "/",
  content: "/",
  fallback: "/fallback",
  development: true,
});

app.use(podlet.middleware());

app.use("/assets", express.static("./css"));

podlet.css({ value: "http://localhost:7103/assets/index.css" });

app.get(podlet.content(), (req, res) => {
  res.status(200).podiumSend(`
    <header>
    <img src="/assets/artevelde_hs_logo_rgb.png" alt="Logo" class="nav__logo">
    <nav>
        <ul id="nav">
            <li>
                <a href="#">
                    Home
                </a>
            </li>
            <li>
                <a href="#">
                    About
                </a>
            </li>
            <li>
                <a href="#">
                    Blog
                </a>
            </li>
            <li>
                <a href="#">
                    Contact
                </a>
            </li>
        </ul>
    </nav>
</header>
    `);
});

app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});

app.listen(7103);
