// set up logging with winston and morgan
const morgan = require('morgan');
const moment = require('moment-timezone');
const { createLogger, format, transports } = require('winston');

const timezone = 'America/Los_Angeles';

// Setup Winston logger
const { combine, colorize, timestamp, printf } = format;
const logLineFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// set up local timezone for winston logs
const appendTimestamp = format((info, options) => {
  if (options.tz) {
    info.timestamp = moment().tz(options.tz).format('YYYY-MM-DD HH:mm:ss');
  }
  return info;
})

const logger = createLogger({
  format: combine(
    timestamp(),
    appendTimestamp({ tz: timezone }),
    logLineFormat),
  transports: [
    new transports.Console()
  ]
})

// production logging should go to files (and eventually to AWS CloudWatch)
if (process.env.NODE_ENV === 'production') {
  logger.add( new transports.File({
    filename: `./logs/${moment().tz(timezone).format('YYYY-MM-DD_HH:mm:ss')}.log`,
    maxsize: 102400,
    zippedArchive: true
  }));
}

// Set up morgan logger (for request logging)
morgan.token('date', (req, res, tz) => {
  return moment().tz(tz).format();
});

morgan.format('localtz', `[:date[${timezone}]] :method :url :status :response-time ms - :res[content-length]`);


module.exports = {
  morgan,
  logger
}


