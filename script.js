'use strict';

const http = require('http');
const url = require('url');

const pageViews = {'/': 0, '/about': 0};

const indexHandler = (req, res) => {
    const path = url.parse(req.url).pathname;
    pageViews['/']++;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<h1>Главная страница</h1><p>Просмотры: ${pageViews['/']}</p><a href="/about">О нас</a>`);
    res.end();
};

const aboutHandler = (req, res) => {
    const path = url.parse(req.url).pathname;
    pageViews['/about']++;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<h1>О нас</h1><p>Просмотры: ${pageViews['/about']}</p><a href="/">Главная страница</a>`);
    res.end();
};

const notFoundHandler = (req, res) => {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('Страница не найдена');
    res.end();
};

const server = http.createServer((req, res) => {
    const path = url.parse(req.url).pathname;
    if (path === '/') {
        indexHandler(req, res);
    } else if (path === '/about') {
        aboutHandler(req, res);
    } else {
        notFoundHandler(req, res);
    }
});

const port = 3000;

server.listen(port, () => {
    console.log('Сервер запущен на порту' + port);
});