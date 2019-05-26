const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models/dbModel');

passport.use(new LocalStrategy((username, password, cb) => {
  db.query('SELECT _id, username, password FROM accounts WHERE username=$1', [username], (err, result) => {
    
    if(err) {
      console.error('Error when selecting user on login', err)
      return cb(err)
    }

    // we found a user account
    if(result.rows.length > 0) {
      const account = result.rows[0];

      if(password === account.password) {
        cb(null, { id: account._id, username: account.username })
      } else {
        cb(null, false)
      }
      // Add bcrypt in when we have a way to encrypt passwords in account
      // bcrypt.compare(password, account.password, function(err, res) {
      //   if(res) {
      //     cb(null, { id: account._id, username: account.username })
      //    } else {
      //     cb(null, false)
      //    }
      //  })

     } else {
       // username wasn't found
      cb(null, false)
     }
  })
}))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, cb) => {
  db.query('SELECT _id, username FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
    if(err) {
      winston.error('Error when selecting user on session deserialize', err)
      return cb(err)
    }

    cb(null, results.rows[0])
  })
})

module.exports = passport;