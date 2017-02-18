var express = require('express');
var router = express.Router();

var User = require('./User.model.js');
////////////////

router.get('/', function(req,res,next){
	var userData = {};
	if(req.user){
		userData.id = req.user._id;
		userData.displayName = req.user.showName;
	};
	res.json(userData);
});


router.post('/', function(req,res,next){
	//TODO
	var userData = req.body;
	console.log("register user email",userData);
	
	res.json(userData);
});


router.get('/:id', function(req,res){
    User.findById(req.params.id, function (err, user) {
	        if(err) { return handleError(res, err); }
//console.log("users api:",user);
			var userData = {};
			userData.id = user._id;
			userData.displayName = user.showName;
			return res.status(200).json(userData);
		});

});




module.exports = router;