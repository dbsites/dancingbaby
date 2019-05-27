const pg = require('pg');
const { logger } = require('../util/loggingUtil');


// create a config to configure both pooling behavior and client options
// note: values here should be derived from environment variables 
//       in a production environment

const config = { 
  max: 5, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

if (process.env.NODE_ENV === 'production') { 
  config.user = process.env.RDS_USERNAME;
  config.database = process.env.RDS_DB_NAME;
  config.password = process.env.RDS_PASSWORD;
  config.host = process.env.RDS_HOSTNAME;
  config.port = process.env.RDS_PORT;
} else {
  config.user = 'dbadmin';
  config.database = 'dbdb';
  config.password = 'admin';
  config.host = 'postgres-db';
  config.port = 5432;
}

logger.info(`Connecting to database ${config.database} on host ${config.host}`);

//this initializes a connection pool
//it will keep idle connections open for 30 seconds
//and set a limit of maximum 5 idle clients
const pool = new pg.Pool(config);

// if an error is encountered by a client while it sits idle in the pool
// the pool itself will emit an error event with both the error and
// the client which emitted the original error
// this is a rare occurrence but can happen if there is a network partition
// between your application and the database, the database restarts, etc.
// and so you might want to handle it and at least log it out
pool.on('error', function (err, client) {
  logger.error('idle client error', err.message, err.stack);
});

//export the query method for passing queries to the pool
const query = function (text, values, callback) {
  return pool.query(text, values, callback);
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
const connect = function (callback) {
  return pool.connect(callback);
};

module.exports = { pool, query, connect }