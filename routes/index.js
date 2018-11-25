const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

const parser = require('../helpers/file-upload');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/', authMiddleware.requireUser, parser.single('image'), (req, res, next) => {
  // Performs landmark detection on the local file
  client
    .landmarkDetection(req.file.url)
    .then(results => {
      const title = results[0].landmarkAnnotations[0].description;
      const data = {
        title
      };
      res.render('display-info', data);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
});

module.exports = router;
