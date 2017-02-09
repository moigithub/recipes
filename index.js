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
		}
	];

var express = require('express');
var app = express();

console.log(__dirname);
app.use(express.static(__dirname+'/src'));

app.use('/recipes/search', function(req,res){
	res.json(results);
});
app.use('/recipes/top10', function(req,res){
	res.json(results);
});
app.use('/recipes/random', function(req,res){
	res.json(results[Math.floor(Math.random()*results.length)]);
});
app.use('/recipes/searchbyid', function(req,res){
	res.json(results[Math.floor(Math.random()*results.length)]);
});
app.use('/recipes/searchByCateg', function(req,res){
	res.json(results);
});


app.listen(3000, function(){
	console.log('listening.... on :3000')
})