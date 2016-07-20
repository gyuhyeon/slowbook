var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var mysqlConfig = {
	'host' : 'slowbookdb.c0tygauz7qlt.ap-northeast-2.rds.amazonaws.com',
	'user' : 'slowbook', 'password' : 'godwjd1212', 'database' : 'slowbookdb',
}
var connection = mysql.createConnection(mysqlConfig);

/* GET reader test page */
router.get('/', function(req, res, next) {
	//var list='';
	connection.query('SELECT * FROM Booklist',
		function(error, cursor){
			var list='';
			var selectedbookurl='';
			if(error==null){
				for(var i=0; i<cursor.length; i++){
					//search for book with selected book('booklist') p_id
					if(cursor[i].p_id==req.query['booklist']){
						selectedbookurl=cursor[i].bookurl;
						list+='<option selected value="'+cursor[i].p_id+'">'+cursor[i].bookname+'</option>';
						continue;
					}
					//add book to list with p_id value and bookname
					list+='<option value="'+cursor[i].p_id+'">'+cursor[i].bookname+'</option>';
				}
			}
			else{
				console.log(error);
				list+='<option value="'+0+'">'+"Sorry, our servers aren't reachable at the moment.</option>";
			}
			res.render('readertest', { testtitle:'느림과 여유', booklist:list, bookurl:selectedbookurl});
		});
		//can't render outside, because variable list is wiped.
});

/* Reason this didn't work : mysql is asynchronous.
It doesn't make sense to put return value in a callback function inside a function. It was retarded of me.
function queryurl(booklist){
	connection.query('SELECT bookurl FROM Booklist WHERE p_id=?',booklist,
		function(error, cursor){
			if(error==null){
				if(cursor.length>0){
					console.log('1'+cursor[0].bookurl);
					return cursor[0].bookurl;
				}
				else{
					console.log('no cursor');
					return '';
				}
			}
			else{
				console.log('db error');
				return '';
			}
		});
}
*/

/*
//submitpref POST
//it was stupid. Finally fixed now.
router.get('/submitpref', function(req, res, next){
	connection.query('SELECT bookurl FROM Booklist WHERE p_id=?',[req.body.booklist],
		function(error, cursor){
			if(error==null){
				if(cursor.length>0){
					//set cookie. Is this really the only way to 'refresh' the page while retaining information???!
					//------------NEED TO CHANGE THIS------------------
					res.cookie('selectedbook', cursor[0].bookurl, {maxAge: 60*1000*24});
					res.redirect('/readertest');
				}
				else{
					console.log('no cursor');
					res.redirect('/readertest');
				}
			}
			else{
				console.log('db error');
				res.redirect('/readertest');
			}
		});
});
*/
module.exports = router;