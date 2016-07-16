var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var mysqlConfig = {
	'host' : 'slowbookdb.c0tygauz7qlt.ap-northeast-2.rds.amazonaws.com',
	'user' : 'slowbook', 'password' : 'godwjd1212', 'database' : 'slowbookdb',
}
var connection = mysql.createConnection(mysqlConfig);

/* GET demo page */
router.get('/', function(req, res, next) {
  res.render('demo', { testtitle:'느림과 여유' });
});

//submitpref POST
router.post('/submitpref', function(req, res, next){
	//res.write('User gender: '+req.body.gender+'\n'+'User age: '+req.body.age+'\n'+'Selected genre: '+req.body.bookgenre);
	res.redirect('http://xkcd.com')
	res.end();
});

module.exports = router;