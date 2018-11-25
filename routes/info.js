'use strict';

const express = require('express');
const router = express.Router();

const rp = require('request-promise');

// https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=sagradafamilia
//

router.get('', (req, res, next) => {
  const getContent = () => {
    const options2 = {
      method: 'GET',
      uri: 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=' + wikiTitle,
      json: true
    };
    rp(options2)
      .then((result) => {
        const page = result.query.pages;
        const pageId = Object.keys(page)[0];
        const content = page[pageId].extract;
        console.log(content);
      })
      .catch();
  };
  const title = req.query.title;
  let wikiTitle;

  const options1 = {
    method: 'GET',
    uri: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + title,
    json: true
  };
  console.log(options1.uri);
  rp(options1)
    .then((result) => {
      wikiTitle = result[1][0];
      console.log(wikiTitle);
      getContent();
    })
    .catch();

  res.render('display-info', { title });
});

module.exports = router;
