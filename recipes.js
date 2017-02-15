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

////////////////


router.get('/', function(req,res){
	Recipe.find(function (err, recipes) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(recipes);
    });
});

router.get('/searchbyid/:id', function(req,res){
    Recipe.find({_id: req.params.id}, function (err, recipe) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(recipe);
    });
});

router.get('/search/:name', function(req,res){
    Recipe.find({name: req.params.name}, function (err, recipe) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(recipe);
    });
});

// recipe by user
router.get('/user/:id', function(req, res) {
    Recipe.find({userId: req.params.id}, function (err, recipe) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(recipe);
    });
});

router.post('/', function(req,res){
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

function handleError(res, err) {
  return res.status(500).send(err);
}


////////////
//searchByName

router.get('/random', function(req,res){
	
	Recommend.aggregate(
    [ { $sample: { size: 1 } } ],
    function(err, recipe) {
    	if (err) { return handleError(res, err); }
       // Result is an array of documents
       return res.status(200).json(recipe);
    } )
});

router.get('/top10', function(req,res){
	Recommend.aggregate(
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
    Recipe.find({category:{$in: categList}}, function (err, recipe) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(recipe);
    });
});

//strict AND
router.get('/searchByCategS/:categList', function(req,res){
	var categList = req.params.categList.split(",");
    Recipe.find({category:{ $all: [categList]}}, function (err, recipe) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(recipe);
    });
});


module.exports = router;