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
    .catch(next);
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
  let friendName;
  let friend = {};

  if (friendId === req.session.currentUser._id) {
    return res.redirect('/users');
  };
  User.findById(req.session.currentUser._id)
    .then(result => {
      result.friends.forEach(friend => {
        if (friend === friendId) {
          return res.redirect('/users');
        }
      });
    })
    .catch(next);

  User.findById(friendId)
    .then(result => {
      friendName = result.username;
      friend = {
        friendId,
        friendName
      };
      User.findByIdAndUpdate(req.session.currentUser._id, { $push: { friends: friend } })
        .then(() => {
          res.redirect('/users');
        })
        .catch(next);
    })
    .catch(next);
});

router.post('/:userId/remove_friend', (req, res, next) => {

});

module.exports = router;
