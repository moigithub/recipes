var results= [
		{
			RecipeID: 123,
			Name: 'Ensalada de palta',
			photoUrl: 'http://lorempixel.com/250/250/food/1',
			Ingredients: ['one','two','three'],
			Preparation: 'big chunk of text',
			Category: ['pasta', 'postre'],
			Likes: 99,
			UserId: 'user11'
		},
		{
			RecipeID: 124,
			Name: 'Seco de gato',
			photoUrl: 'http://lorempixel.com/250/250/food/2',
			Ingredients: ['one','naa','three'],
			Preparation: 'asdfsdf text',
			Category: ['sopas', 'carnes'],
			Likes: 99,
			UserId: 'user12'
		},
		{
			RecipeID: 125,
			Name: 'Lasagna',
			photoUrl: 'http://lorempixel.com/250/250/food/3',
			Ingredients: ['one','two','boo'],
			Preparation: '8i78i78j78 text',
			Category: ['bebida'],
			Likes: 99,
			UserId: 'user11'
		},
		{
			RecipeID: 126,
			Name: 'Lasagna',
			photoUrl: 'http://lorempixel.com/250/250/food/4',
			Ingredients: ['one','two','boo'],
			Preparation: '8i78i78j78 text',
			Category: ['bebida'],
			Likes: 99,
			UserId: 'user11'
		},
		{
			RecipeID: 127,
			Name: 'Langostino',
			photoUrl: 'http://lorempixel.com/250/250/food/5',
			Ingredients: ['one','two','boo'],
			Preparation: '8i78i78j78 text',
			Category: ['Entrada'],
			Likes: 99,
			UserId: 'user11'
		},
		{
			RecipeID: 128,
			Name: 'Tiburon',
			photoUrl: 'http://lorempixel.com/250/250/food/6',
			Ingredients: ['one','two','boo'],
			Preparation: '8i78i78j78 text',
			Category: ['Segundo'],
			Likes: 99,
			UserId: 'user11'
		},
		{
			RecipeID: 129,
			Name: 'Pescao',
			photoUrl: 'http://lorempixel.com/250/250/food/7',
			Ingredients: ['one','two','boo'],
			Preparation: '8i78i78j78 text',
			Category: ['bebida'],
			Likes: 99,
			UserId: 'user11'
		}
	];

var express = require('express');
var router = express.Router();
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

router.get('/:id', function(req,res){
    Recipe.findById(req.params.id)
		.populate('userId')
		.lean() //transform in a plain object
		.exec( function (err, recipe) {
        if(err) { return handleError(res, err); }

        //this return a single object
        //mutate it 

        return res.status(200).json(rebuildRecipe(recipe));
    });
});

router.get('/search/:name', function(req,res){
    Recipe.find({name: {$regex: req.params.name}})
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

router.post('/', function(req,res){
	console.log("new recipe", req.body);

	
	Recipe.create(req.body, function(err, recipe) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(recipe);
    });
});


router.delete('/:id', function(req, res) {
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
router.put('/:id',  function(req, res) {
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

router.get('/random', function(req,res){
	
	Recipe.aggregate([
		{$limit:1}
	],
    function(err, recipe) {
    	if (err) { return handleError(res, err); }

       	return res.status(200).json(recipe);
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
    Recipe.find({category:{$in: categList}})
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
	var categList = req.params.categList.split(",");
    Recipe.find({category:{ $all: [categList]}})
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

