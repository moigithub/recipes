var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var config = require('./config.js');

var User = require('./User.model.js');
////////////////

router.get('/', function(req,res,next){
	var userData = {};
//console.log('get auth user', req.user);
	if(req.user){
		userData.id = req.user._id;
		userData.displayName = req.user.showName;
		userData.token = req.user.keytoken;


		var token = jwt.sign(userData, config.superSecret, {
			expiresIn: 60*60*24   //expira en 24 horas
		});

		userData.keytoken = token;
	};

//console.log('get auth user: userdata', userData);
	res.json(userData);
});


router.get('/:id', function(req,res){
    User.findById(req.params.id, function (err, user) {
	        if(err) { return handleError(res, err); }
//console.log("users api by id:",user);
			var userData = {};
			userData.id = user._id;
			userData.displayName = user.showName;
			return res.status(200).json(userData);
		});
});


module.exports = router;