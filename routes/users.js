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
      /*
      const searchInput = document.querySelector('.input-users input');
      const searchResultElement = document.querySelector('div.search-results');

      const findUsers = (search) => {
        return User.filter(user => {
          return user.name.toLowerCase().includes(search);
        });
      }
      const displayResults = (usersFound) => {
        searchResultElement.innerHTML = '';

        const usersList = document.createElement('ul');

        usersFound.forEach(user => {
          const userListElement = document.createElement('li');
          userListElement.innerText = user.username;
          usersList.appendChild(userListElement);
        });
        searchResultElement.appendChild(usersList);
      };

      const handleKeyUp = () => {
        const search = searchInput.value.toLowerCase();
        const usersFound = findUsers(search);
        displayResults(usersFound);
      };

      searchInput.addEventListener('keyup', handleKeyUp);
    })
  */ })
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
