const dbdb = require('../models/dbModel');

const questionsController = {};

// getAllQuestions will fetch all questions (parents), then all subquestions (children)
// child questions will be embedded in an array within the appropriate parent
questionsController.getAllQuestions = (req, res, next) => {

  async function getQuestions() {
    const parentQuery = `
    SELECT question_id, question_text, weight
    FROM questions
    WHERE parent_question_id is null
    ORDER BY question_id`;

const childQuery = `
    SELECT question_id, question_text, weight, parent_question_id
    FROM questions
    WHERE parent_question_id is not null
    ORDER BY question_id`;

    let questions = [];
    let parentQuestions = await dbdb.query({ text: parentQuery });

    if(parentQuestions || parentQuestions.rows) {
      let childQuestions  = await dbdb.query({ text: childQuery });

      // loop through parent questions
      parentQuestions.rows.forEach((parent) => {
        const question = {
          questionId: parent.question_id,
          questionText: parent.question_text,
          subQuestions: []
        }

        // find children for this parent...
        childQuestions.rows.forEach((child) => {  
          if(child.parent_question_id.trim() === parent.question_id.trim()) {
            
            const subQuestion = {
              questionId: child.question_id,
              questionText: child.question_text
            }
            // ... and push them into subQuestions
            question.subQuestions.push(subQuestion);
          }
        })

        // we're done with this parent question 
        questions.push(question);
      })
    } else {
      // return reason why query failed
      req.flash('error', [`An error occurred`]);
      next({ status: 500, 
              message: `questionController.getAllQuestions: No questions found`, 
              flash: { ...res.locals.flash }
      });
    }

    // all questions and subquestions
    return questions;
  }


  getQuestions()
  .then( questions => { 
    res.locals.questions = questions; 
    return next();
  })
  .catch( err => {
    return next({ status: 500, 
           message: `questionController.getAllQuestions: ${err}` 
        });
  })

};

questionsController.uploadQuestions = (req, res, next) => {
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


module.exports = questionsController;

