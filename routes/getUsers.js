'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

const ObjectId = require('mongoose').Types.ObjectId;
/* GET home page. */
router.get('/', (req, res, next) => {
  User.find()
    .then(result => {
      result.forEach(user => {
        user.password = '';
      });
      res.json(result);
    })
    .catch();
});

module.exports = router;
