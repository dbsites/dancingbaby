const multer = require('multer');
const path = require('path');

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})


//module.exports = multer({ storage: storage })
module.exports = multer( { storage: multer.memoryStorage() });