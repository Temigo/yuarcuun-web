'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const express = require('express');
const compression = require('compression')
//const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(compression()); // gzip compression
//app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
const directory = __dirname + "/..";
app.use(express.static(directory));
app.use(express.static(path.join(directory, 'build')));
// app.get('/ping', function (req, res) {
//  return res.send('pong');
// });
app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: ");
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(directory, 'build', 'index.html'));
});

app.listen(port);
