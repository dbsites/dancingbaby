const dbdb = require('../models/dbModel');
const cfg = require('config');
const CSVtoArray = require('../util/csvToArray');

const questionsController = {};

// getAllQuestions will fetch all questions (parents), then all subquestions (children)
// child questions will be embedded in an array within the appropriate parent
questionsController.getAllQuestions = (req, res, next) => {

  async function getQuestions() {
    const parentQuery = `
    SELECT question_number, question_text, no_fair_use, no_infringement, yes_fair_use, yes_infringement, branch_on
    FROM questions 
    WHERE parent_question is null
    ORDER BY _id`;

const childQuery = `
    SELECT question_number, question_text, no_fair_use, no_infringement, yes_fair_use, yes_infringement, parent_question
    FROM questions 
    WHERE parent_question is not null
    ORDER BY _id`;

    let questions = [];
    let parentQuestions = await dbdb.query({ text: parentQuery });

    if(parentQuestions || parentQuestions.rows) {
      let childQuestions  = await dbdb.query({ text: childQuery });

      // loop through parent questions
      parentQuestions.rows.forEach((parent) => {
        const question = {
          questionNumber: parent.question_number,
          questionText: parent.question_text,
          noFairUse: parent.no_fair_use,
          noInfringement: parent.no_infringement,
          yesFairUse: parent.yes_fair_use,
          yesInfringement: parent.yes_infringement,
          branchOn: parent.branch_on === 'null' ? "" : parent.branch_on, 
          subQuestions: []
        }

        // find children for this parent...
        childQuestions.rows.forEach((child) => {  
          if(child.parent_question.trim() === parent.question_number.trim()) {
            
            const subQuestion = {
              questionNumber: child.question_number,
              questionText: child.question_text,
              noFairUse: child.no_fair_use,
              noInfringement: child.no_infringement,
              yesFairUse: child.yes_fair_use,
              yesInfringement: child.yes_infringement,
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
  const config = cfg.get('fileValidation.questions');

  if (res.locals.validated[config.filename].length) {
    const questions = res.locals.validated[config.filename];    

    // keep it simple -- drop the questions table and reload from the file
    dbdb.query({ text: `truncate table questions` })
    .then(result => dbdb.query({ text: `truncate table answer_matrix`}))
    .then(result => {
      questions.forEach( (question, order) => {
        const fields = CSVtoArray(question);

        const hasParent = fields[0].match(/^(\d+)[a-z]$/);
        const parent = hasParent ? hasParent[1] : null;

        // we aren't using auto increment for questions._id so we can use it to be specific about the order of the questions
        const questionsInsert = `
          INSERT INTO questions (_id, question_number, question_text, no_fair_use, no_infringement, yes_infringement, yes_fair_use, branch_on, parent_question)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
  
        dbdb.query({ text: questionsInsert, values: [order + 1, fields[0], fields[1], fields[2], fields[3], fields[4], fields[5], fields[11], parent] });

        // we aren't using auto increment for answer_matrix._id so we can use it to be specific about the order of the matrix
        const answerMatrixInsert = `
        INSERT INTO answer_matrix (_id, question_number, very, strong, moderate, weak, no)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`;

        dbdb.query({ text: answerMatrixInsert, values: [ order + 1, fields[0], fields[6], fields[7], fields[8], fields[9], fields[10] ]});

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


module.exports = questionsController;

