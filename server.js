const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const helmet = require('helmet');

const app = express();

// Meta Header setter via middleware
// For a full list of all header it will set go to: https://helmetjs.github.io/
// In case we need to use nonce re install npm i crypto and look for nonce code in https://helmetjs.github.io/
// To Do: Remove unsafe eval and inline and solve csp problems
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'base-uri': 'self',
      'default-src': 'self',
      'script-src': [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        '*.citch.io',
        '*.citch.io/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js',
        '*.googletagmanager.com',
        '*.google.com',
        '*.gstatic.com',
        'cdn.segment.com/analytics.js/v1//analytics.min.js',
      ],
      'style-src': ["'self'", "'unsafe-inline'", '*.citch.io', 'fonts.googleapis.com'],
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
    ...(process.env.NODE_ENV === 'development' ? { reportOnly: true } : null), // use CSP report only in dev
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
