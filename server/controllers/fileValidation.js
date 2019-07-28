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

    // We'll build up an array of errors as we encounter them
    const errorText = [];
    // default delimiter to csv
    const delimiter = config.delimiter || ',';

    // if our file is configured with a header, verify it
    if ( config.hasHeader === 'true' ) {

      const headerLine = lines.shift();
      const header = headerLine.split(delimiter);
      
      // Ensure that all of the expected field names are in order 
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
    const numRecords = lines.length;
    if ( numRecords < config.minRecords ) {
      errorText.push(`fileValidation: Must have at least ${config.minRecords} records.  Found ${numRecords}`);
    }

    if ( config.maxRecords && numRecords > config.maxRecords ) {
      errorText.push(`fileValidation: Must have at most ${config.maxRecords} records.  Found ${numRecords}`);
    }
    
    // validate each record
    for ( let i = 0; i < numRecords; i++ ) {
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

      // validate each field in the record
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

      // store the validated record in res.locals, indexed by filename
      res.locals.validated[config.filename].push(fields.join(delimiter));

    }
    
    // validate all questions in the file before saving to the db
    if (errorText.length) {
      const error = new Error(JSON.stringify(errorText, null, 2));
      error.status = 400;
      return next(error)
    } else {
      // everything we need hereafter should be in res.locals.validated[config.filename]
      return next();
    } 
  } 
}



module.exports = inputValidationController;