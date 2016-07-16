var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET reader test page */
router.get('/', function(req, res, next) {
	res.render('ahri', { testtitle:'아리는 사랑입니다'});
});


module.exports = router;