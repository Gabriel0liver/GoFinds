'use strict';

const express = require('express');
const router = express.Router();

// link fonted backend
router.get('/', (req, res, next) => {
  res.render('not-identified');
});

module.exports = router;
