'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Post = require('../models/post');

const ObjectId = require('mongoose').Types.ObjectId;
/* GET home page. */
router.get('/', (req, res, next) => {
  User.find()
    .then((result) => {
      res.render('users/list', { users: result });
    })
    .catch(next);
});

router.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  if (!ObjectId.isValid(userId)) {
    return next();
  }
  Post.find({ owner: userId })
    .then((result) => {
      res.render('users/posts', { posts: result });
    })
    .catch(next);
});

module.exports = router;
