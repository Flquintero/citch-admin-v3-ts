const compression = require('compression');
const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const path = require('path');
var app = express();
function ensureSecure(req, res, next) {
  //Heroku stores the origin protocol in a header variable. The app itself is isolated within the dyno and all request objects have an HTTP protocol.
  if (req.get('X-Forwarded-Proto') == 'https' || req.hostname == 'localhost') {
    //Serve Angular App by passing control to the next middleware
    next();
  } else if (req.get('X-Forwarded-Proto') != 'https' && req.get('X-Forwarded-Port') != '443') {
    //Redirect if not HTTP with original request URL
    res.redirect('https://' + req.hostname + req.url);
  }
}
app.use(compression());
app.use(ensureSecure);
app.use(serveStatic(path.join(__dirname, 'dist')));

app.use(
  '/',
  history({
    verbose: true,
    disableDotRule: true,
  })
);
const port = process.env.PORT || 3000;
app.listen(port);
