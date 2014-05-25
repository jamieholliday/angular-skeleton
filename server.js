var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('my-application');

var routes = require('./server/routes/index');

var app = express();

app.use(favicon('public/favicon.ico'));
// Only use logger for development environment
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
  console.log('Express running');
});