var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var mysqlConfig = {
	'host' : 'slowbookdb.c0tygauz7qlt.ap-northeast-2.rds.amazonaws.com:3306',
	'user' : 'slowbook', 'password' : 'godwjd1212', 'database' : 'slowbookdb',
}
var connection = mysql.createConnection(mysqlConfig);

router.post('/', function(req, res, next){
	res.json({result:true, uid: '000000001', user_id : 'testuser', name: 'testname', 
			cellphone:'01012345678',
			});
});

module.exports = router;