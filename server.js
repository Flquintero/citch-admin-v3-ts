const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const helmet = require("helmet");

const app = express();

// Meta Header setter via middleware
// For a full list of all header it will set go to: https://helmetjs.github.io/
// In case we need to use nonce re install npm i crypto and look for nonce code in https://helmetjs.github.io/
// To Do: Remove unsafe eval and inline and solve csp problems
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "base-uri": "self",
      "default-src": "self",
      "script-src": [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "*.citch.io",
        "app-dev.citch.io",
        "app.citch.io",
        "app-new.citch.io",
        "app-dev.citch.io/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js",
        "app.citch.io/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js",
        "www.googletagmanager.com",
        "www.google.com",
        "www.faceboook.com",
        "www.gstatic.com",
        "cdn.segment.com",
        "cdn.lr-ingest.com/logger-1.min.js",
        "cdn.lr-in-prod.com/logger-1.min.js",
        "browser.sentry-cdn.com",
        "*.ingest.sentry.io",
      ],
      "style-src": [
        "'self'",
        "'unsafe-inline'",
        "*.citch.io",
        "fonts.googleapis.com",
      ],
      "font-src": ["'self'", "fonts.gstatic.com"],
      "img-src": ["'self'", "files.citch.io"],
      "frame-src": ["'self'", "*.google.com", "*.facebook.com"],
      "connect-src": [
        "'self'",
        "us-central1-citch-admin-v3-dev.cloudfunctions.net",
        "us-central1-citch-admin-v3.cloudfunctions.net",
        "content-firebaseappcheck.googleapis.com",
        "firebaseinstallations.googleapis.com",
        "firebase.googleapis.com",
        "identitytoolkit.googleapis.com",
        "www.google-analytics.com",
        "securetoken.googleapis.com",
        "cdn.segment.com",
        "api.segment.io",
        "cdn.lr-in-prod.com",
        "browser.sentry-cdn.com",
        "*.ingest.sentry.io",
        "data:application/*",
      ],
      "form-action": "self",
      "object-src": "none",
      "frame-ancestors": "self",
      "script-src-attr": "none",
      "upgrade-insecure-requests": [],
    },
    reportOnly: true,
    // FIX THIS !!!
    // ...(process.env.NODE_ENV === "development" ? { reportOnly: true } : null), // use CSP report only in dev
  })
);

//here we are configuring dist to serve app files
app.use("/", serveStatic(path.join(__dirname, "/dist")));

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`app is listening on port: ${port}`);
