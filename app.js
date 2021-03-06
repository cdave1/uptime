var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var Provider = require('react-redux').Provider;
var cors = require('cors')

// Load environment variables from .env file
dotenv.load();

// ES6 Transpiler
require('babel-core/register');
require('babel-polyfill');

// Controllers
var dashboardController = require('./controllers/dashboard');

// React and Server-Side Rendering
var routes = require('./app/routes');
var configureStore = require('./app/redux/store/configureStore').default;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3005);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/items', dashboardController.getItems);

// React server rendering
var reactServerRender = function(req, res) {
    var initialState = {
        auth: { token: req.cookies.token, user: req.user },
        messages: {}
    };

    var store = configureStore(initialState);

    Router.match({ routes: routes.default(store), location: req.url }, function(err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).send(err.message);
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            var html = ReactDOM.renderToString(React.createElement(Provider, { store: store },
                React.createElement(Router.RouterContext, renderProps)
            ));
            res.render('layout', {
                html: html,
                initialState: store.getState()
            });
        } else {
            res.sendStatus(404);
        }
    });
}

app.use(reactServerRender);

// Production error handler
if (app.get('env') === 'production') {
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.sendStatus(err.status || 500);
    });
}

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
