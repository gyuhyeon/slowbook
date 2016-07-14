var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var mysqlConfig = {
	'host' : 'slowbookdb.c0tygauz7qlt.ap-northeast-2.rds.amazonaws.com:3306',
	'user' : 'slowbook', 'password' : 'godwjd1212', 'database' : 'slowbookdb',
}
var connection = mysql.createConnection(mysqlConfig);

//New member join request through POST with variables 'jointype, user_id, user_pw, name, cellphone' in json.
router.post('/', function(req, res, next){
	if(req.body.jointype=='teacher'){
		connection.query('INSERT INTO TEACHER(user_id, user_pw, name, cellphone) VALUES (?,?,?,?);',
			[req.body.user_id, req.body.user_pw, req.body.name, req.body.cellphone],
			function(error, info){
				if (error == null){
					connection.query('SELECT * from TEACHER WHERE u_id=?;', [info.insertId], function(error, cursor){
						if(cursor.length>0){

						}
					});
				}
			});
	}
	else if(req.body.jointype=='parent'){

	}
});

module.exports = router;