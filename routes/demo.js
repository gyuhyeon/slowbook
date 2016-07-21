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
	//we really need to deal with multiple query problems / query result scope problems.... Maybe we just can't. They're asynchronous. Fuck.
	connection.query('SELECT * FROM Booklist WHERE ABS(?-rec_age)<=10',
		[req.body.age], function(error, cursor){
			var selectedbookname='None';
			if(error==null){
				if(cursor.length>0){
					//randomly select matching books... for now.
					selectedbookname = cursor[Math.floor(Math.random()*cursor.length)].bookname;
				}
				else{
					console.log('no matching books');
				}
			}
			else{
				console.log(error);
			}
			//not proud of this at all.
			res.cookie('selectedbookname', selectedbookname, {maxAge: 60*1000*60});
			res.redirect('/bookreader');
		});
});

module.exports = router;