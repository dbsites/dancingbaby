const dbdb = require('../models/dbModel');

const accountController = {};


// used on /login to check for existing user
accountController.checkForUser = (req, res, next) => {
  if (!req.body.username || !req.body.password) return next();
  const query = `SELECT 
      username, password
      FROM accounts
      WHERE username = $1
      AND password = $2`;

  dbdb.query({text: query, values: [req.body.username, req.body.password]})
    .then(queryRes => {
      if (!queryRes || !queryRes.rows) {
        // return reason why query failed
        req.flash('error', [`An error occurred`]);
        next({ status: 400, 
               message: `userController.checkForUser: No user found`, 
               flash: { ...res.locals.flash }
        });
      }

      return next();
    })
    .catch(err => {
      // return reason why insert failed
      req.flash('error', [`An error occurred`]);
      // pass error object through to the general error handler
      next({ status: 400, 
             message: `userController.checkForUser: ${err}`, 
             flash: { ...res.locals.flash }
          });
    });

};


module.exports = accountController;

