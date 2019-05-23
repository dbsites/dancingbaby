const dbdb = require('../models/dbModel');

const accountController = {};

/**
 * @name getAllCards
 * @description queries cards table in db and aggregates cards per market
 */
accountController.login = (req, res, next) => {
    dbdb.query({
        text: 'select _id from accounts where username = $1 and password = $2',
        values: [req.body.username, req.body.password]
    })
    .then( data => {
        if( data.rowCount > 0 ) {
            data.rows.forEach( row => {
              res.locals.accountId = row._id;
             })
        } else {
            console.log("No account found");
        }        
        next();
    })
    .catch(err => {
        next(err);
    });
};


module.exports = accountController;

