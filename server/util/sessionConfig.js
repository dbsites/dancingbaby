const config = require('config');
const { pool } = require('../models/dbModel');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

// session logic
const secret = process.env.SESSION_SECRET || config.get('session-secret');
const sessionConfig = {
  secret,
  name: 'dancingbaby',
  resave: false, // only resave session if changes are made to session
  saveUninitialized: false, // only create sessions for users who log in
  store: new pgSession({ pool }), // store user session data in database
  //store: pool, // store user session data in database
  cookie: { secure: true, maxAge: 2 * 24 * 60 * 60 * 1000 } // 2 day session
}

if (process.env.NODE_ENV !== 'production') {
  sessionConfig.cookie.secure = false; // set cookies on http for dev
}

module.exports = { sessionConfig, secret };
