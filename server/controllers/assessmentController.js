const dbdb = require('../models/dbModel');
const cfg = require('config');
const { logger } = require('../util/loggingUtil');

const assessmentController = {};

// store all of the relevant data from this session 
// 1. load users table
// 2. load content table
// 3. load analysis_session table - needs user and content ids
// 4. load assessments table - needs analysis session id

assessmentController.storeResults = (req, res, next) => {
  console.log("Storing Assessment Session results: ", req.body);

  if (!req.body.session) {
    const error = new Error(`No session results passed`);
    error.status = 400;
    return next(error)
  }
  const session = req.body.session;

  async function storeUserAndContent() {
    // create the user record for this session
    // If we have an existing combo of first, last, and org
    // we won't add a new record.  We'll just get the id
    const usersInsert = `
      INSERT INTO users (first_name, last_name, organization)
      VALUES ($1, $2, $3) 
      ON CONFLICT ON CONSTRAINT users_uniq_0
      DO SET tmp = users.first_name 
      returning _id as id`;

    try {
      const usersResult = await dbdb.query({
        text: usersInsert,
        values: [session.firstName, session.lastName, session.organization]
      })

      if (usersResult && usersResult.rows) {
        session.user.id = usersResult.rows[0].id;
        logger.info(`Stored user ${session.user.id}`);
      }
    } catch (err) {
      throw new Error(err);
    }

    // we have primary and secondary content.  
    // We'll be storing a record for each of them
    ['primary', 'secondary'].forEach(content => {
      const contentInsert = `
        INSERT INTO content (
          content_type, file_type, url, 
          published_date, author, view_count)
        VALUES ($1, $2, $3, $4, $5, $6) 
        returning _id as id`;

      try {
        const contentResult = await dbdb.query({
          text: contentInsert,
          values: [content, session[content].fileType, session[content]url,
            session[content].publishedDate, session[content].author, session[content].viewCount]
        })

        if (contentResult && contentResult.rows) {
          session[content].id = contentResult.rows[0].id;
          logger.info(`Stored content ${session[content].id}`);
        }
      } catch (err) {
        throw new Error(err);
      }
    })
  }

  async function storeAnalysisSession() {
    const insert = `
      INSERT INTO analysis_session (
        account_id, user_id, primary_content_id, 
        secondary_content_id, factors_against, factors_toward,
        start_timestamp, completed_timestamp)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      returning _id as id`;
    try {
      const result = await dbdb.query({
        text: insert,
        values: [session.accountId, session.user.id, session.primary.id,
        session.secondary.id, session.factorsToward, session.factorsAgainst,
        session.startTimestamp, session.completedTimestamp]
      })

      if (result && result.rows) {
        session.analysis.id = result.rows[0].id;
        logger.info(`Stored analysis_session ${session.analysis.id}`);
      }

    } catch (err) {
      throw new Error(err);
    }
  });

  async function storeAssessment() {
    // load up the assessment table with all of the answers from this session
    session.assessment.forEach(q => {
      const insert = `
            INSERT INTO assessments (question_number, answer)
            VALUES ($1, $2, $3) returning _id`;

      try {
        const result = await dbdb.query({
          text: insert,
          values: [q.question_number, q.answer, session.assessment.id]
        })

        if (result && result.rows) {
          logger.info(`Stored question ${q.question_number}: ${q.answer}`);
        }
      } catch (err) {
        throw new Error(err);
      }

    });

  }

  storeUserAndContent()
    .then(result => storeAnalysisSession())
    .then(result => storeAssessment())
    .catch(err => {
      //const error = new Error(err);
      err.status = 500;
      return next(error);
    });
}