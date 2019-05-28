const dbdb = require('../models/dbModel');

const accountsController = {};

accountsController.getAllAccounts = (req, res, next) => {

  async function getAccounts() {
    const results = [];  
    const accountsQuery = `
    SELECT username, password, create_timestamp
    FROM accounts`;

    let accounts = await dbdb.query({ text: accountsQuery });
    console.log('accounts: ', accounts);
  
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
    console.log('res.locals.accounts: ', res.locals.accounts);

    return next();
  })
  .catch( err => {
    return next({ status: 500, 
           message: `accountsController.getAllAccounts: ${err}` 
        });
  })

};

accountsController.uploadAccounts = (req, res, next) => {
  if (req.file) {
    const accounts = req.file.buffer.toString().split('\n');
    
    // validate all accounts in the file before saving to the db
    if (!accounts.length) {
      const error = new Error('No accounts found in uploaded file')
      error.status = 400;
      return next(error)
    }

    accounts.forEach( rec  => {
      console.log('rec: ', rec);
      
      const fields = rec.split(',');
      if(fields.length !== 2) {
        const error = new Error(`Invalid number of fields. username:${fields[0]} `);
        error.status = 400;
        return next(error)
      }
    });

    console.log('accounts:', accounts);
    // keep it simple -- drop the accounts table and reload from the file
    dbdb.query({ text: `truncate table accounts` })
    .then(result => {
      accounts.forEach( account => {
        const fields = account.split(',');

        const insert = `
          INSERT INTO accounts (username, password)
          VALUES ($1, $2)`;
  
        dbdb.query({ text: insert, values: [fields[0].trim(), fields[1].trim()] });
      });
  
      console.log('accounts: ', accounts);
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


module.exports = accountsController;

