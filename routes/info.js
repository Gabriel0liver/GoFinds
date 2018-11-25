'use strict';

const express = require('express');
const router = express.Router();

router.get('', (req, res, next) => {
  const title = req.query.title;
  res.render('display-info', { title });
});

module.exports = router;
