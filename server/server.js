const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('config');
const session = require('express-session');
const flash = require('req-flash');
const passport = require('./controllers/passport');
const { pool, connect } = require('./models/dbModel');
const marketController = require('./controllers/marketController');
const cardController = require('./controllers/cardController');
const accountController = require('./controllers/accountController');
const { logger, morgan } = require('./util/loggingUtil');
const { sessionConfig, secret } = require('./util/sessionConfig');

const app = express();

const PORT = process.env.PORT || '3000';

app.use(morgan('localtz'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../dist/')));
app.use((req, res, next) => { logger.info(req.body); next(); });

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// parse request body and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(secret));
app.use(flash({ locals: 'flash' }));
app.use(express.static('dist'));

// begin routes

app.post('/api/login',
   passport.authenticate('local'), // will return 401 Unauthorized on failure
   (req, res) => { // login was successful
    res.status(200);
   }
);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  

// error handler
app.use(function(err, req, res, next) {
    logger.error(`${err.status ? err.status : ''} ${err.message}`);
    if (err.flash) {
        res.status(err.status || 500).json(err.flash);
    } else {
        res.status(err.status || 500).send(err.message);
    }
});

app.listen(PORT, (err) => {
  //console.log(`${moment().tz("America/Los_Angeles").format('YYYY-MM-DD HH:mm:ss')} >`, err || 'server listening on port '  + PORT);
  logger.info(err || 'server listening on port '  + PORT);
});

module.exports = app;