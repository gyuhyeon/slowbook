var express = require('express')
var http = require('http');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var submitpref = require('./routes/submitpref');

var app = express();

var requestTime = function (req, res, next){
	req.testTime = new Date();
	next();
}
app.use(requestTime);

app.use(logger('dev'));
app.use(bodyParser.json());
//querystring : false, qs library : true
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/submitpref', submitpref);






app.listen(8000);