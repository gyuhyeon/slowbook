var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { testtitle: '느림과 여유' });
});

module.exports = router;
