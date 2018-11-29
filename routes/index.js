require('dotenv').config();

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const axios = require('axios');

const parser = require('../helpers/file-upload');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/', authMiddleware.requireUser, parser.single('image'), (req, res, next) => {
  const requestBody = {
    requests: [{
      image: { source: { imageUri: req.file.url } },
      features: [{
        type: 'LANDMARK_DETECTION',
        maxResults: 100
      }]
    }]
  };

  axios.post(
    `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`,
    requestBody
  )
    .then((response) => {
      let title = response.data.responses[0].landmarkAnnotations[0].description;
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
    });
});

module.exports = router;
