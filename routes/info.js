'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

const rp = require('request-promise');

router.get('', (req, res, next) => {
  const imageUrl = req.query.image;
  const title = req.query.title;
  let wikiTitle;
  let content;

  const options1 = {
    method: 'GET',
    uri: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + title,
    json: true
  };
  rp(options1)
    .then((result) => {
      wikiTitle = result[1][0];
      getContent();
    })
    .catch();

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
        content = page[pageId].extract;

        res.render('display-info', { title, content, imageUrl });
      })
      .catch();
  };
});

const displayRecomendations = () => {
  const landmark = null;
  let placesAndScores = {};
  User.find()
    .then(arrayOfUsers => {
      let hasVisitedLandmark;
      arrayOfUsers.forEach(user => {
        user.history.forEach(place => {
          if (place.title === landmark) {
            hasVisitedLandmark = true;
          }
        });
      });
      if (hasVisitedLandmark) {
        arrayOfUsers.forEach(user => {
          user.history.forEach(place => {
            const placeName = place.title;
            if (placeName in placesAndScores) {
              placesAndScores.placeName += 1;
            } else {
              placesAndScores.placeName = 1;
            }
          });
        });
      }
    })
    .catch();
};

module.exports = router;
