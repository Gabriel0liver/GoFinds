const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const parser = require('../helpers/file-upload');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/', authMiddleware.requireUser, parser.single('image'), (req, res, next) => {
  // Performs landmark detection on the local file
  client
    .landmarkDetection(req.file.url)
    .then(results => {
      let title = results[0].landmarkAnnotations[0].description;
      const arrayTitle = title.split('');
      // title string??
      title = '';
      for (let element of arrayTitle) {
        let breakForEach = false;
        switch (element) {
        case '(':
          breakForEach = true;
          break;
        case ',':
          breakForEach = true;
          break;
        default:
          title += element;
        }
        if (breakForEach) {
          break;
        }
      };
      title = encodeURIComponent(title);
      res.redirect('/landmark_info?title=' + title + '&image=' + req.file.url);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
});

module.exports = router;
