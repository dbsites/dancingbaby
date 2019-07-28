const dbdb = require('../models/dbModel');

const usersController = {};

usersController.getAllUsers = (req, res, next) => {

  async function getUsers() {
    const userQuery = `
    SELECT first_name, last_name, organization
    FROM users`;

    let result = await dbdb.query({ text: userQuery });

    if(result && result.rows) {    
      const users = [];  
      result.rows.forEach((row) => {
        const user = {
          firstName: row.first_name,
          lastName: row.last_name,
          organization: row.organization
        }
        users.push(user);
      })
    } else {
      const error = new Error(`userController.getAllUsers: No users found`);
      error.status = 500;
      return next(error)
    }

    return users;
  }


  getUsers()
  .then( users => { 
    res.locals.users = users; 
    return next();
  })
  .catch( err => {
    const error = new Error(`usersController.getAllUsers: ${err}`);
    error.status = 500;
    return next(error)
  })

};

module.exports = usersController;

