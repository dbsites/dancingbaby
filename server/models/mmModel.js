const pg = require('pg');

// create a config to configure both pooling behavior and client options
// note: values here should be derived from environment variables 
//       in a production environment

let config;

if(process.env.NODE_ENV === 'development') {
  config = {
    user: 'mmadmin', //env var: PGUSER
    database: 'mmdb', //env var: PGDATABASE
    password: 'admin', //env var: PGPASSWORD
    host: 'postgres-db', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 5, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  }
} else if (process.env.NODE_ENV === 'production') { 
  config = {    
    user: process.env.RDS_USER,
    database: process.env.RDS_DATABASE,
    password: process.env.RDS_PASSWORD,
    host: process.env.RDS_HOST,
    port: process.env.RDS_PORT, 
    max: 5, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  }
} else {
  config = {
    user: 'egovyvcx', //env var: PGUSER
    database: 'egovyvcx', //env var: PGDATABASE
    password: 'hDcaTP0pR6F3BNhETAn6hGlIOmEDWAlg', //env var: PGPASSWORD
    host: 'tantor.db.elephantsql.com', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 5, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  }
}

console.log(`Connecting to database ${config.database} on host ${config.host}`);

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
  console.error('idle client error', err.message, err.stack);
});

//export the query method for passing queries to the pool
module.exports.query = function (text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
module.exports.connect = function (callback) {
  return pool.connect(callback);
};