const dbdb = require('../models/dbModel');
const cfg = require('config');
const bcrypt = require('bcrypt');
const { logger } = require('../util/loggingUtil');

const accountsController = {};

accountsController.getAllAccounts = (req, res, next) => {

  async function getAccounts() {
    const results = [];  
    const accountsQuery = `
    SELECT username, password, create_timestamp
    FROM accounts`;

    let accounts = await dbdb.query({ text: accountsQuery });
  
    if(accounts && accounts.rows) {    
      accounts.rows.forEach((row) => {
        const account = {
          username: row.username,
          password: row.password,
          createTimestamp: row.create_timestamp
        }
        results.push(account);
      })
    } else {
      // return reason why query failed
      const error = new Error('No accounts found')
      error.status = 500;
      return next(error)
    }

    return results;
  }


  getAccounts()
  .then( accounts => { 
    res.locals.accounts = accounts; 

    return next();
  })
  .catch( err => {
    return next({ status: 500, 
           message: `accountsController.getAllAccounts: ${err}` 
        });
  })

};

accountsController.uploadAccounts = (req, res, next) => {

  const config = cfg.get('fileValidation.accounts');
  const saltRounds = 10;

  if (res.locals.validated[config.filename].length) {
    const accounts = res.locals.validated[config.filename];    

    
    // validate all accounts in the file before saving to the db
    if (!accounts.length) {
      const error = new Error('No accounts found in uploaded file')
      error.status = 400;
      return next(error)
    }

    accounts.forEach( rec  => {
      
      const fields = rec.split(',');
      if(fields.length !== 2) {
        const error = new Error(`Invalid number of fields. username:${fields[0]} `);
        error.status = 400;
        return next(error)
      }
    });


    // keep it simple -- drop the accounts table and reload from the file
    dbdb.query({ text: `truncate table accounts` })
    .then(result => {
      accounts.forEach( account => {
        const fields = account.split(',');

        bcrypt.hash(fields[1].trim(), saltRounds, function(err, hashedPassword) {
          const insert = `
          INSERT INTO accounts (username, password)
          VALUES ($1, $2)`;

          logger.info(`Created user ${fields[0].trim()}`);
  
          dbdb.query({ text: insert, values: [ fields[0].trim(), hashedPassword ] });
        });

        
      });
  
      return next();
    })
    .catch(err => {
      const error = new Error(err);
      error.status = 400;
      return next(error);
    });

    
  } else {
    const error = new Error('Please upload a file');
    error.status = 400;
    return next(error);
  }   
};

accountsController.checkAuthentication = (req, res, next) => {
  if(req.isAuthenticated()) {
    // thanks to passport, req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = accountsController;

