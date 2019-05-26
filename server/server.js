const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('config');
const logger = require('morgan');
const session = require('express-session');
const flash = require('req-flash');
const moment = require('moment-timezone');
const pgSession = require('connect-pg-simple')(session);
const passport = require('./config/passport');
const pgPool = require('./models/dbModel');
const marketController = require('./controllers/marketController');
const cardController = require('./controllers/cardController');
const accountController = require('./controllers/accountController');


const app = express();

const PORT = process.env.PORT || '3000';

app.use(logger(':date[clf] :method :url :status :response-time ms - :res[content-length]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../dist/')));
app.use((req, res, next) => { console.log(req.body); next(); });


// session logic
const secret = process.env.SESSION_SECRET || config.get('session-secret');
const sessionConfig = {
  secret,
  name: 'dancingbaby',
  resave: false, // only resave session if changes are made to session
  saveUninitialized: false, // only create sessions for users who log in
  store: new pgSession({ pool: pgPool }), // store user session data in database
  cookie: { secure: true, maxAge: 2 * 24 * 60 * 60 * 1000 } // 2 day session
}
if (process.env.NODE_ENV !== 'production') {
  sessionConfig.cookie.secure = false; // set cookies on http for dev
}

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
    console.error(`${moment()}> ${err.status ? err.status : ''} ${err.message}`);
    if (err.flash) {
        res.status(err.status || 500).json(err.flash);
    } else {
        res.status(err.status || 500).send(err.message);
    }
});

app.listen(PORT, (err) => {
  console.log(`${moment().tz("America/Los_Angeles").format('YYYY-MM-DD HH:mm:ss')} >`, err || 'server listening on port '  + PORT);
});

module.exports = app;