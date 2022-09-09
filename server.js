const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const crypto = require('crypto');
let nonce = crypto.randomBytes(16).toString('base64');

const app = express();

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    `default-src 'self'; script-src 'self' rocket-loader.min.js 'nonce-${nonce}' addStylesClient.js 'nonce-${nonce}' https://cdn.segment.com/analytics.js/v1//analytics.min.js https://www.google.com/recaptcha/api; style-src 'self'; style-src-elem 'self'; font-src 'self'; img-src 'self'; frame-src 'self'; connect-src 'self'`
  );

  next();
});

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')));

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`app is listening on port: ${port}`);
