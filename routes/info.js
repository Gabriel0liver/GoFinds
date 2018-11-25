'use strict';

const express = require('express');
const router = express.Router();

const rp = require('request-promise');

// https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=sagradafamilia
//

router.get('', (req, res, next) => {
  const title = req.query.title;
  const options = {
    method: 'GET',
    uri: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=sagradafamilia',
    json: true
  };
  rp(options)
    .then((result) => {
      console.log(result[1][0]);
    })
    .catch();
  res.render('display-info', { title });
});

module.exports = router;
