const dbdb = require('../models/dbModel');

const usersController = {};

usersController.getAllUsers = (req, res, next) => {

  async function getUsers() {
    const userQuery = `
    SELECT first_name, last_name, organization
    FROM users`;

    let users = await dbdb.query({ text: userQuery });

    if(users && users.rows) {    
      const users = [];  
      users.rows.forEach((row) => {
        const user = {
          firstName: row.first_name,
          lastName: row.last_name,
          organization: row.organization
        }
        users.push(user);
      })
    } else {
      // return reason why query failed
      req.flash('error', [`An error occurred`]);
      next({ status: 500, 
              message: `userController.getAllUsers: No users found`, 
              flash: { ...res.locals.flash }
      });
    }

    return users;
  }


  getUsers()
  .then( users => { 
    res.locals.users = users; 
    return next();
  })
  .catch( err => {
    return next({ status: 500, 
           message: `usersController.getAllUsers: ${err}` 
        });
  })

};

usersController.uploadQuestions = (req, res, next) => {
  if (req.file) {
    const questions = req.file.buffer.toString().split('\n');
    
    // validate all questions in the file before saving to the db
    if (!questions.length) {
      const error = new Error('No questions found in uploaded file')
      error.status = 400;
      return next(error)
    }

    questions.forEach( rec  => {
      const fields = rec.split(',');
      if(fields.length < 3 || fields.length > 4) {
        const error = new Error(`Invalid number of fields. Question ID:${fields[0]} `);
        error.status = 400;
        return next(error)
      }
    });

    // keep it simple -- drop the questions table and reload from the file
    dbdb.query({ text: `truncate table questions` })
    .then(result => {
      questions.forEach( question => {
        const fields = question.split(',');
  
        // tack a null for parent_question_id on parent questions
        if(fields.length < 4) fields.push(null);
  
        const insert = `
          INSERT INTO questions (question_id, question_text, weight, parent_question_id)
          VALUES ($1, $2, $3, $4)`;
  
        dbdb.query({ text: insert, values: [...fields] });
      });
  
      console.log('questions: ', questions);
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


module.exports = usersController;

