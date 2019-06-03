const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models/dbModel');
const bcrypt = require('bcrypt');
const { logger } = require('../util/loggingUtil');

passport.use(new LocalStrategy((username, password, cb) => {
  db.query('SELECT _id, username, password FROM accounts WHERE username=$1', [username], (err, result) => {
    
    if(err) {
      console.error('Error when selecting user on login', err)
      return cb(err)
    }

    // we found a user account
    if(result.rows.length > 0) {
      const account = result.rows[0];

      bcrypt.compare(password, account.password, function(err, res) {
        if (err) {
          console.error('Error when checking hashed password', err)
          return cb(err);
        }

        if(res) {
          console.log(`Found username:[${account.username}] pw:[${password}]`);
          cb(null, { id: account._id, username: account.username })
         } else {
          console.log(`Did not find username:[${account.username}] pw:[${password}]`);
          cb(null, false)
         }
         
       })

     } else {
       // username wasn't found
      cb(null, false)
     }
  })
}))

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id)
})

passport.deserializeUser((id, cb) => {
  db.query('SELECT _id, username FROM accounts WHERE _id = $1', [parseInt(id, 10)], (err, results) => {
    if(err) {
      logger.error('Error when selecting accounts on session deserialize', err)
      return cb(err)
    }

    cb(null, results.rows[0])
  })
})

module.exports = passport;