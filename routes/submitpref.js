var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var mysqlConfig = {
	'host' : 'slowbookdb.c0tygauz7qlt.ap-northeast-2.rds.amazonaws.com:3306',
	'user' : 'slowbook', 'password' : 'godwjd1212', 'database' : 'slowbookdb',
}
var connection = mysql.createConnection(mysqlConfig);

router.post('/', function(req, res, next){
	res.write('User gender: '+req.body.gender+'\n'+'User age: '+req.body.age+'\n'+'Selected genre: '+req.body.bookgenre);
	res.end();
});

module.exports = router;