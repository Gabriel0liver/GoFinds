const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const parser = require('../helpers/file-upload');

var querystring = require('querystring');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/', authMiddleware.requireUser, parser.single('image'), (req, res, next) => {
  // Performs landmark detection on the local file
  client
    .landmarkDetection(req.file.url)
    .then(results => {
      let title = results[0].landmarkAnnotations[0].description;
      title = encodeURIComponent(title);
      res.redirect('/landmark_info?title=' + title);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
});

module.exports = router;
