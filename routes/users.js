'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Post = require('../models/post');

const ObjectId = require('mongoose').Types.ObjectId;
/* GET home page. */
router.get('/', (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .then(result => {
      const friends = result.friends;
      res.render('users/list', { friends });
    })
    .catch();
});

router.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  if (!ObjectId.isValid(userId)) {
    return next();
  }
  Post.find({ owner: userId })
    .then((result) => {
      res.render('users/posts', { posts: result, userId });
    })
    .catch(next);
});

router.post('/:userId/add_friend', (req, res, next) => {
  const friendId = req.params.userId;
  User.findByIdAndUpdate(req.session.currentUser._id, { $push: { friends: friendId } })
    .then(() => {
      res.redirect('/users');
    })
    .catch(next);
});

module.exports = router;
