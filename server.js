const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const crypto = require('crypto');
let nonce = crypto.randomBytes(16).toString('base64');

const app = express();

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    `base-uri 'self';default-src 'self'; script-src 'nonce-${nonce}' 'unsafe-eval';script-src-elem 'nonce-${nonce}' 'report-sample' 'self' https://dashboard-new-dev.citch.io https://www.googletagmanager.com/gtag/js https://www.google.com/recaptcha/api.js https://www.gstatic.com/recaptcha/releases/g8G8cw32bNQPGUVoDvt680GA/recaptcha__en.js https://cdn.segment.com/analytics.js/v1//analytics.min.js https://*/cloudflare-static/rocket-loader.min.js; style-src 'nonce-${nonce}' 'report-sample' 'self'; style-src-elem 'nonce-${nonce}' 'self' addStylesClient.js https://fonts.googleapis.com/; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://files.citch.io; frame-src 'self' https://www.google.com; connect-src 'self' https://firebase.googleapis.com https://identitytoolkit.googleapis.com https://www.google-analytics.com;form-action 'self';object-src 'none';`
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
