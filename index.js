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
var app = express();

var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


mongoose.connect('mongodb://localhost/recipes');

app.use(morgan('dev'));
app.use(cookieParser());
//app.use(bodyParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


app.use(passport.initialize());
app.use(passport.session());


require('./passport.config')(passport);


/******************/
//     ROUTES
/******************/
app.get('/auth/logout', function(req, res, next){
	req.logout();
	req.redirect('/');
});

function isLoggedIn(req,res,next) {
	if(req.isAuthenticated()) return next();

	res.redirect('/');
}


app.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/',
	failureRedirect: '/'
}));

app.post('/login', passport.authenticate('local-login', {
	successRedirect: '/',
	failureRedirect: '/'
}));

app.get('/auth/facebook', passport.authenticate('facebook',{scope: 'email'}));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/',
	failureRedirect : '/'
}));

app.get('/auth/user', function(req,res,next){
	res.json(req.user);
});

//console.log(__dirname);
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


app.listen(process.env.PORT || 3000, function(){
	console.log('listening.... on :3000')
})