
var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var config = require('./config.js');

var Recipe = require('./Recipe.model.js');
var User = require('./User.model.js');
////////////////


router.get('/', function(req,res){
	Recipe.find()
		.populate('userId')
		.lean()
		.exec(function (err, recipes) {
        if(err) { return handleError(res, err); }

        var result = recipes.map(function(recipe){
        	return rebuildRecipe(recipe);
        });

        
        return res.status(200).json(result);
    });
});


router.get('/Likes/:uid', function(req,res){
	var me = req.params.uid;
    Recipe.find({"likes": me})
		.populate('userId')
		.lean()
		.exec( function (err, recipes) {
        if(err) { return handleError(res, err); }

        var result = recipes.map(function(recipe){
        	return rebuildRecipe(recipe);
        });

        
        return res.status(200).json(result);
    });
});


router.get('/random', function(req,res){
	
	Recipe.aggregate( [ 
			{ $sample: { size: 10 } } , 
			{ $lookup: {
				from:'users',
				localField:'userId',
				foreignField:'_id',
				as:'userId'
			}}
		])
	.exec( function(err, recipes) {
    	if (err) { return handleError(res, err); }

    	if(!recipes.length) return res.status(200).json({});

    	var tmp = Object.assign({},recipes[Math.floor(Math.random()*recipes.length)]);
    	tmp.userId = tmp.userId[0];
       	return res.status(200).json(rebuildRecipe(tmp));
    });
});

router.get('/top10', function(req,res){
	Recipe.aggregate(
    [
        // Sorting pipeline
        { "$sort": { "likes": -1 } },
        // Optionally limit results
        { "$limit": 10 }
    ],
    function(err, recipe) {
    	if (err) { return handleError(res, err); }
       // Result is an array of documents

       return res.status(200).json(recipe);
    })
});

// find OR
router.get('/searchByCateg/:categList', function(req,res){
	var categList = req.params.categList.split(",");
		
    Recipe.find({categories:{$in: categList.map(function(categ){
    		return new RegExp(categ.trim(), 'i');
    	})}})
		.populate('userId')
		.lean()
		.exec( function (err, recipes) {
        if(err) { return handleError(res, err); }

        var result = recipes.map(function(recipe){
        	return rebuildRecipe(recipe);
        });

        
        return res.status(200).json(result);
    });
});

//strict AND
router.get('/searchByCategS/:categList', function(req,res){
	var categList = req.params.categList.split(",")
		.map(function(categ){return categ.trim();});
    Recipe.find({categories:{ $all: categList}})
		.populate('userId')
		.lean()
		.exec( function (err, recipes) {
        if(err) { return handleError(res, err); }

        var result = recipes.map(function(recipe){
        	return rebuildRecipe(recipe);
        });

        
        return res.status(200).json(result);
    });
});


router.get('/search/:name', function(req,res){
    Recipe.find({name: {$regex: new RegExp(req.params.name,"i")}})
		.populate('userId')
		.lean()
		.exec( function (err, recipes) {
        if(err) { return handleError(res, err); }

        var result = recipes.map(function(recipe){
        	return rebuildRecipe(recipe);
        });

        
        return res.status(200).json(result);
    });
});

// recipe by user
router.get('/user/:id', function(req, res) {
    Recipe.find({userId: req.params.id})
		.populate('userId')
		.lean()
		.exec( function (err, recipes) {
        if(err) { return handleError(res, err); }
        var result = recipes.map(function(recipe){
        	return rebuildRecipe(recipe);
        });

        
        return res.status(200).json(result);;
    });
});


router.get('/:id', function(req,res){
    Recipe.findById(req.params.id)
        .populate('userId')
        .lean() //transform in a plain object
        .exec( function (err, recipe) {
        if(err) { return handleError(res, err); }

        //this return a single object
        //mutate it 
        var result = rebuildRecipe(recipe);
    console.log(result)

        return res.status(200).json(result);
    });
});

// recipe toggle like
router.put('/like/:id', isAuth, checkToken, function(req, res) {
    Recipe.findById(req.params.id, function (err, recipe) {
        if(err) { return handleError(res, err); }
       
       var userId = req.body.userId;
       //toggle userID from array
       if(!Array.isArray(recipe.likes) ){
       		recipe.likes=[];
       }


        if (recipe.likes.indexOf(userId)===-1){
        	recipe.likes.push(userId)
        } else {
        	recipe.likes = recipe.likes.filter(function(uid){
        			return uid !== userId;
        		});
        }
        recipe.save(function(err){
        	if(err) { return handleError(res, err); }

        	Recipe.findById(recipe._id)
				.populate('userId')
				.lean() //transform in a plain object
				.exec( function (err, recipe) {
		        if(err) { return handleError(res, err); }

		        //this return a single object
		        //mutate it 
		        var result = rebuildRecipe(recipe);
		    console.log(result)

		        return res.status(200).json(result);
		    });
        });
        
    });
});

router.post('/', isAuth, checkToken, function(req,res){
	console.log("new recipe", req.body);

	
	Recipe.create(req.body, function(err, recipe) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(recipe);
    });
});


router.delete('/:id',isAuth,  checkToken,function(req, res) {
  Recipe.findById(req.params.id, function (err, recipe) {
    if(err) { return handleError(res, err); }
    if(!recipe) { return res.status(404).send('Not Found'); }
    recipe.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');  //json({removed: req.params.id})
    });
  });
});

//update
router.put('/:id', isAuth, checkToken,  function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Recipe.findById(req.params.id, function (err, recipe) {
    if (err) { return handleError(res, err); }
    if(!recipe) { return res.status(404).send('Not Found'); }

    recipe=Object.assign(recipe, req.body);
    //////////////////////
    recipe.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(recipe);
    });
  });
});


////////////
//searchByName



module.exports = router;


///helper
function rebuildRecipe(recipeObj){

    var newObj = Object.assign({},recipeObj);
    if(recipeObj.userId.local && recipeObj.userId.local.email){
		newObj.userId.showName = recipeObj.userId.local.email;
        delete newObj.userId.local;
	} else if(recipeObj.userId.twitter && recipeObj.userId.twitter.displayName){
		newObj.userId.showName = recipeObj.userId.twitter.displayName;
        delete newObj.userId.twitter;
	} else if(recipeObj.userId.facebook && recipeObj.userId.facebook.name){
		newObj.userId.showName = recipeObj.userId.facebook.name;
        delete newObj.userId.facebook;
	} else if(recipeObj.userId.google && recipeObj.userId.google.name){
		newObj.userId.showName = recipeObj.userId.google.name;
        delete newObj.userId.google;
	}
	return newObj;
}

function handleError(res, err) {
  return res.status(500).send(err);
}


/******************/
//     CHECK if logged in
/******************/
function isAuth(req,res,next){
    if (req.isAuthenticated()){
        next();
    } else {
        return res.redirect("/");
    }
}


/******************/
//     CHECK JW TOKEN
/******************/
function checkToken(req,res,next){
    var token = req.body.token || req.query.token|| req.headers['authtoken'];
console.log("-----------------TOKEN ", token);
    if(token){
        jwt.verify(token, config.superSecret, function(err,decoded){
            if(err){
                return res.json({success:false, message: 'Failed to auth.'})
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        //no token provided
        return res.status(403).json({success:false, message: 'No token provided.'})
    }
}