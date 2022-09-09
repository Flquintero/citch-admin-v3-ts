const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const crypto = require('crypto');
const helmet = require('helmet');

const app = express();

app.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString('hex');
  next();
});

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'base-uri': 'self',
      'default-src': 'self',
      'script-src': [
        "'self'",
        (req, res) => `'nonce-${res.locals.cspNonce}'`,
        "'unsafe-eval'",
        '*.citch.io',
        '*.googletagmanager.com',
        '*.google.com',
        '*.gstatic.com',
        'cdn.segment.com',
      ],
      'style-src': [
        "'self'",
        (req, res) => `'nonce-${res.locals.cspNonce}'`,
        '*.citch.io',
        'fonts.googleapis.com',
      ],
      'font-src': ["'self'", 'fonts.gstatic.com'],
      'img-src': ["'self'", 'files.citch.io'],
      'frame-src': ["'self'", '*.google.com'],
      'connect-src': [
        "'self'",
        'firebase.googleapis.com',
        'identitytoolkit.googleapis.com',
        '*.google-analytics.com',
        'securetoken.googleapis.com',
      ],
      'form-action': 'self',
      'object-src': 'none',
      'frame-ancestors': 'self',
      'script-src-attr': 'none',
      'upgrade-insecure-requests': [],
    },
    reportOnly: true,
  })
);

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')));

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`app is listening on port: ${port}`);
