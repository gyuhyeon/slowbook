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
			if(error==null){
				for(var i=0; i<cursor.length; i++){
					list+='<option value="'+cursor[i].p_id+'">'+cursor[i].bookname+'</option>';
				}
			}
			else{
				console.log(error);
				list+='<option value="'+0+'">'+"Sorry, our servers aren't reachable at the moment.</option>";
			}
			//if there's any selected book, display as pdf.
			if(typeof req.cookies.selectedbook == 'undefined'){
				res.render('readertest', { testtitle:'느림과 여유', booklist:list, bookurl:''});
			}
			else{
				res.render('readertest', { testtitle:'느림과 여유', booklist:list, bookurl:req.cookies.selectedbook});
			}
			console.log(req.cookies.selectedbook);
		});
		//can't render outside, because variable list is wiped.
});

//submitpref POST
router.post('/submitpref', function(req, res, next){
	connection.query('SELECT bookurl FROM Booklist WHERE p_id=?',[req.body.booklist],
		function(error, cursor){
			if(error==null){
				if(cursor.length>0){
					//set cookie. Is this really the only way to 'refresh' the page while retaining information???!
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

module.exports = router;