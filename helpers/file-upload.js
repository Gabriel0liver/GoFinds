'use strict';

const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'gofinds',
  api_key: 615415761933833,
  api_secret: 'ClmKSMTduF6xUrKqVUayMl0BdN8'
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'gofinds',
  allowedFormats: ['jpg', 'png']
});

const parser = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log(file.mimetype === 'image/jpeg');
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      req.fileValidationError = true;
      return cb(null, false, new Error('Wrong file type uploaded'));
    }
    cb(null, true);
  }
});

module.exports = parser
;
