const inputValidationController = {};
const cfg = require('config');
const CSVtoArray = require('../util/csvToArray');

inputValidationController.validateFile = filename => (req, res, next) => {
  
  if (!req.file) {
    const error = new Error(`fileValidation: No File passed as req.file`)
    error.status = 400;
    return next(error)
  } else {
  
    const lines = req.file.buffer.toString().split('\n');
    const config = cfg.get('fileValidation.' + filename);
    if ( !config ) {
      const error = new Error(`No config for fileValidation` + filename)
      error.status = 400;
      return next(error)
    }


    // set up our results object in the response
    if ( !res.locals.validated ) {
      res.locals.validated = {};
    }
    
    res.locals.validated[config.filename] = [];

    const errorText = [];
    let records = 0;
    // default delimiter to csv
    const delimiter = config.delimiter || ',';

    if ( config.hasHeader === 'true' ) {

      const headerLine = lines.shift();

      // verify header
      const header = headerLine.split(delimiter);

      if(header.length === config.fieldNames.length) {
        for ( let i = 0; i < config.fieldNames.length; i++ ) {
          if ( header[i].trim() !== config.fieldNames[i] ) {
            errorText.push(`Expected field named [${config.fieldNames[i]}] in position ${i}.  Found [${header[i]}]`); 
         }  
        } 
      } else {
        errorText.push(`Expected ${config.fieldNames.length} elements in csv header.  Found ${header.length}`);
      }

    } 
    
    // verify number of records
    records = lines.length;
    if ( records < config.minRecords ) {
      errorText.push(`fileValidation: Must have at least ${config.minRecords} records.  Found ${records}`);
    }

    if ( config.maxRecords && records > config.maxRecords ) {
      errorText.push(`fileValidation: Must have at most ${config.maxRecords} records.  Found ${records}`);
    }
    
    // validate data
    for ( let i = 0; i < lines.length; i++ ) {
      let fields = [];
      if ( delimiter === ',') {
        fields = CSVtoArray(lines[i]);
      
        if ( !fields ) {
          const error = new Error(`Record ${i} is not well formed CSV string.`)
          error.status = 400;
          return next(error);
        }
      } else {
        fields = lines[i].split(delimiter);
      }

      
      
      if ( config.minFields && fields.length < config.minFields ) {
        errorText.push(`fileValidation: Expected ${config.minFields} values.  Found ${fields.length} values in record ${i + 1}`);
      }

      if ( config.maxFields && fields.length > config.maxFields ) {
        errorText.push(`fileValidation: Expected ${config.maxFields} values.  Found ${fields.length} values in record ${i + 1}`);
      }

      for ( let k = 0; k < fields.length; k++ ) {
        // trim left and right spaces if configured
        if ( config.trimFields ) {
          fields[k] = fields[k].trim();
        }

        // validate against regex
        const regex = config.regex[k];
        const re = new RegExp( regex );
        if (!re.test(fields[k])) {
          errorText.push(`fileValidation: Expected value matching regex ${regex}.  Found [${fields[k]}] in record ${i + 1}`);
        }
      }      

      res.locals.validated[config.filename].push(fields.join(delimiter));

    }
    
    // validate all questions in the file before saving to the db
    if (errorText.length) {
      const error = new Error(JSON.stringify(errorText, null, 2));
      error.status = 400;
      return next(error)
    } else {
      // everything we need hereafter should be in res.locals.validated[config.filename]
      next();
    } 
  } 
}



module.exports = inputValidationController;