var express = require('express');

var router = express.Router();


router.post('/', function(req, res, next){
	res.json({result:true, user_id : 'testuser', name: 'testname',
			pw : 'needencryption?', cellphone:'01012345678',
			});
});

module.exports = router;