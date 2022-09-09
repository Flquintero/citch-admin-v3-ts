const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const crypto = require('crypto');
let nonce = crypto.randomBytes(16).toString('base64');

const app = express();

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    `base-uri 'self';default-src 'self'; script-src 'self' 'report-sample';script-src-elem 'self' 'report-sample' https://www.googletagmanager.com/gtag/js https://www.google.com/recaptcha/api.js https://www.gstatic.com/recaptcha/releases/g8G8cw32bNQPGUVoDvt680GA/recaptcha__en.js https://cdn.segment.com/analytics.js/v1//analytics.min.js rocket-loader.min.js 'nonce-${nonce}'; style-src 'self' 'report-sample'; style-src-elem 'self' addStylesClient.js 'nonce-${nonce}'; font-src 'self'; img-src 'self' https://files.citch.io; frame-src 'self' https://www.google.com; connect-src 'self';form-action 'self';object-src 'none';`
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
