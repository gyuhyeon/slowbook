var express = require('express');

var router = express.Router();


router.post('/', function(req, res, next){
	res.json({result:true, uid: '000000001', user_id : 'testuser', name: 'testname', 
			cellphone:'01012345678',
			});
});

module.exports = router;